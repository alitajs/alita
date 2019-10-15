export default {
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/',
          component: './index',
        },
        {
          path: '/list',
          component: './list',
          keepAlive: true,
        },
        {
          path: '/item',
          component: './item',
        },
      ],
    },
  ],
  exportStatic: true,
};
