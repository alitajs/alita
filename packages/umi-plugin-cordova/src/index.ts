// ref:
// - https://umijs.org/plugin/develop.html
import { events, ConfigParser } from 'cordova-common';
import { join } from 'path';
import os from 'os';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs-extra';
import childProcess from 'child_process';
import create from './create-cordova';

function getIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress = '127.0.0.1';
  // eslint-disable-next-line no-restricted-syntax
  for (const key in networkInterfaces) {
    if (networkInterfaces.hasOwnProperty(key)) {
      const iface = networkInterfaces[key];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.address.startsWith('169.254') &&
          !alias.internal
        ) {
          ipAddress = alias.address;
        }
      }
    }
  }
  return ipAddress;
}

function setCordovaConfig(path, isProduction) {
  const webPort = process.env.PORT || 8000;
  const ip = getIpAddress();
  const webUrl = !isProduction ? `http://${ip}:${webPort}` : 'index.html';
  const configPath = join(path, 'config.xml');
  let content = readFileSync(configPath).toString();
  const contentPattern = '<content (.*)src="[^"]*"(.*)/>';
  const contentRegex = new RegExp(contentPattern);
  content = content.replace(contentRegex, `<content $1src="${webUrl}"$2/>`);
  if (!isProduction) {
    const navPattern = '(<allow-navigation .*)href="[^"]*"(.*/>)';
    const navRegex = new RegExp(navPattern);
    if (navRegex.test(content)) {
      content = content.replace(navRegex, `$1href="${webUrl}"$2`);
    } else {
      const widgePattern = '</widget>';
      const widgeRegex = new RegExp(widgePattern);
      content = content.replace(widgeRegex, `\t<allow-navigation href="${webUrl}" />\n</widget>`);
    }
  }
  writeFileSync(configPath, content);
}

// android 支持 view port
export function supportViewPortForAndroid(path) {
  const configPath = join(path, 'config.xml');
  const config = new ConfigParser(configPath);
  const packageName = config.packageName();
  const paths = packageName.split('.');
  const mainActivityPath = join(
    path,
    'platforms/android/app/src/main/java',
    ...paths,
    'MainActivity.java',
  );
  if (!existsSync(mainActivityPath)) return;
  let content = readFileSync(mainActivityPath).toString();
  if (!/WebView webView = \(WebView\)[\s]?this\.appView\.getView\(\);/.test(content)) {
    content = content.replace(
      'loadUrl(launchUrl);',
      'loadUrl(launchUrl);\n\t//下面能让 Android 设备支持 viewport\n\tWebView webView = (WebView) this.appView.getView();\n\twebView.getSettings().setLoadWithOverviewMode(true);\n\twebView.getSettings().setUseWideViewPort(true);',
    );
    writeFileSync(mainActivityPath, content);
  }
}

// 修复ios外层滚动
function fixScrollIssueForIOS(path) {
  const configPath = join(path, 'config.xml');
  const config = new ConfigParser(configPath);
  const appName = config.name();
  const mainViewControllerPath = join(
    path,
    'platforms/ios/',
    appName,
    'Classes/MainViewController.m',
  );
  if (!existsSync(mainViewControllerPath)) return;
  let content = readFileSync(mainViewControllerPath).toString();
  if (!/self\.webView\.scrollView\.bounces[\s]?=[\s]?NO;/.test(content)) {
    content = content.replace(
      '[super viewDidLoad];',
      '[super viewDidLoad];\n\tself.webView.scrollView.bounces = NO;\n\tself.webView.scrollView.scrollEnabled = NO;',
    );
    writeFileSync(mainViewControllerPath, content);
  }
}

export default function (api) {
  const isProduction = process.env.NODE_ENV === 'production';
  const cordovaPlatform = process.env.CORDOVA || 'ios';
  const isAlita = process.env.IS_ALITA && process.env.IS_ALITA !== 'none';

  api.addHTMLMeta(memo => {
    const addItem = [
      {
        content: 'no',
        name: 'msapplication-tap-highlight',
      },
    ];
    return [...addItem, ...memo];
  });

  api.modifyDefaultConfig(memo => {
    return {
      // build目录默认为www
      ...memo,
      outputPath: 'www',
      base: './',
      publicPath: './',
      history: 'hash',
    };
  });
  // dev
  // 1.cordova create
  api.registerCommand(
    'cordova',
    {
      description: 'cordova init',
    },
    args => {
      const addPlatforms = (isIos: boolean) => {
        childProcess.exec(
          `cordova platforms add ${isIos ? 'ios' : 'android'}`,
          {},
          (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
            } else if (!isIos) {
              supportViewPortForAndroid(api.paths.cwd);
            } else {
              fixScrollIssueForIOS(api.paths.cwd);
            }
            console.log(stdout);
            console.log(stderr);
          },
        );
        console.log(`cordova add ${isIos ? 'ios' : 'android'} platforms ...`);
      };
      if (args.init) {
        // eslint-disable-next-line global-require
        // eslint-disable-next-line import/no-dynamic-require
        const pkg = require(join(api.paths.cwd, 'package.json'));
        const optionalName = pkg.name || 'alitaapp';
        const optionalId = `com.alitaexample.${optionalName}`;
        create(api.paths.cwd, optionalId, optionalName, {}, events);
        if (args.ios || args.android) {
          addPlatforms(args.ios);
        } else {
          console.log(
            `cordova init success,please run "${isAlita ? 'alita' : 'umi'} cordova --ios" or "${
            isAlita ? 'alita' : 'umi'
            } cordova --android"  to add cordova platforms`,
          );
        }
      } else if (args.ios || args.android) {
        addPlatforms(args.ios);
      }
    },
  );

  if (!(process.env.ALITA_NOW_COMMAND === 'dev' || process.env.ALITA_NOW_COMMAND === 'build')) {
    return;
  }
  const configPath = join(api.paths.cwd, 'config.xml');
  const platformsPath = join(api.paths.cwd, 'platforms');
  if (
    existsSync(configPath) &&
    existsSync(platformsPath) &&
    readdirSync(platformsPath).length > 0
  ) {
    console.log(`cordova platform use ${cordovaPlatform}`);
    // 3.node config-xml.js true
    // console.log(api);
    setCordovaConfig(api.paths.cwd, isProduction);

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
    const dirToServe = join(api.paths.cwd, 'platforms', cordovaPlatform, 'platform_www');
    const servePort = 8723;
    const serveProcess = childProcess.exec(
      `serve -l ${servePort}`,
      { stdio: 'inherit', cwd: dirToServe } as any,
      (error, stdout) => {
        console.error(error.message);
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
    api.addRuntimePlugin(join(__dirname, './runtime'));

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
    api.addHTMLScript({
      src: cordovaSrc,
    });

    // 8.umi dev
    // build
    // 1. outputPath:'www',
    // 2. umi build
    api.onBuildSuccess(() => {
      console.log(`[${isAlita ? 'alita' : 'umi'}]: success`);
      console.log(`[${isAlita ? 'alita' : 'umi'}]: run build cordova ...`);
      // 3. node config-xml.js false
      setCordovaConfig(api.paths.cwd, isProduction);
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
