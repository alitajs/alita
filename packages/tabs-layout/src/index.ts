import { IApi, utils } from 'umi';
import { join } from 'path';
import getLayoutContent from './utils/getLayoutContent';
import getKeepAliveLayout from './utils/getKeepAliveLayout';
import getModelContent from './utils/getModelContent';

const DIR_NAME = 'keep-alive';
const MODEL_NAME = 'KeepAlive';
const RELATIVE_MODEL = join(DIR_NAME, MODEL_NAME);

// keepalive:['route path','route path']
// import { dropByCacheKey } from 'umi';
// dropByCacheKey('/list');
type KeepAliveType = (string | RegExp)[]

export default (api: IApi) => {
  if (api.userConfig.keepalive) {
    console.error('请不要和 keep alive 插件一起使用，两个功能相同')
    return;
  };
  if (!api.userConfig.tabsLayout) {
    return;
  };
  api.describe({
    key: 'tabsLayout',
    config: {
      default: {},
      schema(joi) {
        return joi.boolean();
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
  });

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(DIR_NAME, 'KeepAliveLayout.tsx'),
      content: getKeepAliveLayout(api.paths.absTmpPath || ''),
    });
    api.writeTmpFile({
      path: join(DIR_NAME, 'KeepAlive.tsx'),
      content: getLayoutContent([/./], './KeepAliveLayout'),
    });
    api.writeTmpFile({
      path: join(DIR_NAME, 'KeepAliveModel.tsx'),
      content: getModelContent(),
    });
  });

  api.addUmiExports(() => [
    {
      exportAll: true,
      source: `../${RELATIVE_MODEL}`,
    },
    {
      exportAll: true,
      source: `../${join(DIR_NAME, 'KeepAliveModel')}`,
    },
  ]);
};
