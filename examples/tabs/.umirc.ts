export default {
  appType: 'pc',
  keepalive: [/foo/],
  mfsu: {},
  antd: {},
  hash: false,
  tabsLayout: {
    hasDropdown: true,
    hasFixedHeader: true,
  },
  routes: [
    {
      path: '/users',
      name: 'users',
      icon: 'smile',
      component: './users',
    },
    {
      path: '/foo/:index',
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
