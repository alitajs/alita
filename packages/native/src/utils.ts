import { join } from 'path';
import fs from 'fs';
import { NativePlugin } from './plugins';

export function checkPluginInstalled(rootPath: string, plugin: NativePlugin) {
  const pluginsFetchPath = join(rootPath, 'plugins/fetch.json');
  if (!fs.existsSync(pluginsFetchPath)) return false;
  const plugins = require(pluginsFetchPath);
  return plugin.cordova in plugins;
}

export function checkDependenceInstalled(rootPath: string, dependence: string) {
  const packagePath = join(rootPath, 'package.json');
  const pkg = require(packagePath);
  const installedDependencies = pkg.dependencies || {};
  return dependence in installedDependencies;
}
