import { IApi } from '@umijs/types';

export default (api: IApi) => {
  api.describe({
    key: 'mobile5',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });

  if (!api.userConfig.mobile5) {
    api.registerPlugins([require.resolve('@umijs/plugin-antd')]);
  } else {
    api.registerPlugins([require.resolve('@alitajs/plugin-antd-mobile')]);
  }
};
