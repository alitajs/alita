/**
 * copy to https://github.com/facebook/react/blob/master/scripts/prettier/index.js
 * prettier api doc https://prettier.io/docs/en/api.html
 *----------*****--------------
 *  prettier all js and all ts.
 *----------*****--------------
 */
import prettier from 'prettier';
import fs from 'fs';
import chalk from 'chalk';
import getPrettierFiles from './getPrettierFiles';

const prettierConfigPath = {
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "overrides": [
    {
      "files": ".prettierrc",
      "options": { "parser": "json" }
    }
  ]
}
;

let didError = false;

const files = getPrettierFiles();

files.forEach(file => {
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath,
  });
  const fileInfo = prettier.getFileInfo.sync(file);
  if (fileInfo.ignored) {
    return;
  }
  try {
    const input = fs.readFileSync(file, 'utf8');
    const withParserOptions = {
      ...options,
      parser: fileInfo.inferredParser,
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
