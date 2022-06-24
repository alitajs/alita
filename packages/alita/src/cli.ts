import { logger, yParser } from '@umijs/utils';
import { dev } from 'umi/dist/cli/dev';
import {
  checkLocal,
  checkVersion as checkNodeVersion,
} from 'umi/dist/cli/node';
import { DEV_COMMAND } from 'umi/dist/constants';
import { Service } from 'umi/dist/service/service';

interface IOpts {
  presets?: string[];
}

export async function run(opts: IOpts = {}) {
  checkNodeVersion();
  checkLocal();

  const args = yParser(process.argv.slice(2), {
    alias: {
      version: ['v'],
      help: ['h'],
    },
    boolean: ['version'],
  });
  const command = args._[0];
  if ([DEV_COMMAND, 'setup'].includes(command)) {
    process.env.NODE_ENV = 'development';
  } else if (command === 'build') {
    process.env.NODE_ENV = 'production';
  }
  opts.presets = opts?.presets ?? [require.resolve('./preset')];
  if (opts?.presets) {
    process.env.UMI_PRESETS = opts.presets.join(',');
  }
  if (command === DEV_COMMAND) {
    dev();
  } else if (command === 'version' || command === 'v') {
    const version = require('../package.json').version;
    console.log(`alita@${version}`);
  } else {
    try {
      await new Service().run2({
        name: args._[0],
        args,
      });
    } catch (e: any) {
      logger.error(e);
      process.exit(1);
    }
  }
}
