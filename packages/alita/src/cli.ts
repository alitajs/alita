import { dev } from 'umi/dist/cli/dev';
import { Service } from 'umi/dist/service/service';
import {
  catchUnhandledRejection,
  checkLocal,
  logger,
  printHelp,
  setNoDeprecation,
  setNodeTitle,
  yParser,
} from '@umijs/utils';
import { DEV_COMMAND, FRAMEWORK_NAME, MIN_NODE_VERSION } from './constants';

interface IOpts {
  presets?: string[];
  defaultConfigFiles?: string[];
}
catchUnhandledRejection();

const ver = parseInt(process.version.slice(1));

export function checkNodeVersion(minVersion: number, message?: string) {
  if (ver < minVersion) {
    logger.error(
      message ||
        `Your node version ${ver} is not supported, please upgrade to ${minVersion} or above except 15 or 17.`,
    );
    process.exit(1);
  }
}
export async function run(opts: IOpts = {}) {
  checkNodeVersion(MIN_NODE_VERSION);
  checkLocal();
  setNodeTitle(FRAMEWORK_NAME);
  setNoDeprecation();

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
  opts.presets = opts?.presets
    ? opts?.presets.concat([require.resolve('./preset')])
    : [require.resolve('./preset')];

  if (opts?.presets) {
    process.env.UMI_PRESETS = opts.presets.join(',');
  }
  if (!opts.defaultConfigFiles && command === DEV_COMMAND) {
    dev();
  } else if (command === 'version' || command === 'v') {
    const version = require('../package.json').version;
    console.log(`alita@${version}`);
  } else {
    try {
      await new Service({
        defaultConfigFiles: opts.defaultConfigFiles || null,
      }).run2({
        name: args._[0],
        args,
      });
    } catch (e: any) {
      logger.error(e);
      printHelp.exit();
      process.exit(1);
    }
  }
}
