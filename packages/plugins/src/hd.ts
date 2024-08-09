import type { AlitaApi } from '@alita/types';
import { Mustache } from '@umijs/utils';

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
  if (!['dev', 'build', 'dev-config', 'preview', 'setup'].includes(api.name))
    return;

  api.modifyDefaultConfig((config) => {
    const draftConfig = config;
    const { hd = {}, mako } = api.userConfig || {};

    const { theme, px2rem: configPx2rem } = hd || {};
    draftConfig.theme = {
      ...(draftConfig.theme || {}),
      '@hd': '2px',
      ...(theme || {}),
    };
    if (!mako) {
      draftConfig.extraPostCSSPlugins = [
        ...(draftConfig.extraPostCSSPlugins || []),
        px2rem({
          rootValue: 100,
          minPixelValue: 2,
          selectorDoubleRemList: [/^.adm-/, /^.ant-/, /^\:root/],
          ...(configPx2rem || {}),
        }),
      ];
    } else if (!mako?.px2rem) {
      const px2remConfig = {
        rootValue: 100,
        minPixelValue: 2,
        selectorDoubleRemList: [/^.adm-/, /^.ant-/, /^\:root/],
        ...(configPx2rem || {}),
      };
      draftConfig.mako = mako;
      const hasMagicChars = (pattern: string) => {
        return (
          pattern.includes('*') ||
          pattern.includes('\\') ||
          pattern.includes('(') ||
          pattern.includes(')') ||
          pattern.includes('^') ||
          pattern.includes('$')
        );
      };
      draftConfig.mako.px2rem = {
        ...px2remConfig,
        // 将正则转成字符串
        selectorDoubleList: px2remConfig.selectorDoubleRemList.map(
          (i: string) => {
            if (!`${i}`.includes('/')) return i;
            const reStr = `${i}`.replaceAll('/', '');
            if (hasMagicChars(reStr)) {
              return reStr;
            }
            // FIXME: 更新 mako 的时候，需要修改这里，如果那边有修改配置，则要做出对应变动
            // https://github.com/umijs/mako/blob/246ffd3440ec2705a1277c64fc0f554d68f0fe83/crates/mako/src/visitors/css_px2rem.rs#L152
            return `(${reStr})`;
          },
        ),
      };
      delete draftConfig.mako.px2rem.selectorDoubleRemList;
    }

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
