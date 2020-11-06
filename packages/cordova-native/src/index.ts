import { IApi } from 'umi';
import { supportedPlugins, NativePlugin } from './plugins';
import childProcess from 'child_process';
import { checkPluginInstalled, checkDependenceInstalled } from './utils';

interface ExportNative {
  exportAll: boolean;
  source: string;
}
export default function (api: IApi) {
  if (!api.userConfig.native) return;

  const exportsNative = [] as ExportNative[];
  for (const plugins of api.userConfig.native) {
    const nativePlugins = supportedPlugins.find(
      (item) => item.name === plugins,
    );
    if (nativePlugins) {
      exportsNative.push({
        exportAll: true,
        source: nativePlugins!.ionic,
      });
    }
  }
  api.addUmiExports(() => exportsNative);

  api.describe({
    key: 'cordovanative',
    config: {
      schema(joi) {
        return joi.array();
      },
    },
  });

  api.registerCommand({
    name: 'cordovanative',
    fn: ({ args }) => {
      const { appType, native } = api.userConfig;
      if (appType !== 'cordova') {
        return;
      }
      const options = { cwd: api.paths.cwd };
      const ionicNativeCore = '@ionic-native/core';
      if (!checkDependenceInstalled(api.paths.cwd || './', ionicNativeCore)) {
        console.log(`${ionicNativeCore} install ...`);
        childProcess.execSync(`yarn add ${ionicNativeCore}`, options);
      }
      const nativePlugins = native || [];
      for (const plugin of nativePlugins) {
        const nativePlugin = supportedPlugins.find(
          (item) => item.name === plugin,
        );
        if (nativePlugin) {
          const installed = checkPluginInstalled(
            api.paths.cwd || './',
            nativePlugin,
          );
          if (!installed) {
            console.log(`${plugin} install ...`);
            childProcess.execSync(
              `cordova plugin add ${nativePlugin.cordova} --save`,
              options,
            );
            childProcess.execSync(`yarn add ${nativePlugin.ionic}`, options);
          }
        }
      }
    },
  });
}
