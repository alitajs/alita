import { utils } from 'umi';
import { copyFileSync, writeFileSync, unlinkSync, readdirSync, rmdirSync, statSync, readFileSync, createWriteStream } from 'fs';
import { join, dirname } from 'path';

const { glob, chalk, mkdirp } = utils;

const replaceKeyName = (str: string, displayName: string, isIos: boolean) => {
  if (isIos) {
    return str.replace(/miniapp/g, displayName);
  }
  return str.replace(/miniapp/g, displayName);
}

const copyTpl = (opts: { templatePath: string; target: string; packageId: string; displayName: string; isIos: boolean; }) => {
  const tpl = readFileSync(opts.templatePath, 'utf-8');
  mkdirp.sync(dirname(opts.target));
  console.log(`${chalk.green('Write:')} ${opts.target}`);
  writeFileSync(opts.target, replaceKeyName(tpl, opts.displayName, opts.isIos).replace(/com.alitajs.micro/g, opts.packageId), 'utf-8');
}

const copyDirectory = (opts: { path: string; target: string; packageId: string; displayName: string; isIos: boolean; }) => {
  const files = glob.sync('**/*', {
    cwd: opts.path,
    dot: true,
    ignore: ['**/node_modules/**'],
  });
  console.log(opts.path)
  files.forEach((file) => {
    const absFile = join(opts.path, file);
    if (statSync(absFile).isDirectory()) return;
    const absTarget = join(opts.target, replaceKeyName(file, opts.displayName, opts.isIos));
    mkdirp.sync(dirname(absTarget));
    copyTpl({ templatePath: absFile, target: absTarget, packageId: opts.packageId, displayName: opts.displayName, isIos: opts.isIos });
  });
}

export { copyTpl, copyDirectory }
