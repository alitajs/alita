import { join } from 'path';
import randomColor from 'random-color';
import uppercamelcase from 'uppercamelcase';
import assert from 'assert';

export default api => {
  const { paths, config, log, winPath } = api;

  return class Generator extends api.Generator {
    constructor(args, options) {
      super(args, options);
      if (args && args[0]) {
        this.appName = args[0];
        this.hasName = true;
      } else {
        const pathsName = winPath(paths.cwd).split('/');
        this.appName = pathsName[pathsName.length - 1];
      }
      assert(
        !/-/.test(this.appName),
        'The filename is not allowed to contain the "-" string. (文件名不允许包含"-",因为会导致cordova项目初始化失败)',
      );
    }
    prompting() {
      const prompts = [
        {
          name: 'isTypeScript',
          type: 'confirm',
          message: '是否使用typescript，默认否?',
          default: false,
        },
        {
          name: 'isHd',
          type: 'confirm',
          message: '是否是h5页面，默认pc?',
          default: false,
        },
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
      const context = {
        name: fileName,
        appType: isHd ? 'h5' : 'pc',
        projectName: this.appName,
        componentName: uppercamelcase(fileName),
        color: randomColor().hexString(),
        isTypeScript: isTypeScript,
        cssExt,
        jsxExt,
      };

      this.fs.copyTpl(
        this.templatePath('src/pages/index/index.tsx'),
        join(
          paths.cwd,
          this.hasName ? this.appName : '',
          `src/pages/${fileName}/index.${jsxExt}`,
        ),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('src/layouts/index.tsx'),
        join(
          paths.cwd,
          this.hasName ? this.appName : '',
          `src/layouts/index.${jsxExt}`,
        ),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('src/layouts/index.less'),
        join(
          paths.cwd,
          this.hasName ? this.appName : '',
          `src/layouts/index.${cssExt}`,
        ),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('src/pages/index/index.less'),
        join(
          paths.cwd,
          this.hasName ? this.appName : '',
          `src/pages/${fileName}/index.${cssExt}`,
        ),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('src/models/app.ts'),
        join(
          paths.cwd,
          this.hasName ? this.appName : '',
          `src/models/${fileName}.${jsExt}`,
        ),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('mock/app.ts'),
        join(paths.cwd, this.hasName ? this.appName : '', `mock/app.${jsExt}`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('src/services/api.ts'),
        join(
          paths.cwd,
          this.hasName ? this.appName : '',
          `src/services/api.${jsExt}`,
        ),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('src/app.ts'),
        join(paths.cwd, this.hasName ? this.appName : '', `src/app.${jsExt}`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('package.json'),
        join(paths.cwd, this.hasName ? this.appName : '', 'package.json'),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('_gitignore'),
        join(paths.cwd, this.hasName ? this.appName : '', '.gitignore'),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('_eslintignore'),
        join(paths.cwd, this.hasName ? this.appName : '', '.eslintignore'),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('_eslintrc.js'),
        join(paths.cwd, this.hasName ? this.appName : '', '.eslintrc.js'),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('_prettierignore'),
        join(paths.cwd, this.hasName ? this.appName : '', '.prettierignore'),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('_prettierrc.js'),
        join(paths.cwd, this.hasName ? this.appName : '', '.prettierrc.js'),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('_stylelintrc.js'),
        join(paths.cwd, this.hasName ? this.appName : '', '.stylelintrc.js'),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('config/config.ts'),
        join(
          paths.cwd,
          this.hasName ? this.appName : '',
          `config/config.${jsExt}`,
        ),
        context,
      );

      if (isTypeScript) {
        this.fs.copyTpl(
          this.templatePath('src/models/connect.d.ts'),
          join(
            paths.cwd,
            this.hasName ? this.appName : '',
            'src/models/connect.d.ts',
          ),
          context,
        );

        this.fs.copyTpl(
          this.templatePath('tsconfig.json'),
          join(paths.cwd, this.hasName ? this.appName : '', 'tsconfig.json'),
          context,
        );
        this.fs.copyTpl(
          this.templatePath('typings.d.ts'),
          join(paths.cwd, this.hasName ? this.appName : '', 'typings.d.ts'),
          context,
        );
      }
    }
  };
};
