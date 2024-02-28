import type { AlitaApi } from '@alita/types';
import localePlugin from '@umijs/plugins/dist/locale';
import { logger } from '@umijs/utils';

export default (api: AlitaApi) => {
  api.onStart(() => {
    logger.info('Using Locale Plugin');
  });

  localePlugin(api);
};
