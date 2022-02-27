import { GeneratorType } from '@umijs/core';
import { prompts } from '@umijs/utils';
import { join } from 'path';
import { IApi } from 'umi';

export default (api: IApi) => {
  api.registerGenerator({
    key: 'app',
    name: 'Create app',
    description: 'Create a alita app by app name',
    type: GeneratorType.generate,
    fn: async (options) => {
      const { args, generateFile } = options;
      const [_, _name] = args._;
      let name = _name;

      if (!name) {
        const response = await prompts({
          type: 'text',
          name: 'name',
          message: 'What is the name of app?',
        });
        name = response.name;
      }

      generateFile({
        path: join(
          __dirname,
          '../../../templates/generate/app/template-mobile',
        ),
        target: join(api.paths.cwd, name),
        data: {
          projectName: name,
        },
      });
    },
  });
};
