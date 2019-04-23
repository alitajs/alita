// ref:
// - https://umijs.org/plugin/develop.html
import prettier from 'prettier';
import fs from 'fs';
import chalk from 'chalk';
import getPrettierFiles from './getPrettierFiles';

const prettierConfig = require.resolve('../.prettierrc');
export default function (api, options) {

  api.registerCommand(
    'prettier',
    {
      description: 'prettier src all files',
      usage: `umi prettier`,
    },
    args => {
      let didError = false;

      const files = getPrettierFiles(api);

      files.forEach(file => {
        const options = prettier.resolveConfig.sync(file, {
          config: prettierConfig,
        });
        const fileInfo = prettier.getFileInfo.sync(file);
        if (fileInfo.ignored) {
          return;
        }
        try {
          const input = fs.readFileSync(file, 'utf8');
          const withParserOptions = {
            ...options,
          };
          const output = prettier.format(input, withParserOptions);
          if (output !== input) {
            fs.writeFileSync(file, output, 'utf8');
            console.log(chalk.green(`${file} is prettier`));
          }
        } catch (e) {
          didError = true;
        }
      });

      if (didError) {
        process.exit(1);
      }
      console.log(chalk.hex('#1890FF')('prettier success!'));
    })
}
