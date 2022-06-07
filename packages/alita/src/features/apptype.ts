import { IApi } from 'umi';

export default (api: IApi) => {
  api.describe({
    key: 'appType',
    config: {
      schema(Joi) {
        return Joi.string().valid(
          'h5',
          'pc',
          'docs',
          'cordova',
          'micro',
          'native',
        );
      },
      default: 'h5',
    },
  });
};
