import { join, basename } from 'path';
import assert from 'assert';
import chalk from 'chalk';
import { IApi } from '@umijs/types';
import { Generator, lodash } from '@umijs/utils';

export default function ({ api }: { api: IApi }) {
  return class ModelGenerator extends Generator {
    constructor(opts: any) {
      super(opts);
      assert(
        typeof this.args._[0] === 'string',
        `
${chalk.underline.cyan('name')} should be supplied

Example:

  alita g model users
        `.trim(),
      );
    }

    async writing() {
      const [path] = this.args._;
      const isTypeScript = true;

      const jsExt = isTypeScript ? 'ts' : 'js';
      const fileName = basename(path);
      const componentName = lodash.upperFirst(fileName);
      const context = {
        name: fileName,
        componentName,
      };

      this.copyTpl({
        templatePath: join(__dirname, 'model.ts.tpl'),
        target: join(api.paths.absSrcPath!, 'models', `${fileName}.${jsExt}`),
        context,
      });
    }
  };
}
