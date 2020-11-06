# @alitajs/native

## 配置

```js
import { defineConfig } from 'alita';

export default defineConfig({
  appType: "native",
  mobileLayout: true,
  packageId: 'com.alitajs.micro', // 更改为真实的包名
  displayName: 'micro', // 更改为真实的项目名称
});
```

> displayName，建议用英文，中文名称可在项目配置中修改，此处会被用做文件名。

## 添加平台

```bash
alita platforms --ios
或
alita platforms --android
```

## 开发调试

使用环境变量 NATIVE 来区分构建平台,不指定默认为 ios 平台。

```bash
cross-env NATIVE=android alita dev
```

TODO

## 编译 build

使用环境变量 NATIVE 来区分构建平台,不指定默认为 ios 平台。

```bash
cross-env NATIVE=android alita build
```

## 和 h5 项目的差异化表现

### 内置的 alita sdk

默认内置了 alita sdk 可以直接调用原生能力，如果需要用到的原生能力未提供，可以通过自定义插件的方式扩展，或者给我们提新的需求。

能力清单在微应用文档-[原生能力](https://micro.alitajs.com/sdk/native)

### 编译产物目录

默认的 outputPath，ios 平台是会被编译到 `platforms/ios/www` 目录，而 android 平台则会被编译到 `platforms/android/www`。

### 需要借助原生项目的IDE

项目调试和打包，需要借助原生开发的 IDE，如 Xcode 和 Android Studio。
