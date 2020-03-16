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
fork(umiBinPath, p, {
  stdio: 'inherit',
});
