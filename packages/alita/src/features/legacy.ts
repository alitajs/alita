import { logger } from '@umijs/utils';
import { IApi } from 'umi';

export default (api: IApi) => {
  api.describe({
    key: 'legacyBuild',
    config: {
      schema(Joi) {
        return Joi.boolean();
      },
    },
  });
  api.onStart(() => {
    if (!api.userConfig.legacy) {
      const text =
        '[WARN] 为了构建默认快，alita@3.3+ 之后移除了默认 legacy 配置，如果你的项目有低版本浏览器兼容，请在配置文件中使用  legacy:{} ';
      logger.warn(text);
      logger.warn(text);
      logger.warn(text);
      logger.warn('不想看到这个提示，请在配置文件中增加 legacyBuild:false ');
      logger.warn('我们将会在以后的版本中，移除这些提示');
    }
  });
};
