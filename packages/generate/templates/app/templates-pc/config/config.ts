export default {
  appType: 'pc',
  locale: {},
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          name: 'index',
          icon: 'smile',
          component: './index/index',
        },
      ],
    },
  ],
};
