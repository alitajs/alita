import { join, basename } from 'path';
import { IApi } from '@umijs/types';
import assert from 'assert';
import chalk from 'chalk';
import { Generator, randomColor, lodash } from '@umijs/utils';

export default function ({ api }: { api: IApi }) {
  const { userConfig } = api;
  return class PageGenerator extends Generator {
    constructor(opts: any) {
      super(opts);
      assert(
        typeof this.args._[0] === 'string',
        `
${chalk.underline.cyan('name')} should be supplied

Example:

  alita g pages users
        `.trim(),
      );
      if (userConfig.routes) {
        console.warn(
          `You should config the routes in config.routes manunally since ${chalk.red(
            'config.routes',
          )} exists`,
        );
        console.log();
      }
    }
    // prompting() {
    //   if (config.useModel) {
    //     console.warn('useModel,auto create useModel demo');
    //     console.log();
    //   }
    //   const prompts = [
    //     {
    //       name: 'autoCreateModel',
    //       type: 'confirm',
    //       message:
    //         'Do you want to create dva model? 需要创建对应的dva model吗？',
    //       default: true,
    //     },
    //   ];
    //   return this.prompt(prompts).then(props => {
    //     this.prompts = props;
    //   });
    // }
    async writing() {
      const [path] = this.args._;
      // const jsExt = this.args.typescript ? '.tsx' : '.js';
      // const cssExt = this.args.less ? '.less' : '.css';
      // const path = this.args[0].toString();
      const isTypeScript = true;
      const jsxExt = isTypeScript ? 'tsx' : 'js';
      const jsExt = isTypeScript ? 'ts' : 'js';
      const cssExt = 'less';
      const fileName = basename(path);
      const componentName = lodash.upperFirst(fileName);
      const context = {
        name: fileName,
        componentName,
        color: randomColor(),
        isTypeScript,
        cssExt,
        jsxExt,
      };

      this.copyTpl({
        templatePath: join(__dirname, 'index.tsx.tpl'),
        target: join(api.paths.absPagesPath!, `${fileName}/index.${jsxExt}`),
        context,
      });
      this.copyTpl({
        templatePath: join(__dirname, 'index.less.tpl'),
        target: join(api.paths.absPagesPath!, `${fileName}/index.${cssExt}`),
        context,
      });
      this.copyTpl({
        templatePath: join(__dirname, 'model.ts.tpl'),
        target: join(api.paths.absSrcPath!, 'models', `${fileName}.${jsExt}`),
        context,
      });
    }
  };
}
