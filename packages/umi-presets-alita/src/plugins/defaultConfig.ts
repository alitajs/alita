import { IApi, IConfig } from '@umijs/types';

export default (api: IApi) => {
  // 这几个配置需要合并配置
  const { externals = {}, scripts = [] } = api.userConfig;
  const defaultOptions = {
    history: { type: 'hash' },
    targets: {
      ie: 9,
    },
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
        /(?<!(index|\[index｜404\])(\.(js|jsx|ts|tsx))?)$/,
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
  defaultOptions.externals = [
    {
      // String
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
      // Object
    },
    // Function
    function (context, request, callback) {
      callback();
    },
  ]
  defaultOptions.scripts = [
    'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js',
  ]
  // 优化程度不高
  // if (process.env.NODE_ENV !== 'development') {
  //   defaultOptions.externals = {
  //     ...{
  //       'react': 'window.React',
  //       'react-dom': 'window.ReactDOM',
  //     },
  //     ...externals
  //   }
  //   // 临时方案，scripts 配置会覆盖
  //   // defaultOptions.scripts = [
  //   //   'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
  //   //   'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js',
  //   // ].concat(scripts);
  //   api.addHTMLScripts(() => {
  //     return [
  //       { src: 'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js', },
  //       { src: 'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js', }
  //     ]
  //   });
  // }
  api.modifyDefaultConfig((memo) => {
    return {
      ...memo,
      ...defaultOptions,
    };
  });
};
