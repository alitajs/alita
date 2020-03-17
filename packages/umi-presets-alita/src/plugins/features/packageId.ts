import { IApi } from '@umijs/types';

export default (api: IApi) => {
  api.describe({
    key: 'packageId',
    config: {
      schema(joi) {
        return joi.string();
      },
    },
  });
};
