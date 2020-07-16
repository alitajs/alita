import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs-extra';
import os from 'os';
import { join } from 'path';
import { events, ConfigParser } from 'cordova-common';

export function getIpAddress() {
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

export function setCordovaConfig(path: string, isProduction: boolean) {
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
      content = content.replace(
        widgeRegex,
        `\t<allow-navigation href="${webUrl}" />\n</widget>`,
      );
    }
  }
  writeFileSync(configPath, content);
}

// android 支持 view port
export function supportViewPortForAndroid(path: string) {
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
  if (
    !/WebView webView = \(WebView\)[\s]?this\.appView\.getView\(\);/.test(
      content,
    )
  ) {
    content = content.replace(
      'loadUrl(launchUrl);',
      'loadUrl(launchUrl);\n\t//下面能让 Android 设备支持 viewport\n\tWebView webView = (WebView) this.appView.getView();\n\twebView.getSettings().setLoadWithOverviewMode(true);\n\twebView.getSettings().setUseWideViewPort(true);',
    );
    writeFileSync(mainActivityPath, content);
  }
  if (!/import android.webkit.*;/.test(content)) {
    content = content.replace(
      'import android.os.Bundle;',
      'import android.os.Bundle;\nimport android.webkit.*;',
    );
    writeFileSync(mainActivityPath, content);
  }
}

// 修复ios外层滚动
export function fixScrollIssueForIOS(path: string) {
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
