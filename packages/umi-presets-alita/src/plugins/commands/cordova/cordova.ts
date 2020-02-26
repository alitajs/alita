import { IApi } from '@umijs/types';

export default (api: IApi) => {
  if (api.userConfig.appType === 'cordova') {
    api.registerPlugins(['@alitajs/cordova']);
  }
};
