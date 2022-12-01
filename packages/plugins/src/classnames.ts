import type { AlitaApi } from '@alita/types';
import { logger } from '@umijs/utils';

import { dirname } from 'path';

export default (api: AlitaApi) => {
  // only dev or build running
  if (!['dev', 'build', 'dev-config'].includes(api.name)) return;

  api.onStart(() => {
    logger.info('Using ClassNames Plugin');
  });

  api.addExtraBabelPlugins(() => {
    return [require.resolve('@alita/babel-transform-jsx-class')];
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
