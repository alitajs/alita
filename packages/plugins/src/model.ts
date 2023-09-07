import type { AlitaApi } from '@alita/types';
import modelPlugin from '@umijs/plugins/dist/model';

export default (api: AlitaApi) => {
  api.describe({
    key: 'model',
    config: {
      schema(Joi) {
        return Joi.object({
          extraModels: Joi.array().items(Joi.string()),
        });
      },
    },
    // 默认开启
    // enableBy: api.EnableBy.config,
  });
  // only dev or build running
  if (!['dev', 'build', 'dev-config', 'preview', 'setup'].includes(api.name))
    return;

  // umi model 里面不注册
  api.describe = () => {};
  // @ts-ignore
  modelPlugin(api);
};
