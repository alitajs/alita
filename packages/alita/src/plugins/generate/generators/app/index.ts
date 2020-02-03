
import randomColor from 'random-color';
import uppercamelcase from 'uppercamelcase';
import assert from 'assert';
import glob from 'glob';
import { statSync } from 'fs';

export default api => {
  const { paths, log, winPath } = api;

  return class Generator extends api.Generator {
    constructor(args, options) {
      super(args, options);
      if (args && args[0]) {
        this.appName = args[0];
        this.hasName = true;
      } else {
        const pathsName = winPath(paths.cwd).split('/');
        this.appName = pathsName[pathsName.length - 1]
      }
      assert(!/-/.test(this.appName), 'The filename is not allowed to contain the "-" string. (文件名不允许包含"-",因为会导致cordova项目初始化失败)')
    }

    writing() {
      const isTypeScript = true;
      const jsxExt = isTypeScript ? 'tsx' : 'js';
      const jsExt = isTypeScript ? 'ts' : 'js';
      const cssExt = 'less';
      const fileName = 'index';
      const context = {
        name: fileName,
        appType: 'h5',
        projectName: this.appName,
        componentName: uppercamelcase(fileName),
        color: randomColor().hexString(),
        isTypeScript,
        cssExt,
        jsxExt,
        jsExt
      };
      glob
        .sync('**/*', {
          cwd: this.templatePath(),
          dot: true,
        })
        .forEach(file => {
          log.success(`copy src ${file}`);
          const filePath = this.templatePath(file);
          if (statSync(filePath).isFile()) {
            this.fs.copyTpl(
              this.templatePath(filePath),
              this.destinationPath(file.replace(/^_/, '.')),
              context,
            );
          }
        });
    }
  };
};
