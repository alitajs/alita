import { IApi, IConfig } from '@umijs/types';

export default (api: IApi) => {

  const defaultOptions = {
    history: { type: 'hash' },
    targets: {
      ie: 9,
    },
    esbuild: {},
    devtool: 'eval',
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
  if (api.userConfig.appType === 'pc') {
    defaultOptions.externals = {
      'react': 'window.React',
      'react-dom': 'window.ReactDOM',
    }
    defaultOptions.scripts = process.env.NODE_ENV === 'development' ? [
      'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js',
      'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js',
    ] : [
        'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
        'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js',
      ];
  }
  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      ...defaultOptions,
    }
  });
};
