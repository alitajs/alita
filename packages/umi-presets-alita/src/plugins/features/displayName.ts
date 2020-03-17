import { IApi } from '@umijs/types';

export default (api: IApi) => {
  api.describe({
    key: 'displayName',
    config: {
      schema(joi) {
        return joi.string();
      },
      default: 'Alita Demo',
    },
  });
};
