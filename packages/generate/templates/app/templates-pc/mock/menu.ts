export default {
  'GET /api/hello': {
    text: 'Alita1',
  },
  'GET /api/menu': [
    {
      path: '/',
      name: 'index',
      icon: 'smile',
      // hideLayout: true,
      component: './index',
    },
    {
      path: '/ListTableList',
      name: 'list',
      icon: 'heart',
      access: 'canAdmin',
      component: './ListTableList',
    },
  ],
};
