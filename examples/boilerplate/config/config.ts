import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'h5',
  // 这个值在 appts 中被 getKeepAlive 修改
  keepalive: [/./],
  mobileLayout: true,
  // mainPath:'users',
  mfsu: {},
  hash: false,
});
