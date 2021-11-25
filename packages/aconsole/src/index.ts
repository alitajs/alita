import { IApi } from '@umijs/types';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { Mustache } from '@umijs/utils';

export default (api: IApi) => {
  const { userConfig } = api;
  const { aconsole = {} } = userConfig;

  // 配置
  api.describe({
    key: 'aconsole',
    config: {
      schema(joi) {
        return joi.object({
          inspx: joi.object({
            disabled: joi.boolean(),
            production: joi.boolean(),
            margin: joi.boolean(),
            size: joi.boolean(),
            padding: joi.boolean(),
            bottom: joi.string(),
            right: joi.string(),
          }),
          console: joi.object({
            defaultPlugins: joi.array(),
            onReady: joi.function(),
            onClearLog: joi.function(),
            maxLogNumber: joi.number(),
            disableLogScrolling: joi.boolean(),
            theme: joi.string(),
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
          source: 'vconsole',
          specifier: 'VConsole',
        },
      ];
    });
    api.addEntryCode(() => {
      return `const c = new VConsole(${JSON.stringify(aconsole.console)});`;
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
        const inspxTpl = readFileSync(join(__dirname, 'inspx.tpl'), 'utf-8');
        api.writeTmpFile({
          path: 'plugin-inspx/inspx.tsx',
          content: Mustache.render(inspxTpl, {
            inspxpath: dirname(require.resolve('@alita/inspx/package')),
            inspx: {
              ...{
                disabled: false,
                margin: true,
                size: true,
                padding: true,
                bottom: '2.5rem',
                right: '0',
              },
              ...(api.userConfig.inspx || {}),
            },
          }),
        });

        // runtime.tsx
        const runtimeTpl = readFileSync(
          join(__dirname, 'runtime.tpl'),
          'utf-8',
        );
        api.writeTmpFile({
          path: 'plugin-inspx/runtime.tsx',
          content: runtimeTpl,
        });
      },
    });
    api.addRuntimePlugin(() => [
      join(api.paths.absTmpPath!, 'plugin-inspx/runtime.tsx'),
    ]);
  }
};
