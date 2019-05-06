
import { join } from 'path';
import randomColor from 'random-color';
import uppercamelcase from 'uppercamelcase';

export default api => {
  const { paths, config, log } = api;
  return class Generator extends api.Generator {
    constructor(args, options) {
      super(args, options);
    }
    prompting() {
      const prompts = [
        {
          name: 'isTypeScript',
          type: 'confirm',
          message: '是否使用typescript，默认否?',
          default: false,
        }, {
          name: 'isHd',
          type: 'confirm',
          message: '是否是h5页面，默认pc?',
          default: false,
        }
      ];
      return this.prompt(prompts).then(props => {
        this.prompts = props;
      });
    }

    writing() {
      const { isTypeScript, isHd } = this.prompts;
      const jsxExt = isTypeScript ? 'tsx' : 'js';
      const jsExt = isTypeScript ? 'ts' : 'js';
      const cssExt = 'less';
      const fileName = 'index';
      const pathsName = api.winPath(paths.cwd).split('/');
      const context = {
        name: fileName,
        projectName: pathsName[pathsName.length - 1],
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
      this.fs.copyTpl(
        this.templatePath('mock/app.ts'),
        join(paths.cwd, `mock/app.${jsExt}`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('src/services/api.ts'),
        join(paths.cwd, `src/services/api.${jsExt}`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('src/app.ts'),
        join(paths.cwd, `src/app.${jsExt}`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('package.json'),
        join(paths.cwd, 'package.json'),
        context,
      );

      if (isTypeScript) {
        this.fs.copyTpl(
          this.templatePath('src/models/connect.d.ts'),
          join(paths.cwd, 'src/models/connect.d.ts'),
          context,
        );

        this.fs.copyTpl(
          this.templatePath('tsconfig.json'),
          join(paths.cwd, 'tsconfig.json'),
          context,
        );
        this.fs.copyTpl(
          this.templatePath('typings.d.ts'),
          join(paths.cwd, 'typings.d.ts'),
          context,
        );
      }
      if (isHd) {
        this.fs.copyTpl(
          this.templatePath('config/config.ts'),
          join(paths.cwd, `config/config.${jsExt}`),
          context,
        );
      }
    }
  };
};
