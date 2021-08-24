import { join } from 'path';
import px2rem, { IOpts } from '@alitajs/postcss-plugin-px2rem';
import { IApi } from 'umi';

export interface HdOptions {
  theme?: object;
  px2rem?: IOpts;
}

export default (api: IApi) => {
  const {
    utils: { getFile },
  } = api;

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
  });

  if (api.userConfig.hd || api.userConfig.appType !== 'pc') {
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
          selectorDoubleRemList: [/.ant-/],
          ...(configPx2rem || {}),
        }),
      ];
      return draftConfig;
    });

    api.addEntryImports(() => {
      // src/hd.(tsx|ts|jsx|js)
      const hdFile = getFile({
        base: api.paths.absSrcPath || '',
        type: 'javascript',
        fileNameWithoutExt: 'hd',
      });
      return {
        source: hdFile
          ? require.resolve(hdFile.path)
          : require.resolve(join(__dirname, 'template.js')),
      };
    });
  }
};
