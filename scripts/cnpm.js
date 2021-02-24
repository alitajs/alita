const { execa, chalk } = require('@umijs/utils');
const { join } = require('path');
const getPackages = require('./utils/getPackages');

const cwd = process.cwd();

function logStep(name) {
  console.log(`${chalk.gray('>> Sync:')} ${chalk.magenta.bold(name)}`);
}

async function release() {
  const pkgs = getPackages();
  logStep(`cnpm sync packages: ${chalk.blue(pkgs.join(', '))}`);
  pkgs
    .forEach((pkg) => {
      const pkgPath = join(cwd, 'packages', pkg);
      const { name } = require(join(pkgPath, 'package.json'));
      logStep(`cnpm sync packages: ${chalk.blue(name)}`);
      const syncRes = execa.sync('cnpm', ['sync', name]);
      console.log(syncRes.stdout);
    });

  logStep('done');
}

release().catch((err) => {
  console.error(err);
  process.exit(1);
});
