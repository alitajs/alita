/**
 * 当前示例为 推荐写法
 * 为了更方便使用后续提供的更多的配置
 * 推荐将 menu、layout 的相关配置项聚合配置
 */
const normalRoute = [
  {
    path: '/',
    component: '../layout/BasicLayout',
    flatMenu: true,
    indexRoute: {
      component: 'IndexPage',
      menu: {
        name: '首页',
      },
      layout: false,
    },
    routes: [
      {
        path: 'welcome',
        component: 'IndexPage',
        menu: {
          name: '欢迎', // 兼容此写法
          icon: 'testicon',
        },
      },
      {
        path: 'test',
        menu: {
          name: '菜单示例',
        },
        routes: [
          {
            path: '1', // 会拼接上 parentPath 'test'
            component: 'IndexPage',
            menu: {
              name: '示例 1',
            },
            layout: {
              hideMenu: true,
            },
          },
          {
            path: '/test233', // 以 '/' 或者 'http' 开头均为绝对路径，不会拼接
            component: 'IndexPage',
            menu: {
              name: '示例 2',
              icon: 'testicon',
            },
            layout: {
              hideNav: true,
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
    menu: {
      name: '关于 Bigfish',
    },
  },
];

const normalMenu = [
  { name: '首页', path: '/' },
  { name: '欢迎', path: '/welcome', icon: 'testicon' },
  {
    name: '菜单示例',
    path: '/test',
    children: [
      { name: '示例 1', path: '/test/1' },
      {
        name: '示例 2',
        path: '/test233',
        icon: 'testicon',
      },
    ],
  },
  {
    name: '关于 Bigfish',
    path: 'https://bigfish.antfin-inc.com/',
  },
];

export { normalRoute, normalMenu };
