import { IApi } from 'umi';
import { basename, extname, join, dirname } from 'path';
import { readFileSync } from 'fs';
import { getModels } from './getModels/getModels';


const DIR_NAME = 'plugin-dva-types';
const FILE_NAME = 'alitaconnect.d';
const RELATIVE_FILE = join(DIR_NAME, FILE_NAME);
const RELATIVE_FILE_PATH = `${RELATIVE_FILE}.ts`;

export default (api: IApi) => {
  const { Mustache, lodash, winPath } = api.utils;
  function getModelDir() {
    return api.config.singular ? 'model' : 'models';
  }

  function getSrcModelsPath() {
    return join(api.paths.absSrcPath!, getModelDir());
  }

  function hasDvaDependency() {
    const { dependencies, devDependencies } = api.pkg;
    return dependencies?.dva || devDependencies?.dva;
  }

  function getAllModels() {
    const srcModelsPath = getSrcModelsPath();
    return [
      ...getModels({
        base: srcModelsPath,
      }).map(p => winPath(join(srcModelsPath, p))),
      ...getModels({
        base: api.paths.absPagesPath!,
        pattern: `**/${getModelDir()}/**/*.{ts,tsx,js,jsx}`,
      }).map(p => winPath(join(api.paths.absPagesPath!, p))),
    ];
  }

  let hasModels = false;

  // 初始检测一遍
  api.onStart(() => {
    hasModels = getAllModels().length > 0;
  });

  // 生成临时文件
  api.onGenerateFiles({
    fn() {
      const models = getAllModels();
      hasModels = models.length > 0;

      // 没有 models 不生成文件
      if (!hasModels) return;

      // connect.d.ts
      const dvaTpl = readFileSync(join(__dirname, 'connect.tpl'), 'utf-8');
      api.writeTmpFile({
        path: RELATIVE_FILE_PATH,
        content: Mustache.render(dvaTpl, {
          alitaDvaHeadImport: models
            .map(path => {
              // prettier-ignore
              return `import { ${lodash.upperFirst(basename(path, extname(path)))}ModelState } from '${winPath(dirname(path) + "/" + basename(path, extname(path)))}';`.trim();
            })
            .join('\r\n'),
          alitaDvaHeadExport: `export type { ${models
            .map(path => {
              // prettier-ignore
              return lodash.upperFirst(basename(path, extname(path))) + 'ModelState';
            })} }`,
          alitaDvaLoadingModels: models
            .map(path => {
              // prettier-ignore
              return `${basename(path, extname(path))
                } ?: boolean; `.trim();
            })
            .join('\r\n'),
          alitaDvaConnectState: models
            .map(path => {
              // prettier-ignore
              return `${basename(path, extname(path))}?: ${lodash.upperFirst(basename(path, extname(path)))}ModelState; `.trim();
            })
            .join('\r\n'),
        }),
      });
    },
    stage: -1,
  });
  // src/models 下的文件变化会触发临时文件生成
  api.addTmpGenerateWatcherPaths(() => [getSrcModelsPath()]);
  if (!hasModels) return;
  api.addUmiExports(() => [
    {
      exportAll: true,
      source: `../${RELATIVE_FILE}`,
    },
    {
      specifiers: ['Reducer'],
      source: 'redux',
    },
  ]);
};
