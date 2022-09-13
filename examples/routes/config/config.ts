import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'h5',
  // 这个值在 appts 中被 getKeepAlive 修改
  keepalive: [],
  mobileLayout: true,
  legacyBuild: false,
  // mainPath:'users',
  mfsu: {},
  hash: false,
  // 可以通过配置里面指定 isKeepalive 来实现状态保持
  routes: [
    {
      path: '/',
      isKeepalive: true,
      component: './index',
    },
    {
      path: '/users',
      isKeepalive: true,
      component: './users',
    },
  ],
});
