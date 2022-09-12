import { Tabbed } from 'umi';

# 快速上手

本文将带领你从零开始在本地搭建一个 alita 项目。

## 一、环境准备

### 安装node

首先得有 node，并确保 node 版本是 14 或以上。

windows 下推荐用 [nvm-windows](https://github.com/coreybutler/nvm-windows)来管理 node 版本，

mac 或 linux 下推荐用 [nvm](https://github.com/nvm-sh/nvm)来管理 node 版本 。

安装 nvm：

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
$ nvm -v
0.39.1
```

安装 node；

```bash
$ nvm install 16
$ nvm use 16
$ node -v
v16.10.0
```

### 安装包管理工具

node 默认包含 npm 包管理工具，但 alita 官方推荐[pnpm](https://pnpm.io/installation) 包管理工具。

安装 pnpm。

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
$ pnpm -v
7.3.0
```

## 二、使用脚手架创建项目

### 创建项目

alita 官方提供了 `create-alita` 脚手架 ，可以轻松快速创建一个 alita 项目。

首先创建一个名为 `myapp` 的文件夹。

```bash
$ mkdir myapp && cd myapp
```

然后执行以下命令，该命令会安装 `create-alita` 脚手架并自动运行，

```bash
$ pnpx create-alita
```
运行成功后，如果你没安装 `create-alita`，会提示是否要安装最新的 `create-alita` 依赖包。
```
√ Install the following package: create-alita@latest? (Y/n) · true
```
安装成功后，选择包管理工具，这里推荐 pnpm，

```bash
? Pick Npm Client » - Use arrow-keys. Return to submit.
  npm
  cnpm
  tnpm
  yarn
> pnpm
```

再选择 npm 源，国内建议选 taobao 源，这样后续安装依赖速度比较快，

```bash
? Pick Bpm Registry » - Use arrow-keys. Return to submit.
  npm
> taobao
```

选择后会自动生成一个最基本的 alita 项目，并自动安装依赖，

```bash
√ Pick Npm Client » pnpm
√ Pick Bpm Registry » taobao
Write: .editorconfig
Write: .eslintignore
Copy:  .eslintrc.js
Write: .gitignore
Write: .npmrc
Write: .prettierignore
Write: .prettierrc.js
Write: .stylelintrc.js
Write: config\config.ts
Copy:  jest-setup.ts
Copy:  jest.config.ts
Copy:  logo.png
Copy:  mock/app.ts
Copy:  mock/user.ts
Write: package.json
Copy:  plugin.ts
Copy:  README.md
Copy:  src/app.tsx
Copy:  src/assets/demoIcon/home.png
Copy:  src/assets/demoIcon/home1.png
Copy:  src/assets/demoIcon/list.png
Copy:  src/assets/demoIcon/list1.png
Copy:  src/assets/demoIcon/setting.png
Copy:  src/assets/demoIcon/setting1.png
Copy:  src/assets/yay.jpg
Copy:  src/components/SearchBar/__tests__/__snapshots__/index.test.tsx.snap
Copy:  src/components/SearchBar/__tests__/index.test.tsx
Copy:  src/components/SearchBar/index.less
Copy:  src/components/SearchBar/index.tsx
Copy:  src/favicon.png
Copy:  src/global.css
Copy:  src/models/index.ts
Copy:  src/models/todo.ts
Copy:  src/pages/index/index.css
Copy:  src/pages/index/index.tsx
Progress: resolved 9, reused 9, downloaded 0, added 0
```

此刻我们成功得搭建起一个最简单的H5项目。

### 项目目录结构

```
├── config
│   └── config.ts // 配置文件，包含 alita 内置功能和插件的配置。
├── mock
│   └── app.ts 
│   └── user.ts
├── node_modules
│   └── .cache
│       ├── bundler-webpack
│       ├── mfsu
│       └── mfsu-deps
├── src
│   └── .umi // dev 时的临时文件目录
│   └── assets // 静态资源
│       └── yay.jpg
│   └── components // 组件
        └── SearchBar
            └── index.less
            └── index.ts
│   └── models // 全局组件
        └──index.ts
        └── todo.ts
│   └── pages // 路由组件
        └── index
            └── index.less
            └── index.tsx
        └── list
            └── index.less
            └── index.tsx
│   └── services // 服务
        └── api.ts
│   └── app.tsx // 运行时配置文件
│   └── favicon.png
│   └── global.css 
├── .editorconfig // 编辑器编码风格配置
├── .eslintignore // eslint校验忽略文件
├── .eslintrc.js // eslint校验配置
├── .gitignore // git忽略文件
├── .npmrc // npm源地址配置
├── .prettierignore // prettier代码格式化忽略文件
├── .prettierrc.js // prettier代码格式化配置
├── .stylelintrc.js // stylelint Css代码规范配置
├── logo.png
├── package.json 
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json 
├── typings.d.ts
```

### 启动项目

执行 `pnpm dev` 命令，

```bash
$ pnpm dev
> alita dev

info  - Hello Alita@3
info  - Using AConsole Plugin
info  - Using KeepAlive Plugin
info  - Using Request Plugin
info  - Using Dva Plugin
info  - Using ClassNames Plugin
info  - Using Mobile Layout Plugin
info  - Using Dva Plugin
info  - Using HD Plugin
info  - Using Antd Mobile Plugin
info  - Using Mobile Layout Plugin
info  - Umi v4.0.8
ready - App listening at http://localhost:8000
event - [Webpack] Compiled in 6642 ms (558 modules)
info  - [MFSU] buildDeps since cacheDependency has changed
event - Network: http://192.168.0.140:8000
wait  - [Webpack] Compiling...
event - [Webpack] Compiled in 558 ms (523 modules)
wait  - [Webpack] Compiling...
event - [Webpack] Compiled in 233 ms (523 modules)
event - [MFSU] Compiled in 14063 ms (2517 modules)
info  - [MFSU] write cache
info  - [MFSU] buildDepsAgain
info  - [MFSU] skip buildDeps
```

在浏览器里打开 [http://localhost:8000/](http://localhost:8000/)，能看到以下界面。

![](https://img.alicdn.com/imgextra/i2/O1CN01ufcj8M1Lpt1yXd8sy_!!6000000001349-2-tps-1372-1298.png)

### 部署发布

执行 `pnpm build` 命令，

```bash
> alita build

info  - Hello Alita@3
info  - Using AConsole Plugin
info  - Using KeepAlive Plugin
info  - Using Request Plugin
info  - Using Dva Plugin
info  - Using ClassNames Plugin
info  - Using Mobile Layout Plugin
info  - Using Dva Plugin
info  - Using HD Plugin
info  - Using Antd Mobile Plugin
info  - Using Mobile Layout Plugin
info  - Umi v4.0.8
event - [Webpack] Compiled in 21283 ms (2173 modules)
info  - Memory Usage: 455.47 MB (RSS: 558.06 MB)
event - Build index.html
```

产物默认会生成到 `./dist` 目录下，

```
./dist
├── static
    └──yay.c56526f4.jpg
├── index.html
├── favicon.png
├── umi.css
├── umi.js
```

完成构建后，就可以把 dist 目录部署到服务器上了。

## 三、创建 PC 项目

用 `create-alita` 脚手架创建的 alita 项目是个 H5 项目，

若想改成 PC 项目，只需将 `config.ts` 文件的内容替换成以下代码即可。

在 PC 项目中推荐使用 antd 组件库，故配置 `antd:{}`。

```js
import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'pc',
  antd: {},
})
```

再执行以下命令安装 antd 组件库。

```bash
$ pnpm add antd
```
## 四、自己搭建 alita 工程

如果你不想使用脚手架搭建一个 alita 项目，想自己搭建一个 alita 项目，可以尝试以下做法。

### 使用npm init 初始化项目

首先创建一个名为 `myAlita` 的文件夹。

```bash
$ mkdir myAlita && cd myAlita
```

执行以下命令，在 myAlita 文件夹中生成一个 package.json 文件。

```bash
pnpm init
```

### 安装 alita

执行以下命令，安装 alita，

```bash
$ pnpm add alita
```
安装完成后，package.json 文件中，多了一段代码。

```diff
{
  "name": "myalita",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
+  "dependencies": {
+    "alita": "^3.0.12"
+  }
}
```
### 添加配置文件

```bash
$ mkdir config && cd config && touch config.ts
```
>> 在window下，可以使用 Git Bash 执行以上命令

在 config.ts 中添加以下代码，告诉 alita 这是一个 pc 端项目，并引入 antd 组件库。

```diff
+ import { defineConfig } from 'alita';
+ 
+ export default defineConfig({
+   appType: 'pc',
+  antd: {},
+ })
```

当然得执行以下命令，回到根目录，安装一下 antd 。

```bash
$ cd ../
$ pnpm add antd
```

### 添加路由文件

```bash
$ cd ../ && mkdir src && cd src
$ mkdir pages && cd pages
$ mkdir home && cd home && touch index.tsx
```

执行以下命令，创建 src 文件夹，在 src 文件夹中创建 pages 文件夹，

在 pages 文件夹中创建 home 文件夹，在 home 文件夹中创建 index.tsx 文件，

最后在 index.tsx 中添加以下代码。

```ts
import React from "react";
import { Button} from 'antd';

const Home = () => {
  return (
    <Button type="primary">欢迎使用 alita3 </Button>
  )
}

export default Home;
```

### 定义启动项目脚本命令

在 package.json 文件中添加以下代码

```diff
{
  "name": "myalita",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "dev": "alita dev"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "alita": "^3.0.12",
    "antd": "^4.22.3"
  }
}
```
### 启动项目

```bash
$ cd ../../../
$ pnpm dev
```

回到根目录，执行 `pnpm dev` 启动项目。

在浏览器里打开 http://localhost:8000/#/home，能看到以下界面。
