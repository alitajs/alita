
import { join, basename } from 'path';
import randomColor from 'random-color';
import assert from 'assert';
import chalk from 'chalk';
import uppercamelcase from 'uppercamelcase';

export default api => {
  const { paths, config, log } = api;
  return class Generator extends api.Generator {
    constructor(args, options) {
      super(args, options);

      assert(
        typeof this.args[0] === 'string',
        `
${chalk.underline.cyan('name')} should be supplied

Example:

  umi g pages users
        `.trim(),
      );
      if (config.routes) {
        log.warn(
          `You should config the routes in config.routes manunally since ${chalk.red(
            'config.routes',
          )} exists`,
        );
        console.log();
      }
    }
    prompting() {
      const prompts = [
        {
          name: 'isTypeScript',
          type: 'confirm',
          message: 'Do you want to use typescript?',
          default: false,
        }
      ];
      return this.prompt(prompts).then(props => {
        this.prompts = props;
      });
    }

    writing() {
      const path = this.args[0].toString();
      const { isTypeScript } = this.prompts;
      const jsxExt = isTypeScript ? 'tsx' : 'js';
      const jsExt = isTypeScript ? 'ts' : 'js';
      const cssExt = 'less';
      const fileName = basename(path);
      const context = {
        name: fileName,
        componentName: uppercamelcase(fileName),
        color: randomColor().hexString(),
        isTypeScript: isTypeScript,
        cssExt,
        jsxExt,
      };

      this.fs.copyTpl(
        this.templatePath('src/pages/index/index.tsx'),
        join(paths.cwd, `src/pages/${fileName}/index.${jsxExt}`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('src/pages/index/index.less'),
        join(paths.cwd, `src/pages/${fileName}/index.${cssExt}`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('src/models/app.ts'),
        join(paths.cwd, `src/models/${fileName}.${jsExt}`),
        context,
      );

    }
  };
};
