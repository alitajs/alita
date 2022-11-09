import type { AlitaApi } from '@alita/types';
import { logger } from '@umijs/utils';

import { checkAntdMobile } from './utils/checkAntdMobile';

/**
 * https://github.com/umijs/plugins/issues/757
 * 补充需求：
 * plugin-antd-mobile 中增加 antd-mobile-v2 的依赖，并且为 antd-mobile-v2 增加 babel-plugin-import 配置
 * plugin-antd-mobile 中增加用户项目中自己安装的 antd-mobile 版本号判断，如果是 v2 的，那么为用户配置 babel-plugin-import
 * (为了满足 antd-mobile 2 到 5 的过渡，更改此插件之前请先仔细阅读上述需求)
 */
export default (api: AlitaApi) => {
  // only dev or build running
  if (!['dev', 'build'].includes(api.name)) return;

  api.onStart(() => {
    logger.info('Using Antd Mobile Plugin');
  });

  // babel-plugin-import
  api.addExtraBabelPlugins(() => {
    const [isAntdMobile5, hasDeps] = checkAntdMobile(api);
    const imps = [
      // TODO: 让用户手动配置
      // [
      //   require.resolve('babel-plugin-import'),
      //   {
      //     libraryName: 'antd-mobile-v2',
      //     libraryDirectory: 'es',
      //     style: true,
      //   },
      //   'antd-mobile-v2',
      // ],
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

  // api.modifyConfig((memo) => {
  // const [isAntdMobile5, hasDeps] = checkAntdMobile(api);
  // 项目中显示安装
  // const pkgPath =
  //   resolveProjectDep({
  //     pkg: api.pkg,
  //     cwd: api.cwd,
  //     dep: 'antd-mobile-v2',
  //   }) || dirname(require.resolve('antd-mobile-v2/package.json'));
  // memo.alias['antd-mobile-v2'] = pkgPath;

  // let pkgMobilePath;
  // if (hasDeps) {
  //   pkgMobilePath =
  //     resolveProjectDep({
  //       pkg: api.pkg,
  //       cwd: api.cwd,
  //       dep: 'antd-mobile',
  //     }) || `${api.cwd}/node_modules/antd-mobile`;
  // } else {
  //   pkgMobilePath = dirname(require.resolve('antd-mobile/package.json'));
  // }
  // memo.alias['antd-mobile'] = winPath(
  //   join(
  //     pkgMobilePath,
  //     isAntdMobile5 && api.userConfig.appType !== 'pc' ? '2x' : '',
  //   ),
  // );
  // return memo;
  // });
};
