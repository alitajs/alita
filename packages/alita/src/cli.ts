process.env.ESLINT = 'true';
process.env.UMI_PLUGINS = require.resolve('./plugins/index');
// process.env.DEBUG = 'umi*,af-webpack*';

const umiBinPath = require.resolve('umi/bin/umi');
require('child_process').fork(umiBinPath, process.argv.slice(2), {
  stdio: 'inherit',
});
