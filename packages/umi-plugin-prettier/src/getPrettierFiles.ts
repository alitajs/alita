import glob from 'glob';

const getPrettierFiles = () => {
  let files = [];
  const jsFiles = glob.sync('src/**/*.js*', { ignore: ['**/node_modules/**', 'build/**'] });
  const tsFiles = glob.sync('src/**/*.ts*', { ignore: ['**/node_modules/**', 'build/**'] });
  const configFiles = glob.sync('config/**/*.js*', { ignore: ['**/node_modules/**', 'build/**'] });
  const configFilesTs = glob.sync('config/**/*.ts*', { ignore: ['**/node_modules/**', 'build/**'] });
  const lessFiles = glob.sync('src/**/*.less*', { ignore: ['**/node_modules/**', 'build/**'] });
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
