import { logger } from '@umijs/utils';
import execa from 'execa';
import { existsSync } from 'fs';
import getGitRepoInfo from 'git-repo-info';
import { join } from 'path';
import rimraf from 'rimraf';
import 'zx/globals';
import { PATHS } from './.internal/constants';
import { assert, eachPkg, getPkgs } from './.internal/utils';

const cwd = process.cwd();

(async () => {
  const { branch } = getGitRepoInfo();
  logger.info(`branch: ${branch}`);
  const pkgs = getPkgs();
  logger.info(`pkgs: ${pkgs.join(', ')}`);

  // check git status
  logger.event('check git status');
  const isGitClean = (await $`git status --porcelain`).stdout.trim().length;
  assert(!isGitClean, 'git status is not clean');

  // check git remote update
  logger.event('check git remote update');
  await $`git fetch`;
  const gitStatus = (await $`git status --short --branch`).stdout.trim();
  assert(!gitStatus.includes('behind'), `git status is behind remote`);

  // check npm registry
  logger.event('check npm registry');
  const registry = (await $`npm config get registry`).stdout.trim();
  assert(
    registry === 'https://registry.npmjs.org/',
    'npm registry is not https://registry.npmjs.org/',
  );

  // check npm ownership
  // 公司网路太差了，多执行一个命令就多很长时间
  // logger.event('check npm ownership');
  // const whoami = (await $`npm whoami`).stdout.trim();
  // await Promise.all(
  //   ['alita'].map(async (pkg) => {
  //     const owners = (await $`npm owner ls ${pkg}`).stdout
  //       .trim()
  //       .split('\n')
  //       .map((line) => {
  //         return line.split(' ')[0];
  //       });
  //     assert(owners.includes(whoami), `${pkg} is not owned by ${whoami}`);
  //   }),
  // );

  // clean
  logger.event('clean');
  eachPkg(pkgs, ({ dir, name }) => {
    logger.info(`clean dist of ${name}`);
    rimraf.sync(join(dir, 'dist'));
  });

  // build packages
  logger.event('build packages');
  await $`npm run build:release`;
  await $`npm run build:extra`;
  await $`npm run build:client`;

  logger.event('check client code change');
  const isGitCleanAfterClientBuild = (
    await $`git status --porcelain`
  ).stdout.trim().length;
  assert(!isGitCleanAfterClientBuild, 'client code is updated');

  const version = require('../packages/alita/package.json').version;
  let tag = 'latest';
  if (
    version.includes('-alpha.') ||
    version.includes('-beta.') ||
    version.includes('-rc.')
  ) {
    tag = 'next';
  }
  if (version.includes('-canary.')) tag = 'canary';

  // update example versions
  logger.event('update example versions');
  const examplesDir = PATHS.EXAMPLES;
  const examples = fs.readdirSync(examplesDir).filter((dir) => {
    return (
      !dir.startsWith('.') && existsSync(join(examplesDir, dir, 'package.json'))
    );
  });
  examples.forEach((example) => {
    const pkg = require(join(examplesDir, example, 'package.json'));
    pkg.scripts ||= {};
    pkg.scripts['start'] = 'npm run dev';
    delete pkg.version;
    fs.writeFileSync(
      join(examplesDir, example, 'package.json'),
      `${JSON.stringify(pkg, null, 2)}\n`,
    );
  });

  // update pnpm lockfile
  logger.event('update pnpm lockfile');
  $.verbose = false;
  await $`pnpm i`;
  $.verbose = true;

  const isGitClean2 = (await $`git status --porcelain`).stdout.trim().length;

  if (isGitClean2) {
    // commit
    logger.event('commit');

    await $`git commit --all --message "release: ${version}"`;
  }

  try {
    // git tag
    if (tag !== 'canary') {
      logger.event('git tag');
      await $`git tag v${version}`;
    }

    // git push
    logger.event('git push');
    await $`git push origin ${branch} --tags`;
  } catch (error) {
    logger.event('skip git push');
  }

  // npm publish
  logger.event('pnpm publish');
  $.verbose = false;
  const innerPkgs = pkgs.filter((pkg) => !['alita'].includes(pkg));

  // check 2fa config
  let otpArg: string[] = [];
  if (
    (await $`npm profile get "two-factor auth"`).toString().includes('writes')
  ) {
    let code = '';
    do {
      // get otp from user
      code = await question('This operation requires a one-time password: ');
      // generate arg for zx command
      // why use array? https://github.com/google/zx/blob/main/docs/quotes.md
      otpArg = ['--otp', code];
    } while (code.length !== 6);
  }

  await Promise.all(
    innerPkgs.map(async (pkg) => {
      const pkgPath = join(cwd, 'packages', pkg);
      const { name, version } = require(join(pkgPath, 'package.json'));

      // npm view xxxx version
      const { stdout } = execa.sync('npm', ['view', name, 'version'], {
        cwd: pkgPath,
      });
      if (stdout === version) {
        console.log(`Skip Publish package ${name}`);
      } else {
        await $`cd packages/${pkg} && npm publish --tag ${tag} ${otpArg}`;
        logger.info(`+ @alita/${pkg} ${version}`);
      }
    }),
  );
  await $`cd packages/alita && npm publish --tag ${tag} ${otpArg}`;
  logger.info(`+ alita ${version}`);

  $.verbose = true;

  // sync tnpm
  // logger.event('sync tnpm');
  // $.verbose = false;
  // await Promise.all(
  //   pkgs.map(async (pkg) => {
  //     const { name } = require(path.join(PATHS.PACKAGES, pkg, 'package.json'));
  //     logger.info(`sync ${name}`);
  //     await $`tnpm sync ${name}`;
  //   }),
  // );
  // $.verbose = true;
})();
