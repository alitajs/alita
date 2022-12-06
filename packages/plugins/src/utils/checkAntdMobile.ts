import type { AlitaApi } from '@alita/types';

import semver from 'semver';
import { resolveProjectDep } from './resolveProjectDep';

export const checkAntdMobile = (api: AlitaApi) => {
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
        resolveProjectDep({
          pkg: api.pkg,
          cwd: api.cwd,
          dep: 'antd-mobile',
        }) || `${api.cwd}/node_modules/antd-mobile`;
      version = require(`${nodeModulesPath}/package.json`).version;
    } catch (error) {}
    return [semver.lt('5.0.0-alpha.0', version), true];
  }

  // 用户没有安装
  return [true, false];
};

export const hasAntdMobile5 = (api: AlitaApi) => {
  if (
    // @ts-ignore
    (api.pkg.dependencies && api.pkg.dependencies['antd-mobile-5']) ||
    // @ts-ignore
    (api.pkg.devDependencies && api.pkg.devDependencies['antd-mobile-5']) ||
    // egg project using `clientDependencies` in ali tnpm
    // @ts-ignore
    (api.pkg.clientDependencies && api.pkg.clientDependencies['antd-mobile-5'])
  ) {
    return true;
  }

  // 用户没有安装
  return false;
};
