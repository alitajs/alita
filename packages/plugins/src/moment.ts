import type { AlitaApi } from '@alita/types';
import momentPlugin from '@umijs/plugins/dist/moment2dayjs';

export default (api: AlitaApi) => {
  // only build running
  if (!['build'].includes(api.name)) return;
  // @ts-ignore
  momentPlugin(api);
};
