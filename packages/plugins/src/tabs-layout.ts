import type { AlitaApi } from '@alita/types';
import { logger } from '@umijs/utils';

export default (api: AlitaApi) => {
  // 只是为了增加一个 tabsLayout 的配置开关，逻辑在 keepalive 插件中实现
  api.onStart(() => {
    logger.info('Using TabsLayout Plugin');
  });

  api.describe({
    key: 'tabsLayout',
    config: {
      schema(Joi) {
        return Joi.alternatives(
          Joi.boolean(),
          Joi.object({
            hasCustomTabs: Joi.boolean(),
          }),
        );
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
    enableBy: api.EnableBy.config,
  });
  // 注册runtime配置
  api.addRuntimePluginKey(() => ['tabsLayout', 'getCustomTabs']);
};
