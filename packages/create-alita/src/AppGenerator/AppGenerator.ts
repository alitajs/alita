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
    } else {
      const pathsName = winPath(this.cwd).split('/');
      this.appName = pathsName[pathsName.length - 1];
    }
    assert(
      !/-/.test(this.appName),
      'The filename is not allowed to contain the "-" string. (文件名不允许包含"-",因为会导致cordova项目初始化失败)',
    );
  }
  appName: any;
  async writing() {
    this.copyDirectory({
      context: {
        appType: 'h5',
        projectName: this.appName,
        isTypeScript: true,
      },
      path: join(__dirname, '../../generate/generators/app/templates'),
      target: this.cwd,
    });
  }
}
