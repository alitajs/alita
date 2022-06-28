import type { AlitaApi } from '@alita/types';
import { logger, Mustache, winPath } from '@umijs/utils';

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { withTmpPath } from './utils/withTmpPath';

export default (api: AlitaApi) => {
  api.onStart(() => {
    logger.info('Using AConsole Plugin');
  });
  const { userConfig } = api;
  const { aconsole = {} } = userConfig;

  // 配置
  api.describe({
    key: 'aconsole',
    config: {
      schema(Joi) {
        return Joi.object({
          inspx: Joi.object({
            disabled: Joi.boolean(),
            production: Joi.boolean(),
            margin: Joi.boolean(),
            size: Joi.boolean(),
            padding: Joi.boolean(),
            bottom: Joi.string(),
            right: Joi.string(),
          }),
          console: Joi.object({
            defaultPlugins: Joi.array(),
            onReady: Joi.function(),
            onClearLog: Joi.function(),
            maxLogNumber: Joi.number(),
            disableLogScrolling: Joi.boolean(),
            theme: Joi.string(),
          }),
        });
      },
    },
    enableBy: api.EnableBy.config,
  });

  if (aconsole?.console) {
    api.addHTMLHeadScripts(() => {
      return [
        {
          src: 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js',
        },
      ];
    });
    api.addHTMLStyles(() => {
      return [
        {
          content: `.vc-switch { right: 0px; bottom: calc(env(safe-area-inset-bottom) + 1.2rem) !important; }`,
        },
      ];
    });
    api.addEntryCode(() => {
      return [
        `const c = new window.VConsole(${JSON.stringify(aconsole.console)});`,
      ];
    });
  }

  // 开发环境或者强制指定 production 添加，才使用 inspx 功能
  if (
    (process.env.NODE_ENV === 'development' && aconsole?.inspx) ||
    (aconsole?.inspx && aconsole?.inspx?.production)
  ) {
    // 生成临时文件
    api.onGenerateFiles({
      fn() {
        // inspx.ts
        const inspxTpl = readFileSync(
          join(__dirname, '..', 'templates', 'aconsole', 'inspx.tpl'),
          'utf-8',
        );
        api.writeTmpFile({
          path: 'inspx.tsx',
          content: Mustache.render(inspxTpl, {
            // inspxpath: join(__dirname,'..','compiled','@alita','inspx'),
            inspxpath: winPath(
              dirname(require.resolve('@alita/inspx/package')),
            ),
            inspx: {
              ...{
                disabled: false,
                margin: true,
                size: true,
                padding: true,
                bottom: 'calc(env(safe-area-inset-bottom) + 2.2rem)',
                right: '0',
              },
              ...(api.userConfig.inspx || {}),
            },
          }),
        });

        // runtime.tsx
        const runtimeTpl = readFileSync(
          join(__dirname, '..', 'templates', 'aconsole', 'runtime.tpl'),
          'utf-8',
        );
        api.writeTmpFile({
          path: 'runtime.tsx',
          content: runtimeTpl,
        });
      },
    });
    api.addRuntimePlugin(() => [
      withTmpPath({
        api,
        path: 'runtime.tsx',
      }),
    ]);
  }
};
