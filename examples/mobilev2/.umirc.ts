import { defineConfig } from 'alita';
export default defineConfig({
  appType: 'h5',
  keepalive: [/users/],
  aconsole: {
    console: {},
    inspx: {},
  },
  // 默认配置，此处留着调试使用
  // jsStrategy: 'bigVendors' | 'depPerChunk' | 'granularChunks';
  // codeSplitting: {
  //   jsStrategy: 'granularChunks'
  // },
  mobileLayout: true,
  polyfill: false,
  // mainPath:'users',
  mfsu: {},
  hash: false,
});
