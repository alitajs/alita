// @ts-ignore
import AlitaLogo from './logo.png';

export default {
  title: 'Alita',
  description: '插件化的企业级前端应用框架',
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
        // {
        //   title: 'Tutorials',
        //   children: ['tutorials/getting-started', 'tutorials/blog'],
        // },
        {
          title: 'Introduce',
          children: ['introduce/introduce', 'introduce/upgrade-to-alita-3'],
        },
        {
          title: 'API',
          children: [
            'api/api',
            'api/config',
            'api/runtime-config',
            'api/commands',
          ],
        },
        {
          title: 'Guides',
          children: [
            'guides/prepare',
            'guides/directory-structure',
            'guides/mock',
            'guides/proxy',
            'guides/env-variables',
            'guides/mfsu',
            'guides/boilerplate',
            'guides/generator',
          ],
        },
      ],
    },
    {
      path: '/blog',
      title: 'Blog',
      type: 'nav',
      children: [
        {
          title: 'Blog',
          children: [],
        },
      ],
    },
  ],
};
