//TODO: 从 umi-next 复制过来，因为修复的bug umi-next 为发包
// import modelPlugin from '@umijs/plugins/dist/antd';
// import { logger } from '@umijs/utils';
// import type { AlitaApi } from '@alita/types';

// export default (api: AlitaApi) => {
//   api.onStart(() => {
//     logger.info('Using Antd Plugin');
//   });
//   // @ts-ignore
//   modelPlugin(api);
// };

import type { AlitaApi } from '@alita/types';
import { logger, Mustache } from '@umijs/utils';

import { dirname } from 'path';
import { resolveProjectDep } from './utils/resolveProjectDep';
import { withTmpPath } from './utils/withTmpPath';

export default (api: AlitaApi) => {
  api.onStart(() => {
    logger.info('Using Antd Plugin');
  });
  const pkgPath =
    resolveProjectDep({
      pkg: api.pkg,
      cwd: api.cwd,
      dep: 'antd',
    }) || dirname(require.resolve('antd/package.json'));

  api.describe({
    config: {
      schema(Joi) {
        return Joi.object({
          configProvider: Joi.object(),
          // themes
          dark: Joi.boolean(),
          compact: Joi.boolean(),
          // babel-plugin-import
          import: Joi.boolean(),
          // less or css, default less
          style: Joi.string().allow('less', 'css'),
        });
      },
    },
    enableBy: api.EnableBy.config,
  });

  // only dev or build running
  if (!['dev', 'build', 'dev-config'].includes(api.name)) return;

  api.modifyAppData((memo) => {
    const version = require(`${pkgPath}/package.json`).version;
    memo.antd = {
      pkgPath,
      version,
    };
    return memo;
  });

  api.modifyConfig((memo) => {
    // antd import
    memo.alias.antd = pkgPath;

    // moment > dayjs
    if (memo.antd.dayjs) {
      memo.alias.moment = dirname(require.resolve('dayjs/package.json'));
    }

    // dark mode & compact mode
    if (memo.antd.dark || memo.antd.compact) {
      const { getThemeVariables } = require('antd/dist/theme');
      memo.theme = {
        ...getThemeVariables(memo.antd),
        ...memo.theme,
      };
    }

    return memo;
  });

  // babel-plugin-import
  api.addExtraBabelPlugins(() => {
    const style = api.config.antd.style || 'less';
    return api.config.antd.import && !api.appData.vite
      ? [
          [
            require.resolve('babel-plugin-import'),
            {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: style === 'less' ? true : 'css',
            },
          ],
        ]
      : [];
  });

  // antd config provider
  api.onGenerateFiles(() => {
    if (!api.config.antd.configProvider) return;
    api.writeTmpFile({
      path: `runtime.tsx`,
      content: Mustache.render(
        `
import { ConfigProvider, Modal, message, notification } from 'antd';

export function rootContainer(container) {
  const finalConfig = {...{{{ config }}}}
  if (finalConfig.prefixCls) {
    Modal.config({
      rootPrefixCls: finalConfig.prefixCls
    });
    message.config({
      prefixCls: \`\${finalConfig.prefixCls}-message\`
    });
    notification.config({
      prefixCls: \`\${finalConfig.prefixCls}-notification\`
    });
  }
  return <ConfigProvider {...finalConfig}>{container}</ConfigProvider>;
}
      `.trim(),
        {
          config: JSON.stringify(api.config.antd.configProvider),
        },
      ),
    });
  });
  api.addRuntimePlugin(() => {
    return api.config.antd.configProvider
      ? [withTmpPath({ api, path: 'runtime.tsx' })]
      : [];
  });

  // import antd style if antd.import is not configured
  api.addEntryImportsAhead(() => {
    const style = api.config.antd.style || 'less';
    return api.config.antd.import && !api.appData.vite
      ? []
      : [
          {
            source:
              style === 'less' ? 'antd/dist/antd.less' : 'antd/dist/antd.css',
          },
        ];
  });
};
