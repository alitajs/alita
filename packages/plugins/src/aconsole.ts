import { logger, Mustache, winPath } from '@umijs/utils';
import { AlitaApi } from 'alita';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';

const DIR_NAME = 'plugin-inspx';

export default (api: AlitaApi) => {
  logger.info('Using AConsole Plugin');

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
  });

  if (aconsole?.console) {
    api.addHTMLStyles(() => {
      return [
        {
          content: `.vc-switch { right: 0px; bottom: 1.2rem !important; }`,
        },
      ];
    });
    api.addEntryImports(() => {
      return [
        {
          source: join(__dirname, '..', 'compiled', 'vconsole'),
          specifier: 'VConsole',
        },
      ];
    });
    api.addEntryCode(() => {
      return [`const c = new VConsole(${JSON.stringify(aconsole.console)});`];
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
          path: `${DIR_NAME}/inspx.tsx`,
          noPluginDir: true,
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
                bottom: '3.5rem',
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
          path: `${DIR_NAME}/runtime.tsx`,
          noPluginDir: true,
          content: runtimeTpl,
        });
      },
    });
    api.addRuntimePlugin(() => [
      join(api.paths.absTmpPath!, `${DIR_NAME}/runtime.tsx`),
    ]);
  }
};
