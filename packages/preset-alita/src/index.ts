import { logger } from '@umijs/utils';
import type { AlitaApi } from 'alita';

export default (api: AlitaApi) => {
  api.onStart(() => {
    logger.event('alita presets dev');
  });
  return {
    plugins: [require.resolve('./commands/generate/page')],
  };
};
