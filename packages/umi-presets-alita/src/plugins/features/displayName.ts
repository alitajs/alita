import { IApi } from '@umijs/types';

export default (api: IApi) => {
  api.describe({
    key: 'displayName',
    config: {
      schema(joi) {
        return joi.boolean();
      },
      default: 'Alita Demo',
    },
  });
};
