import { logger, resolve, winPath } from '@umijs/utils';
import { AlitaApi } from 'alita';
import { dirname, join } from 'path';
import semver from 'semver';

const checkAntdMobile = (api: AlitaApi) => {
  if (
    // @ts-ignore
    (api.pkg.dependencies && api.pkg.dependencies['antd-mobile']) ||
    // @ts-ignore
    (api.pkg.devDependencies && api.pkg.devDependencies['antd-mobile']) ||
    // egg project using `clientDependencies` in ali tnpm
    // @ts-ignore
    (api.pkg.clientDependencies && api.pkg.clientDependencies['antd-mobile'])
  ) {
    let version = '5.0.0-rc.2';
    try {
      version =
        require(`${api.paths.absNodeModulesPath}/antd-mobile/package.json`).version;
    } catch (error) {}
    return [semver.lt('5.0.0-alpha.0', version), true];
  }

  // 用户没有安装
  return [true, false];
};

/**
 * https://github.com/umijs/plugins/issues/757
 * 补充需求：
 * plugin-antd-mobile 中增加 antd-mobile-v2 的依赖，并且为 antd-mobile-v2 增加 babel-plugin-import 配置
 * plugin-antd-mobile 中增加用户项目中自己安装的 antd-mobile 版本号判断，如果是 v2 的，那么为用户配置 babel-plugin-import
 * (为了满足 antd-mobile 2 到 5 的过渡，更改此插件之前请先仔细阅读上述需求)
 */
export default (api: AlitaApi) => {
  logger.info('Using Antd Mobile Plugin');

  api.describe({
    key: 'hd',
    config: {
      schema(Joi) {
        return Joi.object({});
      },
    },
  });
  // babel-plugin-import
  api.addExtraBabelPlugins(() => {
    const [isAntdMobile5, hasDeps] = checkAntdMobile(api);
    const imps = [
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: 'antd-mobile-v2',
          libraryDirectory: 'es',
          style: true,
        },
        'antd-mobile-v2',
      ],
    ];
    // 如果用户显示安装了 antd-mobile@2 则为用户添加 babel-plugin-import
    if (hasDeps && !isAntdMobile5) {
      imps.push([
        require.resolve('babel-plugin-import'),
        {
          libraryName: 'antd-mobile',
          libraryDirectory: 'es',
          style: true,
        },
        'antd-mobile',
      ]);
    }
    return imps;
  });

  api.chainWebpack((memo) => {
    const [isAntdMobile5, hasDeps] = checkAntdMobile(api);
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
      'antd-mobile-v2',
      getUserLibDir({ library: 'antd-mobile-v2' }) ||
        dirname(require.resolve('antd-mobile-v2/package.json')),
    );
    //如果项目中安装的是 antd-mobile@5 优先使用用户项目中安装的 antd-mobile，否则忽略用户安装，强制指定 mobile@5 版本
    memo.resolve.alias.set(
      'antd-mobile',
      winPath(
        join(
          // 通过 resolve 往上找，可支持 lerna 仓库
          // lerna 仓库如果用 yarn workspace 的依赖不一定在 node_modules，可能被提到根目录，并且没有 link
          dirname(
            hasDeps
              ? resolve.sync(`antd-mobile/package.json`, {
                  basedir: api.paths.cwd,
                })
              : require.resolve('antd-mobile/package.json'),
          ),
          isAntdMobile5 && api.userConfig.hd ? '2x' : '',
        ),
      ),
    );
    return memo;
  });
};
