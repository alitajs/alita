import glob from 'glob';

const getPrettierFiles = (api) => {
  const srcPath = api.paths.absSrcPath;
  const configPath = api.paths.cwd;
  let files = [];
  const jsFiles = glob.sync(`${srcPath}/**/*.js*`, { ignore: ['**/node_modules/**', 'build/**'] });
  const tsFiles = glob.sync(`${srcPath}/**/*.ts*`, { ignore: ['**/node_modules/**', 'build/**'] });
  const configFiles = glob.sync(`${configPath}/**/*.js*`, { ignore: ['**/node_modules/**', 'build/**'] });
  const configFilesTs = glob.sync(`${configPath}/**/*.ts*`, { ignore: ['**/node_modules/**', 'build/**'] });
  const lessFiles = glob.sync(`${srcPath}/**/*.less*`, { ignore: ['**/node_modules/**', 'build/**'] });
  files = files.concat(jsFiles);
  files = files.concat(tsFiles);
  files = files.concat(configFiles);
  files = files.concat(configFilesTs);
  files = files.concat(lessFiles);
  if (!files.length) {
    return;
  }
  return files;
};

export default getPrettierFiles;
