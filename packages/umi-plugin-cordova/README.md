# umi-plugin-cordova

[![NPM version](https://img.shields.io/npm/v/umi-plugin-cordova.svg?style=flat)](https://npmjs.org/package/umi-plugin-cordova)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-cordova.svg?style=flat)](https://npmjs.org/package/umi-plugin-cordova)

umi support cordova

## Usage

## 安装环境（Mac）
1.安装XCode

2.安装xcode-select
```sh
$ xcode-select --install
```
弹出软件一直下一步就好。

3.安装ios-deploy
```sh
$ sudo yarn global add ios-deploy
```
4.全局安装Cordova
```sh
$ sudo yarn global add cordova
```

## 接入cordova

### umi项目
Configure in `.umirc.js`,

```sh
$ yarn add umi-plugin-cordova
```

```js
export default {
  plugins: [
    ['umi-plugin-cordova', options],
  ],
}
```
### alita项目
Configure in `config/config.js`,

```js
export default {
  appType: 'cordova',
}
```


## 添加cordova初始化命令
如果你全局安装了 `umi` ，可以使用`umi cordova --init --ios`

如果你没有全局安装 `umi` ，可以在 `package.json` 里面添加 `scripts`

```json
{
  "scripts": {
    "cordova-init":"umi cordova --init",
    "cordova-add-ios":"umi cordova --ios",
    "cordova-add-android":"umi cordova --android",
    "start":"umi dev",
    "start-cordova-android":"CORDOVA=android umi dev",
    "build-cordova-android":"CORDOVA=android umi build",
    "build":"umi build",
  },
}
```

| 参数 | 说明 |
|  :-  | :-:  |
| --init | 初始化Cordova项目，添加配置文件和相关文件夹 |
| --ios | 执行cordova platforms add ios |
| --android | 执行cordova platforms add android |

### 环境变量 CORDOVA
默认使用的平台是ios，如果开发安卓，需要设置环境变量

如果`umi cordova --init --ios` 一直没有动静，可以`ctrl+c`关闭进程，手动执行`cordova platforms add ios`

## 启动项目
开发环境执行 `umi dev`
dev 环境有热更新，如果使用手机查看，要求需要在统一个网络环境下。

编译执行`umi build`

使用**xcode**打开项目 `./platforms/ios/Tutorial.xcworkspace`
选择虚拟机，执行。

虚拟机中查看效果
![](./umi-cordova.png)

## LICENSE

MIT
