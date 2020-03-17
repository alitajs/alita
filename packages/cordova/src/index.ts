// ref:
// - https://umijs.org/plugin/develop.html
import { events } from 'cordova-common';
import { join } from 'path';
import { existsSync, readdirSync } from 'fs-extra';
import childProcess from 'child_process';
import { IApi } from '@umijs/types';
import create from './create-cordova';
import { getIpAddress, setCordovaConfig, supportViewPortForAndroid, fixScrollIssueForIOS } from './utils';

export default function (api: IApi) {
  if (!api.userConfig.cordova) {
    api.userConfig.cordova = {}
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const cordovaPlatform = process.env.CORDOVA || 'ios';
  const isAlita = process.env.IS_ALITA && process.env.IS_ALITA !== 'none';
  const packageId = isAlita ? api.userConfig.packageId : api.userConfig.cordova.packageId;
  const displayName = isAlita ? api.userConfig.displayName : api.userConfig.cordova.displayName;

  api.describe({
    key: 'cordova',
    config: {
      schema(joi) {
        return joi.object({
          packageId: joi.string(),
          displayName: joi.string(),
        });
      },
    },
  });
  // dev
  // 1.cordova create
  api.registerCommand(
    {
      name: 'cordova',
      fn: ({ args }) => {
        if (api.userConfig.appType !== 'cordova') {
          console.error('cordova 命令，appType 必须为 cordova，请修改配置 appType');
          return;
        }

        if (!packageId) {
          console.error('config/config.ts 中 packageId 是必填项，请增加配置 packageId');
          return;
        }

        if (/-/.test(packageId)) {
          console.error('config/config.ts 中 packageId 不允许包含"-",因为会导致cordova项目初始化失败');
          return;
        }

        if (!displayName) {
          console.error('config/config.ts 中 displayName 是必填项，请增加配置 displayName');
          return;
        }
        const addPlatforms = (isIos: boolean) => {
          childProcess.exec(
            `cordova platforms add ${isIos ? 'ios' : 'android'}`,
            (error, stdout, stderr) => {
              if (error) {
                console.error(`exec error: ${error}`);
              } else {
                if (!isIos) {
                  supportViewPortForAndroid(api.paths.cwd!);
                } else {
                  fixScrollIssueForIOS(api.paths.cwd!);
                }
              }
              console.log(stdout);
              console.log(stderr);
            },
          );
          console.log(`cordova add ${isIos ? 'ios' : 'android'} platforms ...`);
        };
        if (args.init) {
          create(api.paths.cwd, packageId, displayName, {}, events);
          if (args.ios || args.android) {
            addPlatforms(!!args.ios);
          } else {
            console.log(
              `cordova init success,please run "${isAlita ? 'alita' : 'umi'} cordova --ios" or "${
              isAlita ? 'alita' : 'umi'
              } cordova --android"  to add cordova platforms`,
            );
          }
        } else if (args.ios || args.android) {
          addPlatforms(!!args.ios);
        }
      }
    });

  api.modifyDefaultConfig(memo => {
    return {
      // build目录默认为www
      ...memo,
      outputPath: 'www',
      base: './',
      publicPath: './',
      history: 'hash',
      metas: [
        {
          content: 'no',
          name: 'msapplication-tap-highlight',
        }
      ],
    };
  });

  if (!(process.env.ALITA_NOW_COMMAND === 'dev' || process.env.ALITA_NOW_COMMAND === 'build')) {
    return;
  }
  const configPath = join(api.paths.cwd || '', 'config.xml');
  const platformsPath = join(api.paths.cwd || '', 'platforms');
  if (
    existsSync(configPath) &&
    existsSync(platformsPath) &&
    readdirSync(platformsPath).length > 0
  ) {
    console.log(`cordova platform use ${cordovaPlatform}`);
    // 3.node config-xml.js true
    // console.log(api);
    setCordovaConfig(api.paths.cwd!, isProduction);

    // 4.cordova build ios
    // api.devServerPort 需要提交PR来支持
    childProcess.exec(`cordova build ${cordovaPlatform}`, {}, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
      }
      console.log(stdout);
      console.log(stderr);
    });

    // 5.node serve-cordova.js ios
    const dirToServe = join(api.paths.cwd || '', 'platforms', cordovaPlatform, 'platform_www');
    const servePort = 8723;
    const serveProcess = childProcess.exec(
      `serve -l ${servePort}`,
      { stdio: 'inherit', cwd: dirToServe } as any,
      (error, stdout) => {
        console.error(error!.message);
        console.log(stdout.toString('utf8'));
      },
    );
    console.log(`cordova serve(pid:${serveProcess.pid})`);

    // 6.add app.js
    //  export function render(oldRender) {
    //    function onDeviceReady() {
    //      oldRender();
    //    }
    //    document.addEventListener('deviceready', onDeviceReady, false);
    //  }
    api.addRuntimePlugin(() => join(__dirname, './runtime'));

    // 7.add cordova.js
    //  <% if(context.env === 'production') { %>
    //    <script src="./cordova.js"></script>
    //  <% } else {%>
    //    <script src="http://192.168.3.111:8001/cordova.js"></script>
    //  <% } %>
    const ip = getIpAddress();
    let cordovaSrc = './cordova.js';
    if (!isProduction) {
      cordovaSrc = `http://${ip}:${servePort}/cordova.js`;
    }
    api.addHTMLScripts(() => {
      return [{
        src: cordovaSrc,
      }];
    });

    // 8.umi dev
    // build
    // 1. outputPath:'www',
    // 2. umi build
    api.onBuildComplete(() => {
      console.log(`[${isAlita ? 'alita' : 'umi'}]: success`);
      console.log(`[${isAlita ? 'alita' : 'umi'}]: run build cordova ...`);
      // 3. node config-xml.js false
      setCordovaConfig(api.paths.cwd!, isProduction);
      // 4. cordova build ios
      childProcess.exec(`cordova build ${cordovaPlatform}`, {}, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
        }
        console.log(stdout);
        console.log(stderr);
        process.exit();
      });
    });
  } else {
    console.log(
      `please run "${
      isAlita ? 'alita' : 'umi'
      } cordova --init --ios" to init cordova and add cordova platform`,
    );
  }
}
