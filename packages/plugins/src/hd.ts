import type { AlitaApi } from '@alita/types';
import { logger, Mustache } from '@umijs/utils';

import { readFileSync } from 'fs';
import { join } from 'path';
// @ts-ignore
import px2rem from '../compiled/@alitajs/postcss-plugin-px2rem';
import getFile from './utils/getFile/getFile';

const DIR_NAME = 'plugin-hd';

export default (api: AlitaApi) => {
  const enableBy = (opts: any) => {
    return opts.config.appType !== 'pc' || opts.config.hd;
  };
  api.describe({
    key: 'hd',
    config: {
      schema(joi) {
        return joi.object({
          theme: joi.object(),
          px2rem: joi.object(),
        });
      },
    },
    enableBy,
  });
  // only dev or build running
  if (!['dev', 'build', 'dev-config', 'preview'].includes(api.name)) return;

  api.onStart(() => {
    logger.info('Using HD Plugin');
  });
  api.modifyDefaultConfig((config) => {
    const draftConfig = config;
    const { theme, px2rem: configPx2rem } = api.userConfig?.hd || {};
    draftConfig.theme = {
      ...(draftConfig.theme || {}),
      '@hd': '2px',
      ...(theme || {}),
    };
    draftConfig.extraPostCSSPlugins = [
      ...(draftConfig.extraPostCSSPlugins || []),
      px2rem({
        rootValue: 100,
        minPixelValue: 2,
        selectorDoubleRemList: [/^.adm-/, /^.ant-/, /^\:root/],
        ...(configPx2rem || {}),
      }),
    ];
    return draftConfig;
  });

  // 生成临时文件
  api.onGenerateFiles({
    fn() {
      const hdTpl = readFileSync(
        join(__dirname, '..', 'templates', 'hd', 'hd.tpl'),
        'utf-8',
      );
      api.writeTmpFile({
        path: `${DIR_NAME}/hd.tsx`,
        noPluginDir: true,
        content: Mustache.render(hdTpl, {}),
      });
    },
  });

  api.addEntryImports(() => {
    // src/hd.(tsx|ts|jsx|js)
    const hdFile = getFile({
      base: api.paths.absSrcPath || '',
      type: 'javascript',
      fileNameWithoutExt: 'hd',
    });

    return [
      {
        source: hdFile
          ? require.resolve(hdFile.path)
          : join(api.paths.absTmpPath, DIR_NAME, 'hd.tsx'),
      },
    ];
  });
};
