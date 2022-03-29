import { GeneratorType } from '@umijs/core';
import { lodash, prompts, randomColor } from '@umijs/utils';
import { join } from 'path';
import { IApi } from 'umi';

export default (api: IApi) => {
  api.registerGenerator({
    key: 'pages',
    name: 'Create page',
    description: 'Create a alita page by page name',
    type: GeneratorType.generate,
    fn: async (options) => {
      const { args, generateFile } = options;
      const [_, _name] = args._;
      let name = _name;

      if (!name) {
        const response = await prompts({
          type: 'text',
          name: 'name',
          message: 'What is the name of page?',
        });
        name = response.name;
      }

      generateFile({
        path: join(__dirname, '../../../templates/generate/page'),
        target: join(api.paths.absPagesPath, name),
        data: {
          color: randomColor(),
          name: lodash.upperFirst(name),
        },
      });
    },
  });
};
