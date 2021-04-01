import { IApi } from '@umijs/types';

export default (api: IApi) => {
  api.describe({
    key: 'noBuiltInPlugins',
    config: {
      schema(joi) {
        return joi.boolean();
      },
      default: false,
    },
  });
};
