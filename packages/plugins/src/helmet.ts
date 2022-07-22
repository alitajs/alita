import type { AlitaApi } from '@alita/types';
import { logger, Mustache, winPath } from '@umijs/utils';

import { dirname } from 'path';
import { withTmpPath } from './utils/withTmpPath';

export default (api: AlitaApi) => {
  // only dev or build running
  if (!['dev', 'build'].includes(api.name)) return;

  api.onStart(() => {
    logger.info('Using Dva Plugin');
  });
  const helmetPkgPath = winPath(
    dirname(require.resolve('react-helmet-async/package')),
  );

  api.modifyConfig((memo) => {
    // import from react-helmet-async
    memo.alias['react-helmet$'] = helmetPkgPath;
    memo.alias['react-helmet-async$'] = helmetPkgPath;
    return memo;
  });

  api.onGenerateFiles(async () => {
    api.writeTmpFile({
      path: 'index.ts',
      content: Mustache.render(
        `export { Helmet, HelmetProvider, HelmetData } from '{{{ HelmetPkg }}}';`,
        {
          HelmetPkg: helmetPkgPath,
        },
      ),
    });

    // runtime.tsx
    api.writeTmpFile({
      path: 'runtime.tsx',
      content: `
import React from 'react';
import { HelmetProvider } from '${helmetPkgPath}';

export function rootContainer(container, opts) {
  return React.createElement(HelmetProvider, opts, container);
}
      `,
    });
  });

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.tsx' })];
  });
};
