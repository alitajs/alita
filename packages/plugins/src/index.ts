import { logger } from '@umijs/utils';
import type { AlitaApi } from 'alita';

export default (api: AlitaApi) => {
  api.onStart(() => {
    logger.event('alita plugins dev presets');
  });
  return {
    plugins: [
      require.resolve('./aconsole'),
      require.resolve('./antdmobile'),
      require.resolve('./hd'),
      require.resolve('./keepalive'),
      require.resolve('./mainpath'),
      require.resolve('./request'),
    ],
  };
};
