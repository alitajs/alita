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
  if (!api.userConfig.keepalive) return;

  api.describe({
    key: 'keepalive',
    config: {
      default: {},
      schema(joi) {
        return joi.array();
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
  });
  const configStringify = (config: (string | RegExp)[]) => {
    return config.map(item => {
      if (item instanceof RegExp) {
        return item;
      }
      return `'${item}'`
    })

  }
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(DIR_NAME, 'KeepAliveLayout.tsx'),
      content: getKeepAliveLayout(api.paths.absTmpPath || ''),
    });
    api.writeTmpFile({
      path: join(DIR_NAME, 'KeepAlive.tsx'),
      content: getLayoutContent(configStringify(api.userConfig.keepalive as KeepAliveType), './KeepAliveLayout'),
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
