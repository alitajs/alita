import { join } from 'path';
import assert from 'assert';

export default api => {
  const { paths } = api;

  return class Generator extends api.Generator {
    constructor(args, options) {
      super(args, options);
      if (args && args[0]) {
        this.appName = args[0];
      }
      assert(
        this.appName,
        'Please provide the blocks name. "alita g blocks [blockName]" (必须提供区块名称)',
      );
    }

    writing() {
      const context = {
        projectName: this.appName,
      };

      this.fs.copyTpl(
        this.templatePath('src'),
        join(paths.cwd, this.appName, `src`),
        context,
      );

      this.fs.copyTpl(
        this.templatePath('package.json'),
        join(paths.cwd, this.appName, 'package.json'),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('_gitignore'),
        join(paths.cwd, this.appName, '.gitignore'),
        context,
      );
    }
  };
};
