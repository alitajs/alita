import { IApi, utils } from 'umi';
import { join } from 'path';
import getLayoutContent from './utils/getLayoutContent';
import getModelContent from './utils/getModelContent';

const DIR_NAME = 'keep-alive';
const MODEL_NAME = 'KeepAlive';
const RELATIVE_MODEL = join(DIR_NAME, MODEL_NAME);
const RELATIVE_MODEL_PATH = `${RELATIVE_MODEL}.ts`;


// keepalive:['route path','route path']
// import { dropByCacheKey } from 'umi';
// dropByCacheKey('/list');
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

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(DIR_NAME, 'KeepAliveLayout.tsx'),
      content: getModelContent(api.paths.absTmpPath || ''),
    });
    api.writeTmpFile({
      path: join(DIR_NAME, 'KeepAlive.tsx'),
      content: getLayoutContent(api.userConfig.keepalive,'./KeepAliveLayout'),
    });

  });

  api.addUmiExports(() => [
    {
      exportAll: true,
      source: `../${RELATIVE_MODEL}`,
    },
  ]);
};
