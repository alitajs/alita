export default {
  appType: 'pc',
  keepalive: [/./],
  mfsu: {},
  antd: {},
  hash: false,
  tabsLayout: {},
  routes: [
    {
      path: '/users',
      name: 'users',
      icon: 'smile',
      component: './users',
    },
    {
      path: '/foo',
      name: 'foo',
      icon: 'smile',
      component: './foo',
    },
    {
      path: '/',
      redirect: '/users',
    },
  ],
};
