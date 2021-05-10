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
    require.resolve('./plugins/features/displayName'),
    require.resolve('./plugins/features/packageId'),
    require.resolve('./plugins/features/displayIcon'),
    require.resolve('./plugins/features/noBuiltInPlugins'),
    require.resolve('@umijs/plugin-helmet')
  ];
  if (api.userConfig.appType !== 'pc') {
    plugins.push(require.resolve('@alitajs/hd'));
    plugins.push(require.resolve('@alitajs/layout'));
  }
  if (api.userConfig.appType === 'cordova') {
    plugins.push(require.resolve('@alitajs/cordova'));
  }
  if (api.userConfig.appType === 'micro') {
    plugins.push(require.resolve('@alitajs/micro'));
  }
  if (api.userConfig.appType === 'native' || api.userConfig.appType === 'micro') {
    plugins.push(require.resolve('@alitajs/native'));
  }
  if (api.userConfig.tabsLayout) {
    plugins.push(require.resolve('@alitajs/tabs-layout'));
  }
  if (api.userConfig.locale) {
    plugins.push(require.resolve('@umijs/plugin-locale'));
  }
  // pc 如果是 noBuiltInPlugins ，则为完全无内置插件的纯净版本
  if (api.userConfig.appType === 'pc' && !api.userConfig.noBuiltInPlugins) {
    plugins.push(require.resolve('@umijs/plugin-initial-state'));
    plugins.push(require.resolve('@umijs/plugin-model'));
    plugins.push(require.resolve('@umijs/plugin-access'));
    plugins.push(require.resolve('@alitajs/plugin-layout'));
  }

  // debug and console
  if(api.userConfig.aconsole){
    plugins.push(require.resolve('@alitajs/aconsole'));
  }
  return {
    plugins,
  };
}
