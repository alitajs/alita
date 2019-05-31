// ref:
// - https://umijs.org/plugin/develop.html
import create from './create-cordova';
import { events, ConfigParser } from 'cordova-common';
import { join } from 'path';
import assert from 'assert';
import os from 'os';
import { lstatSync, readFileSync, writeFileSync, existsSync, readdirSync } from 'fs-extra';
import childProcess from 'child_process';

function getIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress = '127.0.0.1';
  for (const key in networkInterfaces) {
    if (networkInterfaces.hasOwnProperty(key)) {
      const iface = networkInterfaces[key];
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.address.startsWith('169.254') && !alias.internal) {
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
  var configPath = join(path, 'config.xml');
  let content = readFileSync(configPath).toString();
  const contentPattern = `<content (.*)src="[^"]*"(.*)/>`;
  const contentRegex = new RegExp(contentPattern);
  content = content.replace(contentRegex, `<content $1src="${webUrl}"$2/>`);
  if (!isProduction) {
    const navPattern = `(<allow-navigation .*)href="[^"]*"(.*/>)`;
    const navRegex = new RegExp(navPattern);
    if (navRegex.test(content)) {
      content = content.replace(navRegex, `$1href="${webUrl}"$2`);
    } else {
      const widgePattern = `</widget>`;
      const widgeRegex = new RegExp(widgePattern);
      content = content.replace(widgeRegex, `\t<allow-navigation href="${webUrl}" />\n</widget>`);
    }
  }
  writeFileSync(configPath, content);
}

export default function (api, options) {
  const isProduction = process.env.NODE_ENV === 'production';
  const cordovaPlatform = process.env.CORDOVA || 'ios';
  const isAlita = process.env.IS_ALITA && process.env.IS_ALITA !== 'none';

  api.addHTMLMeta(memo => {
    const addItem = [{
      "content": "no",
      "name": "msapplication-tap-highlight"
    }]
    return [...addItem, ...memo];
  })

  api.modifyDefaultConfig(memo => {
    return {
      // build目录默认为www
      ...memo,
      outputPath: 'www',
      base: './',
      publicPath: './',
      history: 'hash',
    }
  });
  // dev
  // 1.cordova create
  api.registerCommand(
    'cordova',
    {
      description: 'cordova init',
    },
    args => {
      const addPlatforms = (isIos) => {
        childProcess.exec(`cordova platforms add ${isIos ? 'ios' : 'android'}`, {}, (error, stdout, stderr) => {
          if (error) {
            console.error('exec error: ' + error);
            return
          }
          console.log(stdout)
          console.log(stderr)
        })
        console.log(`cordova add ${isIos ? 'ios' : 'android'} platforms ...`);
      }
      if (args.init) {
        const pkg = require(join(api.paths.cwd, 'package.json'));
        const optionalName = pkg.name || 'alitaapp';
        const optionalId = `com.alitaexample.${optionalName}`;
        create(api.paths.cwd, optionalId, optionalName, {}, events);
        if (args.ios || args.android) {
          addPlatforms(args.ios);
        } else {
          console.log(`cordova init success,please run "${isAlita ? 'alita' : 'umi'} cordova --ios" or "${isAlita ? 'alita' : 'umi'} cordova --android"  to add cordova platforms`);
        }
      } else if (args.ios || args.android) {
        addPlatforms(args.ios);
      }
    },
  );
  if (!(process.env.ALITA_NOW_COMMAND === 'dev' || process.env.ALITA_NOW_COMMAND === 'build')) {
    return;
  }
  var configPath = join(api.paths.cwd, 'config.xml');
  var platformsPath = join(api.paths.cwd, 'platforms');
  if (existsSync(configPath) && existsSync(platformsPath) && readdirSync(platformsPath).length > 0) {
    console.log(`cordova platform use ${cordovaPlatform}`);
    // 3.node config-xml.js true
    // console.log(api);
    setCordovaConfig(api.paths.cwd, isProduction);

    // 4.cordova build ios
    // api.devServerPort 需要提交PR来支持
    childProcess.exec(`cordova build ${cordovaPlatform}`, {}, (error, stdout, stderr) => {
      if (error) {
        console.error('exec error: ' + error);
      }
      // console.log(stdout)
      // console.log(stderr)
    })

    // 5.node serve-cordova.js ios
    // api.afterDevServer(({ serve, devServerPort }) => {
    // You can get the actual port number of the service monitor here.
    // console.log(devServerPort); https://github.com/umijs/umi/pull/2386
    const dirToServe = join(api.paths.cwd, 'platforms', cordovaPlatform, 'platform_www');
    const servePort = 8723;
    const serveProcess = childProcess.exec(
      `serve -l ${servePort}`,
      { stdio: 'inherit', cwd: dirToServe } as any,
      (error, stdout, stderr) => {
        console.error(error.message);
        console.log(stdout.toString('utf8'));
      }
    );
    console.log(`cordova serve(pid:${serveProcess.pid})`);
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
    // });

    // 6.add app.js
    //  export function render(oldRender) {
    //    function onDeviceReady() {
    //      oldRender();
    //    }
    //    document.addEventListener('deviceready', onDeviceReady, false);
    //  }
    api.addRuntimePlugin(join(__dirname, './runtime'));
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
          console.error('exec error: ' + error);
        }
        console.log(stdout);
        console.log(stderr);
        process.exit();
      })
    });
  } else {
    console.log(`please run "${isAlita ? 'alita' : 'umi'} cordova --init --ios" to init cordova and add cordova platform`);
  }
}
