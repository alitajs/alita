import { IApi } from '@umijs/types';

export default function (api: IApi) {
  let plugins = [
    // commands
    require.resolve('./plugins/commands/version'),
    require.resolve('@alitajs/generate'),

    // bundle configs
    require.resolve('@umijs/plugin-request'),
    require.resolve('@umijs/plugin-dva'),
    require.resolve('@umijs/plugin-antd'),
    require.resolve('./plugins/features/appType'),
    require.resolve('@alitajs/routes'),
    require.resolve('@alitajs/router'),
    require.resolve('@alitajs/keep-alive'),
    require.resolve('@alitajs/main-path'),
    require.resolve('@alitajs/retain-log'),
    require.resolve('./plugins/defaultConfig'),
    require.resolve('./plugins/features/complexRoute'),
    require.resolve('@umijs/plugin-esbuild'),
  ];
  if (api.userConfig.appType !== 'pc') {
    plugins.push(require.resolve('@alitajs/hd'));
    plugins.push(require.resolve('@alitajs/layout'));
  }
  if (api.userConfig.appType === 'cordova') {
    plugins.push(require.resolve('@alitajs/cordova'));
    plugins.push(require.resolve('./plugins/features/displayName'));
    plugins.push(require.resolve('./plugins/features/packageId'));
    plugins.push(require.resolve('@alitajs/native'));
  }
  if (api.userConfig.tabsLayout) {
    plugins.push(require.resolve('@alitajs/tabs-layout'));
  }
  if (api.userConfig.locale) {
    plugins.push(require.resolve('@umijs/plugin-locale'));
  }
  return {
    plugins
  };
}
