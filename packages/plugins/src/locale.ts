import type { AlitaApi } from '@alita/types';
import localePlugin from '@umijs/plugins/dist/locale';

export default (api: AlitaApi) => {
  localePlugin(api);
};
