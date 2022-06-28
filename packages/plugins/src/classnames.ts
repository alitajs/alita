import type { AlitaApi } from '@alita/types';
import { logger } from '@umijs/utils';

import { dirname } from 'path';

export default (api: AlitaApi) => {
  api.onStart(() => {
    logger.info('Using ClassNames Plugin');
  });

  api.addExtraBabelPlugins(() => {
    return [require.resolve('babel-plugin-transform-jsx-class')];
  });
  api.modifyConfig((memo) => {
    memo.alias['babel-runtime-jsx-plus'] = dirname(
      require.resolve('babel-runtime-jsx-plus/package.json'),
    );
    memo.alias['classnames'] = dirname(
      require.resolve('classnames/package.json'),
    );
    return memo;
  });
};
