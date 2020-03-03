import { Generator, winPath, yargs } from '@umijs/utils';
import assert from 'assert';
import { join } from 'path';

interface IOpts {
  cwd: string;
  args: yargs.Arguments;
}

export default class AppGenerator extends Generator {
  constructor({ cwd, args }: IOpts) {
    super({ cwd, args });
    if (args._ && args._[0]) {
      this.appName = args._[0] || '';
    }
    assert(
      this.appName,
      '文件名必须提供，你可以使用 yarn create alita appName',
    );
    // else {
    //   const pathsName = winPath(this.cwd).split('/');
    //   this.appName = pathsName[pathsName.length - 1];
    // }
    assert(
      !/-/.test(this.appName),
      'The filename is not allowed to contain the "-" string. (文件名不允许包含"-",因为会导致cordova项目初始化失败)',
    );
  }
  appName: any;
  async writing() {
    let dirPath = '../../generate/generators/app/templates';
    if (this.args.pc) {
      dirPath = '../../generate/generators/app/templates-pc';
    }
    this.copyDirectory({
      context: {
        appType: 'h5',
        projectName: this.appName,
        isTypeScript: true,
      },
      path: join(__dirname, dirPath),
      target: join(this.cwd, this.appName),
    });
  }
}
