import { IApi } from 'umi';
import { getConventionRoutes } from '@umijs/core';
import { getModuleExports } from '@umijs/preset-umi/dist/features/tmpFiles/getModuleExports';
import { resolve, winPath } from '@umijs/utils';
import { isAbsolute, join } from 'path';
import { existsSync, readFileSync } from 'fs';

export default (api: IApi) => {
  api.describe({
    key: 'extendsApp',
    config: {
      schema({ zod }) {
        return zod
          .object({
            root: zod.string(),
          })
          .partial();
      },
      default: {
        root: 'root',
      },
    },
  });

  const { extendsApp = {} } = api.userConfig;
  const { root = 'root' } = extendsApp;
  const rootCwd = winPath(join(api.paths.cwd, root));
  if (existsSync(rootCwd)) {
    const otherPagesPath = winPath(join(rootCwd, 'pages'));
    api.addTmpGenerateWatcherPaths(() => otherPagesPath);
    api.modifyRoutes(async (memo) => {
      // 配置式不支持
      if (api.userConfig.routes) return memo;
      const routes = getConventionRoutes({
        base: otherPagesPath,
        exclude: api.config.conventionRoutes?.exclude,
        prefix: 'pages/',
      });
      function localPath(path: string) {
        if (path.charAt(0) !== '.') {
          return `./${path}`;
        }
        {
          return path;
        }
      }
      // 取 memo 第一个路由的 parentId，这在 alita 的场景是可以保证准确性的
      let parentId;
      for (const id of Object.keys(memo)) {
        if (!memo[id].isLayout) {
          parentId = memo[id].parentId;
          break;
        }
      }
      for (const id of Object.keys(routes)) {
        if (routes[id].file) {
          let file = routes[id].file;
          const basedir = rootCwd;

          if (!isAbsolute(file)) {
            if (file.startsWith('@/')) {
              file = file.replace('@/', '../');
            }
            file = resolve.sync(localPath(file), {
              basedir,
              extensions: ['.js', '.jsx', '.tsx', '.ts', '.vue'],
            });
          }

          const isJSFile = /.[jt]sx?$/.test(file);
          // layout route 这里不需要这些属性
          if (!routes[id].isLayout) {
            routes[id].__content = readFileSync(file, 'utf-8');
            routes[id].__isJSFile = isJSFile;
            routes[id].parentId = parentId;
          }
          routes[id].__absFile = winPath(file);
          // 给绝对路径不受 prefix 影响
          // packages/preset-umi/src/features/tmpFiles/tmpFiles.ts#436
          routes[id].file = routes[id].__absFile;

          const enableSSR = api.config.ssr;
          const enableClientLoader = api.config.clientLoader;
          const enableRouteProps = !api.userConfig.routes;
          const needCollectExports =
            enableSSR || enableClientLoader || enableRouteProps;
          if (needCollectExports) {
            const exports =
              isJSFile && existsSync(file)
                ? await getModuleExports({
                    file,
                  })
                : [];
            if (enableSSR) {
              routes[id].hasServerLoader = exports.includes('serverLoader');
              routes[id].hasMetadataLoader = exports.includes('metadataLoader');
            }
            if (enableClientLoader && exports.includes('clientLoader')) {
              routes[id].clientLoader = `clientLoaders['${id}']`;
            }
            if (enableRouteProps && exports.includes('routeProps')) {
              routes[id].routeProps = `routeProps['${id}']`;
            }
          }
          memo[id] = routes[id];
        }
      }
      return memo;
    });
  }
};
