import { IApi } from '@umijs/types';
import { join } from 'path';
import { existsSync } from 'fs';
import chalk from 'chalk';

export default (api: IApi) => {
  api.registerCommand({
    name: 'alitaVersion',
    fn: (args) => {
      const pkg = require(join(process.env.ALITA_DIR || '', 'package.json'));
      [
        `alita@${pkg.version}`,
        `umi@${require('umi/package').version}`,
        `${process.platform} ${process.arch}`,
        `node@${process.version}`,
      ].forEach((version) => {
        console.log(version);
      });
      if (existsSync(join(process.env.UMI_DIR || '', '.local'))) {
        console.log(chalk.cyan('@local'));
      }
    },
  });
};
