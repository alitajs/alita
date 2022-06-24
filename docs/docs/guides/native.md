# 原生应用

## 用例

在 `.umirc.js` 或 `config/config.ts` 中配置;

```js
export default {
  appType: 'native',
};
```

### 初始化 native

通过为 app 提供应用程序名称、应用程序ID和可选构建输出目录，初始化 Capacitor 配置。

请在 `config/config.[t|j]s` 文件中配置 `displayName` 和 `packageId` 。

```ts
export default {
  appType: 'native',
  displayName: 'AlitaDemo', // The application's name
  packageId: 'com.example.appname', // The application's App ID;
};
```

- `appName` (required): 这个应用的名称，安装后显示在桌面图标下方的文字
- `appID` (required): 这个应用的 App ID，ios中这与证书相关; 看起来像 `com.example.appname`

```bash
npx alita native init
```

<strong>选项:</strong>

- `--web-dir <value>`: 用来声明 web 应用的构建目录，默认 `dist`
- `--all`: 添加 ios 和 android 平台代码. 添加常用插件。

### 添加平台 platform

将原生平台项目添加到你的 app 中。

```bash
npx alita native add <platform>
```

<strong>参数:</strong>

- `platform` (required): `android`, `ios`

### 插件

- [官方插件](https://github.com/ionic-team/capacitor-plugins)
- [社区插件](https://github.com/capacitor-community)

```sh
npx alita native plugins
```

此命令将安装常用插件。

### 实时热重载

Within `capacitor.config.json` 内添加 `server` 入口且配置 `url` 到本地服务的地址和端口上，这以你本地服务开启时日志为准:

```js
"server": {
  "url": "http://192.168.1.68:8000",
  "cleartext": true
},
```

### 构建 web

你需要在编译原生应用之前编译 web app，执行 `alita build`，模版项目中可执行：

```bash
yarn build
```

### 拷贝 assets

将 web app 构建产物和 Capacitor 配置文件复制到原生平台项目中。每次更改 web app 或更改 Capacitor 配置值时，请运行此选项。

```bash
npx alita native copy [<platform>]
```

<strong>参数:</strong>

- `platform` (optional): `android`, `ios`

### 更新 native

在 `package.json` 中更新本地使用的插件和依赖。

```bash
npx alita native update [<platform>]
```

<strong>参数:</strong>

- `platform` (optional): `android`, `ios`

<strong>选项:</strong>

- `--deployment`: 不会删除 Podfile.lock 文件，并且 pod install 的时候会使用 `--deployment` 选项。

### 同步项目

这个命令会先执行 `copy` 再执行 `update`，用于同步 web 项目到原生项目中。

```bash
npx alita native sync [options] [<platform>]
```

<strong>参数:</strong>

- `platform` (optional): `android`, `ios`

<strong>选项:</strong>

- `--deployment`: 不会删除 Podfile.lock 文件，并且 pod install 的时候会使用 `--deployment` 选项。


### 运行项目

```bash
npx alita native run [options] <platform>
```

<strong>参数:</strong>

- `platform` (required): `android`, `ios`

<strong>选项:</strong>

- `--list`: 展示出对应平台可用的虚拟机列表
- `--target <id>`: 在指定的虚拟机上运行

## FAQ

### 1、没有 Mac 设备能不能运行 ios 项目？

可以，请自行搜索，Window 系统上如何安装双系统。

### 2、根据文档一直报错，日志中满满的 ruby 日志，这是怎么回事？

上文是建立在你有原生开发环境的基础上的，如果你当前设备没有安装任何的原生开发环境，请先配置你的电脑。
比如 Mac 需要下载 Xcode （并且需要手动打开一次，需要签署一个协议），安装 `cocoapods`。

> 值得注意的是，Mac M1 的话，请不要使用 `gem` 安装 `cocoapods`，如果你已经使用 `sudo gem install cocoapods` 安装过 `cocoapods` ，请使用 `sudo gem uninstall cocoapods` 卸载后，再使用 `brew install cocoapods` 安装。

### 3、我没有原生开发基础，能不能使用？

可以使用，这是面向前端开发人员的技术方案，你只需要查阅相关原生应用如何打包构建即可，网上很多教程，选最新的跟着步骤正确配置你的证书和签名文件。

### 4、原生能力是不是很难，我会用吗？

Alita @3 中使用的原生能力来着很流行的 Ionic 团队开发的 [Capacitor](https://ionicframework.com/docs/native)，它是采用插件的方式扩展原生能力的，并且提供了前端人员熟悉的 node 命令安装方式，你甚至都不需要打开原生开发 IDE 就可以完成原生能力的开发调用，（调用是重点）
