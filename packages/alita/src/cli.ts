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

  // 关闭 umi 你知道吗 功能
  // TODO: [你知道吗] 这个功能很好，但是有些提示在做配置内收的 alita 里面提示出来，感觉怪怪的。比如推荐 @umijs/max。所以先关掉，想想该怎么处理
  process.env.DID_YOU_KNOW = 'none';

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
