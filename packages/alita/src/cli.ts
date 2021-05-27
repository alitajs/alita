import { dirname } from 'path';
import { fork } from 'child_process';

// process.env.UMI_UI = 'none';
process.env.IS_ALITA = 'true';
process.env.UMI_PRESETS = require.resolve('@alitajs/umi-presets-alita');

const p = process.argv.slice(2);

// 这里做了拦截，因为version命令冲突了
if (p[0] === 'version' || p[0] === '-v' || p[0] === '-version') {
  p[0] = 'alitaVersion';
}


process.env.ALITA_NOW_COMMAND = p[0];

process.env.ALITA_DIR = dirname(require.resolve('../package'));

const umiBinPath = require.resolve('umi/bin/umi');
const child = fork(umiBinPath, p, {
  stdio: 'inherit',
});

// ref:
// http://nodejs.cn/api/process/signal_events.html
// https://lisk.io/blog/development/why-we-stopped-using-npm-start-child-processes
process.on('SIGINT', () => {
  child.kill('SIGINT');
  // ref:
  // https://github.com/umijs/umi/issues/6009
  process.exit(0);
});
process.on('SIGTERM', () => {
  child.kill('SIGTERM');
  process.exit(1);
});
