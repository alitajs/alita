import { IApi } from '@umijs/types';

export default (api: IApi) => {
  api.describe({
    key: 'complexRoute',
    config: {
      schema(joi) {
        return joi.boolean();
      },
      default: false,
    },
  });
  if (api.userConfig.complexRoute) {
    api.modifyDefaultConfig(memo => {
      return {
        ...memo,
        routesExtend: {
          // 保留umi的路由，过滤了非page的文件
          exclude: [
            /model\.(j|t)sx?$/,
            /\.test\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//
          ]
        },
      }
    });
  }
};
