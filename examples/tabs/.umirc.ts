export default {
  appType: 'pc',
  keepalive: [/./],
  mfsu: {},
  antd: {},
  hash: false,
  tabsLayout: {
    hasDropdown: true,
    hasFixedHeader: true,
  },
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
  },
  routes: [
    {
      path: '/users',
      name: 'users',
      icon: 'smile',
      component: './users',
    },
    {
      path: '/lowerCase',
      name: 'lowerCase',
      icon: 'smile',
      component: './lowerCase',
    },
    {
      path: '/foo/:index',
      name: 'foo',
      icon: 'smile',
      component: './foo',
    },
    {
      path: '/',
      name: 'home',
      icon: 'smile',
      component: './index',
    },
  ],
};
