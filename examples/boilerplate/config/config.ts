import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'h5',
  // 这个值在 appts 中被 getKeepAlive 修改
  keepalive: [/./],
  mobileLayout: true,
  legacyBuild: false,
  // mainPath:'users',
  mfsu: {},
  hash: false,
  reactRouter5Compat: {},
  exportStatic: {},
});
