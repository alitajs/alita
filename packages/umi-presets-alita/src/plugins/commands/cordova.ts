import { IApi } from '@umijs/types';

export default (api: IApi) => {
  if (api.userConfig.appTyep === 'cordova') {
    api.registerPlugins([require.resolve('@alitajs/cordova')]);
  }
};
