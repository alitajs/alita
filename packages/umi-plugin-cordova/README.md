# umi-plugin-cordova

[![NPM version](https://img.shields.io/npm/v/umi-plugin-cordova.svg?style=flat)](https://npmjs.org/package/umi-plugin-cordova)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-cordova.svg?style=flat)](https://npmjs.org/package/umi-plugin-cordova)

umi support cordova

## Usage

## 安装环境（Mac）

1.安装XCode
2.安装xcode-select

```bash
$ xcode-select --install
```

弹出软件一直下一步就好。
3.安装ios-deploy

```basic
$ sudo yarn global add ios-deploy
```

4.全局安装Cordova

```bash
$ sudo yarn global add cordova
```
## 接入cordova

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    ['umi-plugin-cordova', options],
  ],
}
```

```sh
$ umi cordova --init --ios
```
如果一直在这里没有动静，可以`ctrl+c`关闭进程，手动执行`cordova platforms add ios`
```sh
$ umi dev
```

使用xcode打开项目 `./platforms/ios/Tutorial.xcworkspace`

选择虚拟机，执行。或者编译到手机上，都支持热更新调试。

## Options

TODO

## LICENSE

MIT
