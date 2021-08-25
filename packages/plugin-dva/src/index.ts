import { IApi, utils } from 'umi';
import { basename, dirname, extname, join, relative } from 'path';
import { readFileSync } from 'fs';
import { getModels } from './getModels/getModels';
import { getUserLibDir } from './getUserLibDir';

const { Mustache, lodash, winPath } = utils;

export default (api: IApi) => {
  const { logger } = api;

  function getModelDir() {
    return api.config.singular ? 'model' : 'models';
  }

  function getSrcModelsPath() {
    return join(api.paths.absSrcPath!, getModelDir());
  }

  function getDvaDependency() {
    const { dependencies, devDependencies } = api.pkg;
    return (
      dependencies?.dva ||
      devDependencies?.dva ||
      require('../package').dependencies.dva
    );
  }

  // 配置
  api.describe({
    key: 'dva',
    config: {
      schema(joi) {
        return joi.object({
          disableModelsReExport: joi.boolean(),
          lazyLoad: joi
            .boolean()
            .description(
              'lazy load dva model avoiding the import modules from umi undefined',
            ),
          extraModels: joi.array().items(joi.string()),
          hmr: joi.boolean(),
          immer: joi.alternatives(joi.boolean(), joi.object()),
          skipModelValidate: joi.boolean(),
        });
      },
    },
  });

  function getAllModels() {
    const srcModelsPath = getSrcModelsPath();
    const baseOpts = {
      skipModelValidate: api.config.dva?.skipModelValidate,
      extraModels: api.config.dva?.extraModels,
    };
    return lodash.uniq([
      ...getModels({
        base: srcModelsPath,
        cwd: api.cwd,
        ...baseOpts,
      }),
      ...getModels({
        base: api.paths.absPagesPath!,
        cwd: api.cwd,
        pattern: `**/${getModelDir()}/**/*.{ts,tsx,js,jsx}`,
        ...baseOpts,
      }),
      ...getModels({
        base: api.paths.absPagesPath!,
        cwd: api.cwd,
        pattern: `**/model.{ts,tsx,js,jsx}`,
        ...baseOpts,
      }),
    ]);
  }

  let hasModels = false;

  // 初始检测一遍
  api.onStart(() => {
    hasModels = getAllModels().length > 0;
  });

  api.addDepInfo(() => {
    return {
      name: 'dva',
      range: getDvaDependency(),
    };
  });

  // 生成临时文件
  api.onGenerateFiles({
    fn() {
      const models = getAllModels();
      hasModels = models.length > 0;

      logger.debug('dva models:');
      logger.debug(models);

      // 没有 models 不生成文件
      if (!hasModels) return;

      // dva.ts
      const dvaTpl = readFileSync(join(__dirname, 'dva.tpl'), 'utf-8');
      api.writeTmpFile({
        path: 'plugin-dva/dva.ts',
        content: Mustache.render(dvaTpl, {
          ExtendDvaConfig: '',
          EnhanceApp: '',
          dvaImmer: api.config.dva?.immer,
          dvaImmerPath: winPath(require.resolve('dva-immer')),
          dvaImmerES5:
            lodash.isPlainObject(api.config.dva?.immer) &&
            api.config.dva?.immer.enableES5,
          dvaImmerAllPlugins:
            lodash.isPlainObject(api.config.dva?.immer) &&
            api.config.dva?.immer.enableAllPlugins,
          LazyLoad: api.config.dva?.lazyLoad,
          RegisterModelImports: models
            .map((path, index) => {
              const modelName = `Model${lodash.upperFirst(
                lodash.camelCase(basename(path, extname(path))),
              )}${index}`;
              return api.config.dva?.lazyLoad
                ? `const ${modelName} = (await import('${path}')).default;`
                : `import ${modelName} from '${path}';`;
            })
            .join('\r\n'),
          RegisterModels: models
            .map((path, index) => {
              // prettier-ignore
              return `
app.model({ namespace: '${basename(path, extname(path))}', ...Model${lodash.upperFirst(lodash.camelCase(basename(path, extname(path))))}${index} });
          `.trim();
            })
            .join('\r\n'),
          // use esm version
          dvaLoadingPkgPath: winPath(
            require.resolve('dva-loading/dist/index.esm.js'),
          ),
          SSR: !!api.config?.ssr,
        }),
      });

      // runtime.tsx
      const runtimeTpl = readFileSync(join(__dirname, 'runtime.tpl'), 'utf-8');
      api.writeTmpFile({
        path: 'plugin-dva/runtime.tsx',
        content: Mustache.render(runtimeTpl, {
          SSR: !!api.config?.ssr,
        }),
      });

      // exports.ts
      const exportsTpl = readFileSync(join(__dirname, 'exports.tpl'), 'utf-8');
      const dvaLibPath = winPath(
        getUserLibDir({
          library: 'dva',
          pkg: api.pkg,
          cwd: api.cwd,
        }) || dirname(require.resolve('dva/package.json')),
      );
      const dvaVersion = require(join(dvaLibPath, 'package.json')).version;
      const exportMethods = dvaVersion.startsWith('2.6')
        ? ['connect', 'useDispatch', 'useStore', 'useSelector']
        : ['connect'];

      logger.debug(`dva version: ${dvaVersion}`);
      logger.debug(`exported methods:`);
      logger.debug(exportMethods);

      api.writeTmpFile({
        path: 'plugin-dva/exports.ts',
        content: Mustache.render(exportsTpl, {
          exportMethods: exportMethods.join(', '),
        }),
      });

      // typings

      const connectTpl = readFileSync(join(__dirname, 'connect.tpl'), 'utf-8');
      api.writeTmpFile({
        path: 'plugin-dva/connect.ts',
        content: Mustache.render(connectTpl, {
          dvaHeadExport: api.config.dva?.disableModelsReExport
            ? ``
            : models
              .map((path) => {
                // prettier-ignore
                // export type { IndexModelState } from '/Users/xiaohuoni/next-alita-app/src/models';
                return `export type { ${basename(path, extname(path)).toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}ModelState } from '${winPath(path)}';`;
              })
              .join('\r\n'),
          dvaLoadingModels: models
            .map((path) => {
              // prettier-ignore
              return `    ${basename(path, extname(path))
                } ?: boolean;`;
            })
            .join('\r\n'),
        }),
      });
    },
    // 要比 preset-built-in 靠前
    // 在内部文件生成之前执行，这样 hasModels 设的值对其他函数才有效
    stage: -1,
  });

  // src/models 下的文件变化会触发临时文件生成
  api.addTmpGenerateWatcherPaths(() => [getSrcModelsPath()]);

  // dva 优先读用户项目的依赖
  api.addProjectFirstLibraries(() => [
    { name: 'dva', path: dirname(require.resolve('dva/package.json')) },
  ]);

  // Babel Plugin for HMR
  api.modifyBabelOpts((babelOpts) => {
    const hmr = api.config.dva?.hmr;
    if (hmr) {
      const hmrOpts = lodash.isPlainObject(hmr) ? hmr : {};
      babelOpts.plugins.push([
        require.resolve('babel-plugin-dva-hmr'),
        hmrOpts,
      ]);
    }
    return babelOpts;
  });

  // Runtime Plugin
  api.addRuntimePlugin(() =>
    hasModels ? [join(api.paths.absTmpPath!, 'plugin-dva/runtime.tsx')] : [],
  );
  api.addRuntimePluginKey(() => (hasModels ? ['dva'] : []));

  // 导出内容
  api.addUmiExports(() =>
    hasModels
      ? [
        {
          exportAll: true,
          source: '../plugin-dva/exports',
        },
        {
          exportAll: true,
          source: '../plugin-dva/connect',
        },
      ]
      : [],
  );

  api.registerCommand({
    name: 'dva',
    fn({ args }) {
      if (args._[0] === 'list' && args._[1] === 'model') {
        const models = getAllModels();
        console.log();
        console.log(utils.chalk.bold('  Models in your project:'));
        console.log();
        models.forEach((model) => {
          console.log(`    - ${relative(api.cwd, model)}`);
        });
        console.log();
        console.log(`  Totally ${models.length}.`);
        console.log();
      }
    },
  });
};
