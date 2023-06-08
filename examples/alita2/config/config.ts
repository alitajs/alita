const isSSR = false;
const isCordova = false;
const outputPath = isCordova ? 'www' : 'dist';
const env = process.env.NODE_ENV;
// 这里需要对应服务器地址
const path = env === 'development' ? 'http://127.0.0.1:8000/' : outputPath;

export default {
  appType: isCordova ? 'cordova' : 'h5',
  mobileLayout: true,
  hash: false,
  // ssr: isSSR && !isCordova ? {} : false,
  outputPath: outputPath,
  publicPath: isSSR && !isCordova ? path : './',
  keepalive: ['lisT'],
  // packageId: 'com.alita.demos',
  // displayName: 'alita-demos',
  antd: {},
  // mobile5: true,
  aconsole: {
    inspx: {},
    console: {},
  },
};
