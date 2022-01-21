import modelPlugin from '@umijs/plugins/dist/model';
import { logger } from '@umijs/utils';
import { AlitaApi } from 'alita';

export default (api: AlitaApi) => {
  api.onStart(() => {
    logger.info('Using UseModel Plugin');
  });
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

  // umi model 里面不注册
  api.describe = () => {};
  // @ts-ignore
  modelPlugin(api);
};
