import { IApi, IConfig } from '@umijs/types';

export default (api: IApi) => {

  const defaultOptions = {
    history: { type: 'hash' },
    targets: {
      ie: 9,
    },
    nodeModulesTransform: {
      type: 'none',
      exclude: []
    },
    // dynamicImport: true,
    // dynamicImport: {
    //   webpackChunkName: true,
    //   level: 3,
    // },
    dva: {},
    antd: {},
    routesExtend: {
      // 规定只有index文件会被识别成路由
      exclude: [
        /(?<!(index|\[index\])(\.(js|jsx|ts|tsx))?)$/,
        /model\.(j|t)sx?$/,
        /\.test\.(j|t)sx?$/,
        /service\.(j|t)sx?$/,
        /models\//,
        /components\//,
        /services\//
      ]
    },
  } as IConfig;

  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      ...defaultOptions,
    }
  });
};
