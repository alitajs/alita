// @ts-ignore
import AlitaLogo from './logo.png';

export default {
  title: 'Alita',
  description: '基于 Umi 的 React 前端框架',
  logo: AlitaLogo,
  github: 'https://github.com/alitajs/alita',
  i18n: [
    { locale: 'en-US', text: 'English' },
    { locale: 'zh-CN', text: '简体中文' },
  ],
  searchHotKey: {
    macos: '⌘+k',
    windows: 'ctrl+k',
  },
  navs: [
    {
      path: '/docs',
      title: 'Docs',
      type: 'nav',
      children: [
        {
          title: 'Tutorials',
          children: [
            'tutorials/getting-started',
            // 'tutorials/blog'
          ],
        },
        {
          title: 'Config',
          children: [
            'config/config',
            'config/runtime-config',
            // 'tutorials/blog'
          ],
        },
        // {
        //   title: 'Introduce',
        //   children: ['introduce/introduce', 'introduce/upgrade-to-alita-3'],
        // },
        {
          title: 'API',
          children: [
            'api/route-api',
            'api/request-api',
            'api/model-api',
            'api/dva-api',
            'api/layout-api',
            'api/other-api',
          ],
        },
        {
          title: 'Component',
          children: ['component/component'],
        },
        {
          title: 'Guides',
          children: [
            'guides/directory-structure',
            'guides/alita-layout',
            'guides/route',
            'guides/request',
            'guides/mock',
            'guides/proxy',
            'guides/locale',
            // 'guides/helmet',
            'guides/commands',
            'guides/env-variables',
            'guides/boilerplate',
            'guides/generator',
            'guides/native',
          ],
        },
      ],
    },
    // {
    //   path: '/blog',
    //   title: 'Blog',
    //   type: 'nav',
    //   children: [
    //     {
    //       title: 'Blog',
    //       children: [],
    //     },
    //   ],
    // },
    // {
    //   path: '/components',
    //   title: 'Components',
    //   type: 'nav',
    //   children: [
    //     {
    //       title: '组件',
    //       children: ['d-form', 'list-view', 'd-a-d', 'gesture-password'],
    //     },
    //   ],
    // },
  ],
};
