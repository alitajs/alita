import type { AlitaApi } from '@alita/types';
import { Mustache, winPath } from '@umijs/utils';

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { checkAntdMobile, hasAntdMobile5 } from './utils/checkAntdMobile';
import { resolveProjectDep } from './utils/resolveProjectDep';
import { withTmpPath } from './utils/withTmpPath';

const DIR_NAME = 'plugin-mobile-layout';

export default (api: AlitaApi) => {
  api.describe({
    key: 'mobileLayout',
    config: {
      schema(Joi) {
        return Joi.alternatives(Joi.boolean(), Joi.string());
      },
      // The config.default is not allowed when enableBy is EnableBy.config.
      // default: 'mobile5',
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
    enableBy: api.EnableBy.config,
  });
  // 注册runtime配置
  api.addRuntimePluginKey(() => ['mobileLayout']);
  // only dev or build running
  if (!['dev', 'build', 'dev-config', 'preview'].includes(api.name)) return;

  const isMicroApp = api.userConfig.appType === 'micro';

  api.onGenerateFiles(() => {
    const [isAntdMobile5, hasDep] = checkAntdMobile(api);
    const hasMobilev5 = hasAntdMobile5(api);
    const layoutTpl = readFileSync(
      join(
        __dirname,
        '..',
        'templates',
        'mobile-layout',
        (isAntdMobile5 && hasDep) || hasMobilev5 ? 'layout5.tpl' : 'layout.tpl',
      ),
      'utf-8',
    );
    api.writeTmpFile({
      path: join(DIR_NAME, 'AlitaLayout.tsx'),
      noPluginDir: true,
      content: Mustache.render(layoutTpl, {
        // 用户都没安装的时候，用 antd-mobile-alita 做兜底
        mobilelib: winPath(dirname(require.resolve('antd-mobile-alita'))),
        alitarequest: winPath(
          dirname(require.resolve('@alita/request/package')),
        ),
        mobileicons: winPath(
          dirname(require.resolve('antd-mobile-icons/package')),
        ),
        antdMobile: hasMobilev5 ? 'antd-mobile-5' : 'antd-mobile',
        hasKeepAlive: !!api.userConfig.keepalive,
        isMicroApp,
      }),
    });

    const modelTpl = readFileSync(
      join(__dirname, '..', 'templates', 'mobile-layout', 'model.tpl'),
      'utf-8',
    );

    api.writeTmpFile({
      path: join(DIR_NAME, 'layoutState.ts'),
      noPluginDir: true,
      content: Mustache.render(modelTpl, {
        // alitalayout: isAntdMobile5
        //   ? './AlitaLayout'
        //   : winPath(dirname(require.resolve('@alita/alita-layout/package'))),
      }),
    });

    // index.ts for layout
    api.writeTmpFile({
      path: join(DIR_NAME, 'index.ts'),
      noPluginDir: true,
      content: `
      export { getPageNavBar, setPageNavBar, setTabBarList, getTabBarList, layoutEmitter } from './layoutState';
      `,
    });

    // types.ts
    api.writeTmpFile({
      path: join(DIR_NAME, 'types.d.ts'),
      noPluginDir: true,
      tpl: `export type { NavBarProps, TitleListItem, NavBarListItem, TabBarProps, TabBarListItem, } from './AlitaLayout';`,
      context: {},
    });
  });

  api.addLayouts(() => {
    return [
      {
        id: 'alita-layout',
        file: withTmpPath({
          api,
          noPluginDir: true,
          path: join(DIR_NAME, 'AlitaLayout.tsx'),
        }),
      },
    ];
  });

  api.modifyConfig((memo) => {
    const pkgPath =
      resolveProjectDep({
        pkg: api.pkg,
        cwd: api.cwd,
        dep: 'antd-mobile-icons',
      }) || dirname(require.resolve('antd-mobile-icons/package.json'));
    memo.alias['antd-mobile-icons'] = pkgPath;
    return memo;
  });

  // TODO: 从判断 appType: h5 移到这里，如果有其他异常，需要再调整
  api.addHTMLMetas(() => {
    const addItem = {
      content: 'telephone=no',
      name: 'format-detection',
    };
    return [addItem];
  });
  api.addHTMLStyles(() => {
    const addItem = {
      content: `* {
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
      }

      html {
        width: 100%;
        height: 100%;
        text-size-adjust: 100%;
        --alita-safe-area-top: env(safe-area-inset-top);
        --alita-safe-area-bottom: env(safe-area-inset-bottom);
        --alita-safe-area-left: env(safe-area-inset-left);
        --alita-safe-area-right: env(safe-area-inset-right);
        --adm-font-size-main: 0.26rem !important;
      }

      body {
        background-color: #f5f5f9;
        font-size: 0.28rem;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
        margin-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        padding-top: 0;
        padding-bottom: 0;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        text-rendering: optimizeLegibility;
        overflow: hidden;
        touch-action: manipulation;
        -webkit-user-drag: none;
        -ms-content-zooming: none;
        word-wrap: break-word;
        overscroll-behavior-y: none;
        text-size-adjust: none;
      }

      .alita-page {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        position: absolute;
        flex-direction: column;
        justify-content: space-between;
        contain: layout size style;
        overflow: hidden;
        z-index: 0;
      }
      .alita-head{
        height: auto;
  flex-shrink: 0;
  padding-top: var(--alita-safe-area-top);
      }
      .alita-content {
        position: relative;
z-index: 0;
display: block;

flex: 1;

width: 100%;
height: 100%;

/* stylelint-disable */
margin: 0 !important;

padding: 0 !important;
overflow-y: auto;
touch-action: pan-y;

will-change: scroll-position;
/* stylelint-enable */

-webkit-overflow-scrolling: touch;
overscroll-behavior-y: contain;
      }
      .alita-footer{
        flex-shrink: 0;
      }
      input {
        border: none;
        outline: none;
      }
      textarea:disabled,
      input:disabled {
        background-color: transparent;
      }
      `,
    };
    return [addItem];
  });
};
