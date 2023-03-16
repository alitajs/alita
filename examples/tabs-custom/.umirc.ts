export default {
  appType: 'pc',
  keepalive: [/./],
  mfsu: {},
  antd: {},
  hash: false,
  tabsLayout: {
    hasCustomTabs: true,
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
