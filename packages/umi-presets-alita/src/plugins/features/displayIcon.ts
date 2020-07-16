import { IApi } from '@umijs/types';

export default (api: IApi) => {
  api.describe({
    key: 'displayIcon',
    config: {
      schema(joi) {
        return joi.string();
      },
    },
  });
};
