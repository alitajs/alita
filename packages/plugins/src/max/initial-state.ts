import type { AlitaApi } from '@alita/types';
import statePlugin from '@umijs/plugins/dist/initial-state';
import { logger } from '@umijs/utils';

export default (api: AlitaApi) => {
  if (!['dev', 'build', 'dev-config', 'preview'].includes(api.name)) return;

  api.onStart(() => {
    logger.info('Using Initial State Plugin');
  });
  statePlugin(api);
};
