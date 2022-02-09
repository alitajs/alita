import modelPlugin from '@umijs/plugins/dist/antd';
import { logger } from '@umijs/utils';
import { AlitaApi } from 'alita';

export default (api: AlitaApi) => {
  api.onStart(() => {
    logger.info('Using Antd Plugin');
  });
  // @ts-ignore
  modelPlugin(api);
};
