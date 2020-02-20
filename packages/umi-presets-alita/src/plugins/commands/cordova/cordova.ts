import { IApi } from '@umijs/types';

export default (api: IApi) => {
  if (api.config.appType === 'cordova') {
    api.registerPlugins(['umi-plugin-cordova']);
  }
};
