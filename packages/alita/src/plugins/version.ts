// copy from umi
import { join } from 'path';
import { existsSync } from 'fs';
import chalk from 'chalk';

export default api => {
  api.registerCommand(
    'alitaVersion',
    {
      description: 'show related versions',
    },
    args => {
      const pkg = require(join(process.env.ALITA_DIR, 'package.json'));
      if (args.verbose) {
        const versions = api.applyPlugins('addVersionInfo', {
          initialValue: [
            `alita@${pkg.version}`,
            `umi@${require('umi/package').version}`,
            `${process.platform} ${process.arch}`,
            `node@${process.version}`,
            `umi-build-dev@${require('umi-build-dev/package').version}`,
            `af-webpack@${require('af-webpack/package').version}`,
            `babel-preset-umi@${require('babel-preset-umi/package').version}`,
            `umi-test@${require('umi-test/package').version}`,
          ],
        });
        versions.forEach(version => {
          console.log(version);
        });
      } else {
        console.log(`alita@${pkg.version}`);
        console.log(`umi@${require('umi/package').version}`);
      }
      if (existsSync(join(process.env.UMI_DIR, '.local'))) {
        console.log(chalk.cyan('@local'));
      }
    },
  );
};
