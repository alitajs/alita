let umi = require('umi');
try {
  const umiExports = require('@@/core/umiExports');
  umi = Object.assign(umi, umiExports);
  console.log('********************************')
  console.log(umi)
} catch (e) {}
module.exports = umi;
