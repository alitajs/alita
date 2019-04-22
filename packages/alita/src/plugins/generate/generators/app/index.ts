
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

  umi g dvapage users
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

    writing() {
      const path = this.args[0].toString();
      console.log(this.args)
      const jsxExt = this.isTypeScript ? 'tsx' : 'js';
      const cssExt = 'less';
      const fileName = basename(path);
      const context = {
        name: fileName,
        componentName: uppercamelcase(fileName),
        color: randomColor().hexString(),
        isTypeScript: this.isTypeScript,
        cssExt,
        jsxExt,
      };
      this.fs.copyTpl(
        this.templatePath('src/pages/index/index.js'),
        join(paths.absPagesPath, `${fileName}/index.${jsxExt}`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('src/pages/index/index.less'),
        join(paths.absPagesPath, `${fileName}/index.${cssExt}`),
        context,
      );
    }
  };
};
