import { logger, winPath } from '@umijs/utils';
import { AlitaApi } from 'alita';
import { dirname, join } from 'path';
import semver from 'semver';
import { resolveProjectDep } from './utils/resolveProjectDep';

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
      // modifyConfig 的时候 api.paths 为 {}
      const nodeModulesPath =
        api.paths.absNodeModulesPath || `${api.cwd}/node_modules`;
      version = require(`${nodeModulesPath}/antd-mobile/package.json`).version;
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
  api.onStart(() => {
    logger.info('Using Antd Mobile Plugin');
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

  api.modifyConfig((memo) => {
    const [isAntdMobile5, hasDeps] = checkAntdMobile(api);
    const pkgPath =
      resolveProjectDep({
        pkg: api.pkg,
        cwd: api.cwd,
        dep: 'antd-mobile-v2',
      }) || dirname(require.resolve('antd-mobile-v2/package.json'));
    memo.alias['antd-mobile-v2'] = pkgPath;

    let pkgMobilePath;
    if (hasDeps) {
      pkgMobilePath =
        resolveProjectDep({
          pkg: api.pkg,
          cwd: api.cwd,
          dep: 'antd-mobile',
        }) || `${api.cwd}/node_modules/antd-mobile`;
    } else {
      pkgMobilePath = dirname(require.resolve('antd-mobile/package.json'));
    }
    memo.alias['antd-mobile'] = winPath(
      join(
        pkgMobilePath,
        isAntdMobile5 && api.userConfig.appType !== 'pc' ? '2x' : '',
      ),
    );
    return memo;
  });
};
