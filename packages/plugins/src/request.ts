import type { AlitaApi } from '@alita/types';
import { logger, resolve, winPath } from '@umijs/utils';

import { dirname } from 'path';

export default (api: AlitaApi) => {
  api.describe({
    key: 'request',
    config: {
      schema(Joi) {
        return Joi.object();
      },
    },
  });
  api.addRuntimePluginKey(() => ['request']);

  // only dev or build running
  if (!['dev', 'build'].includes(api.name)) return;

  api.onStart(() => {
    logger.info('Using Request Plugin');
  });
  // 注册runtime配置
  api.addEntryCodeAhead(() => [
    `
      import { getPluginManager } from './core/plugin';
      import { setRequestConfig } from '${winPath(
        dirname(require.resolve('@alita/request/package')),
      )}';
    `,
  ]);
  api.addEntryCode(() => [
    `setRequestConfig(getPluginManager().applyPlugins({ key: 'request',type: 'modify', initialValue: {} }))`,
  ]);

  api.onGenerateFiles(() => {
    // index.ts for export
    api.writeTmpFile({
      path: 'index.ts',
      content: `
        export { request } from '${winPath(
          dirname(require.resolve('@alita/request/package')),
        )}';
        export { useRequest } from '${winPath(
          dirname(require.resolve('ahooks/package')),
        )}';
      `,
    });

    // types.ts
    api.writeTmpFile({
      path: 'types.d.ts',
      tpl: `export { ResponseError,Context,RequestConfig } from '${winPath(
        dirname(require.resolve('@alita/request/package')),
      )}';`,
      context: {},
    });
  });
  api.chainWebpack((memo) => {
    function getUserLibDir({ library }: { library: string }) {
      if (
        // @ts-ignore
        (api.pkg.dependencies && api.pkg.dependencies[library]) ||
        // @ts-ignore
        (api.pkg.devDependencies && api.pkg.devDependencies[library]) ||
        // egg project using `clientDependencies` in ali tnpm
        // @ts-ignore
        (api.pkg.clientDependencies && api.pkg.clientDependencies[library])
      ) {
        return winPath(
          dirname(
            // 通过 resolve 往上找，可支持 lerna 仓库
            // lerna 仓库如果用 yarn workspace 的依赖不一定在 node_modules，可能被提到根目录，并且没有 link
            resolve.sync(`${library}/package.json`, {
              basedir: api.paths.cwd,
            }),
          ),
        );
      }
      return null;
    }
    // 用户也可以通过显示安装 antd-mobile-v2，升级版本
    memo.resolve.alias.set(
      'ahooks',
      getUserLibDir({ library: 'ahooks' }) ||
        dirname(require.resolve('ahooks/package.json')),
    );

    return memo;
  });

  // api.modifyConfig((memo) => {
  //   function getUserLibDir({ library }: { library: string }) {
  //     if (
  //       // @ts-ignore
  //       (api.pkg.dependencies && api.pkg.dependencies[library]) ||
  //       // @ts-ignore
  //       (api.pkg.devDependencies && api.pkg.devDependencies[library]) ||
  //       // egg project using `clientDependencies` in ali tnpm
  //       // @ts-ignore
  //       (api.pkg.clientDependencies && api.pkg.clientDependencies[library])
  //     ) {
  //       return winPath(
  //         dirname(
  //           // 通过 resolve 往上找，可支持 lerna 仓库
  //           // lerna 仓库如果用 yarn workspace 的依赖不一定在 node_modules，可能被提到根目录，并且没有 link
  //           resolve.sync(`${library}/package.json`, {
  //             basedir: api.paths.cwd,
  //           }),
  //         ),
  //       );
  //     }
  //     return null;
  //   }
  //   // ahooks import
  //   memo.alias.ahooks = getUserLibDir({ library: 'ahooks' }) ||
  //     winPath(dirname(require.resolve('ahooks/package.json')));

  //   return memo;
  // });
};
