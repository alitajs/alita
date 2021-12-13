import type { Root } from '@umijs/core/compiled/@hapi/joi';

export function getSchemas(): Record<string, (Joi: Root) => any> {
  // 这是一些只有配置没有功能的设置，可能是配置项会在多个插件中使用
  return {
    displayIcon: (Joi) => Joi.string(),
    displayName: (Joi) => Joi.string(),
    packageId: (Joi) => Joi.string(),
    complexRoute: (Joi) => Joi.boolean(),
    retainLog: (Joi) => Joi.boolean(),
  };
}
