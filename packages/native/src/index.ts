import { IApi } from 'umi';
import { supportedPlugins, NativePlugin } from './plugins';
import childProcess from 'child_process';
import { checkPluginInstalled, checkDependenceInstalled } from './utils';

export default function(api: IApi) {
  api.describe({
    key: 'native',
    config: {
      schema(joi) {
        return joi.array();
      },
    },
  });

  api.registerCommand({
    name: 'native',
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
          item => item.name === plugin,
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
