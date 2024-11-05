import { IApi } from 'umi';
import { dirname, join, resolve } from 'path';
import { fsExtra, glob } from '@umijs/utils';
import { copyFileSync, statSync } from 'fs';

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
      if (api.userConfig.copy) {
        const copy = [
          {
            from: join(
              dirname(require.resolve('pdfjs-dist/package.json')),
              'cmaps',
            ),
            to: 'build/static/cmaps/',
          },
        ];
        const copyDirectory = (opts: any) => {
          const files = glob.sync('**/*', {
            cwd: opts.path,
            dot: true,
          });
          files.forEach((file: any) => {
            const absFile = join(opts.path, file);
            if (statSync(absFile).isDirectory()) return;
            const absTarget = join(opts.target, file);
            fsExtra.mkdirpSync(dirname(absTarget));
            copyFileSync(absFile, absTarget);
          });
        };

        copy.forEach((file) => {
          const sourcePath = resolve(file.from);
          const destinationPath = resolve(
            api.userConfig.outputPath || api.paths.absOutputPath,
            file.to,
          );
          copyDirectory({
            path: sourcePath,
            target: destinationPath,
          });
        });
      }
      memo.copy = [];
      return memo;
    });
  }
};
