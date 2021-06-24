import { IApi, IConfig } from '@umijs/types';

export default (api: IApi) => {
  const defaultOptions = {
    history: { type: 'hash' },
    title: false, // 默认内置了 Helmet
    targets: {
      ie: 9,
    },
    hash: true,
    esbuild: {},
    // dynamicImport: {},
    nodeModulesTransform: {
      type: 'none',
      exclude: [],
    },
    dva: {},
    antd: {},
    routesExtend: {
      // 规定只有index文件会被识别成路由
      exclude: [
        /(?<!(index|\[index\]|404)(\.(js|jsx|ts|tsx)))$/,
        /model\.(j|t)sx?$/,
        /\.test\.(j|t)sx?$/,
        /service\.(j|t)sx?$/,
        /models\//,
        /components\//,
        /services\//,
      ],
    },
    ...api.userConfig
  } as IConfig;
  api.modifyDefaultConfig((memo) => {
    return {
      ...memo,
      ...defaultOptions,
    };
  });
};
