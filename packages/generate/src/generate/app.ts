import { join } from 'path';
import { IApi } from '@umijs/types';
import assert from 'assert';
import { Generator, yargs } from '@umijs/utils';

interface IOpts {
  cwd: string;
  args: yargs.Arguments;
}

export default function ({ api }: { api: IApi }) {
  return class PageGenerator extends Generator {
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
    }
    appName: any;
    async writing() {
      let dirPath = '../../templates/app/templates';
      if (this.args.pc) {
        dirPath = '../../templates/app/templates-pc';
      }
      if (this.args.tabs) {
        dirPath = '../../templates/app/templates-tabs';
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
  };
}
