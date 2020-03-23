import { IApi, utils } from 'umi';
import { join } from 'path';
import getLayoutContent from './utils/getLayoutContent';
import getTabsLayout from './utils/getTabsLayout';

const DIR_NAME = 'tabs-layout';
const MODEL_NAME = 'Tabs';
const RELATIVE_MODEL = join(DIR_NAME, MODEL_NAME);

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
      default: [/./],
      schema(joi) {
        return joi.array();
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
  });

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(DIR_NAME, 'TabsLayout.tsx'),
      content: getTabsLayout(api.paths.absTmpPath || ''),
    });
    api.writeTmpFile({
      path: join(DIR_NAME, 'Tabs.tsx'),
      content: getLayoutContent(api.userConfig.tabsLayout, './TabsLayout'),
    });
  });

  api.addUmiExports(() => [
    {
      exportAll: true,
      source: `../${RELATIVE_MODEL}`,
    },
  ]);
};
