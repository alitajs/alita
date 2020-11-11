/**
 * 当前示例为测试 onex 场景下的 mock 数据是否可以正确生成
 */
const prefixRoute = [
  {
    path: '/',
    component: '../layout/BasicLayout',
    flatMenu: true,
    layout: {
      hideMenu: true,
    },
    indexRoute: {
      component: 'IndexPage',
      name: '首页',
    },
    routes: [
      {
        path: 'welcome',
        component: 'IndexPage',
        name: '欢迎', // 兼容此写法
        icon: 'testicon',
        layout: {
          hideMenu: false,
        },
      },
      {
        path: 'test',
        name: '菜单示例',
        layout: {
          hideNav: true,
        },
        routes: [
          {
            path: '1', // 会拼接上 parentPath 'test'
            component: 'IndexPage',
            name: '示例 1',
          },
          {
            path: '/test233', // 以 '/' 或者 'http' 开头均为绝对路径，不会拼接
            component: 'IndexPage',
            name: '示例 2',
            icon: 'testicon',
            layout: {
              hideNav: false,
            },
          },
          {
            path: '/test_hide', // 测试隐藏菜单
            component: 'IndexPage',
          },
        ],
      },
    ],
  },
  {
    path: 'https://bigfish.antfin-inc.com/',
    name: '关于 Bigfish',
  },
];

const prefixMenu = [
  { name: '首页', path: '#/$name/' },
  { name: '欢迎', path: '#/$name/welcome', icon: 'testicon' },
  {
    name: '菜单示例',
    path: '#/$name/test',
    children: [
      { name: '示例 1', path: '#/$name/test/1' },
      {
        name: '示例 2',
        path: '#/$name/test233',
        icon: 'testicon',
      },
    ],
  },
  {
    name: '关于 Bigfish',
    path: 'https://bigfish.antfin-inc.com/',
  },
];

export { prefixRoute, prefixMenu };
