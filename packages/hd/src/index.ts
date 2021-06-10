import { join } from 'path';
import px2vw from 'postcss-px-to-viewport';
import { IApi } from 'umi';
interface Px2vwConfig {
  unitToConvert?: string;
  viewportWidth?: number;
  unitPrecision?: number;
  propList?: string[];
  viewportUnit?: string;
  fontViewportUnit?: string;
  selectorBlackList: any[];
  minPixelValue?: number;
  mediaQuery?: boolean;
  replace?: boolean;
  exclude: any[];
  landscape?: boolean;
  landscapeUnit?: string;
  landscapeWidth?: number;
}
export interface HdOptions {
  theme?: object;
  px2rem?: any;
  px2vw?: Px2vwConfig;
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
          px2vw: joi.object({
            unitToConvert: joi.string(),
            viewportWidth: joi.number(),
            unitPrecision: joi.number(),
            propList: joi.array(),
            viewportUnit: joi.string(),
            fontViewportUnit: joi.string(),
            selectorBlackList: joi.array(),
            minPixelValue: joi.number(),
            mediaQuery: joi.boolean(),
            replace: joi.boolean(),
            exclude: joi.array(),
            landscape: joi.boolean(),
            landscapeUnit: joi.string(),
            landscapeWidth: joi.number(),
          }),
        });
      },
    },
  });

  if (api.userConfig.hd || api.userConfig.appType !== 'pc') {
    api.modifyDefaultConfig((config) => {
      const draftConfig = config;
      const { theme, px2rem, px2vw: configPx2vw } = api.userConfig?.hd || {};
      if (!!px2rem) {
        console.error('@alitajs/hd 修改了适配方案，请将 px2rem 修改为 px2vw.')
      }
      draftConfig.theme = {
        ...(draftConfig.theme || {}),
        '@hd': '2px',
        ...(theme || {}),
      };
      draftConfig.extraPostCSSPlugins = [
        ...(draftConfig.extraPostCSSPlugins || []),
        px2vw({
          viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375
          unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
          selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
          minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          mediaQuery: false, // 允许在媒体查询中转换`px`
          ...(configPx2vw || {}),
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
