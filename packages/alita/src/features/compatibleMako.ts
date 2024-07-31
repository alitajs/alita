import { IApi } from 'umi';
import { dirname } from 'path';

export default (api: IApi) => {
  // 强制关闭
  if (api.userConfig.mako !== false) {
    api.modifyConfig((memo) => {
      // 可能通过内置默认开启
      if (api.config.mako) {
        // https://github.com/umijs/mako/issues/979
        const version = require(`${dirname(
          require.resolve('pdfjs-dist/package.json'),
        )}/package.json`).version;
        if (version === '2.1.266') {
          memo.alias['pdfjs-dist'] = dirname(
            require.resolve('@lingxiteam/pdfjs-dist/package.json'),
          );
        }
      }
      return memo;
    });
  }
};
