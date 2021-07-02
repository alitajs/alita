import { IApi } from '@umijs/types';
import { getUmiRedirect } from './getUmiRedirect';
import BabelImportRedirectPlugin from './babel-import-redirect-plugin';

export default function (api: IApi) {

  api.modifyBabelOpts({
    fn: async (opts) => {
      opts.plugins = [
        [
          BabelImportRedirectPlugin,
          {
            // @ts-ignore
            alita: await getUmiRedirect(process.env.ALITA_DIR),
          },
        ],
        ...opts.plugins,
      ];
      return opts;
    },
    stage: Infinity,
  });
}
