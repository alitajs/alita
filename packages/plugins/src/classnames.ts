import { logger } from '@umijs/utils';
import { AlitaApi } from 'alita';

export default (api: AlitaApi) => {
  api.onStart(() => {
    logger.info('Using ClassNames Plugin');
  });
  api.addExtraBabelPlugins(() => {
    return [require.resolve('babel-plugin-transform-jsx-class')];
  });
};
