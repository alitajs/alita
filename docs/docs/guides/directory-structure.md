# 目录结构

这里罗列了 alita 项目中约定(或推荐)的目录结构，在项目开发中，请遵照这个目录结构组织代码。

```bash
.
├── config
│   └── config.ts
├── dist
├── mock
│   └── app.ts｜tsx
├── src
│   ├── .umi
│   ├── .umi-production
│   ├── layout
│   │   ├── layout.tsx
│   │   ├── index.less
│   ├── models
│   │   ├── global.ts
│   │   └── index.ts
│   ├── pages
│   │   ├── home
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── list
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   └── 404.tsx
│   ├── utils // 推荐目录
│   │   └── index.ts
│   ├── services // 推荐目录
│   │   └── api.ts
│   ├── app.ts
│   ├── global.ts
│   ├── global.(css|less|sass|scss)
│   └── plugin.ts
│   └── favicon.(ico|gif|png|jpg|jpeg|svg|avif|webp)
│   └── loading.(tsx|jsx)
├── node_modules
│   └── .cache
│       ├── bundler-webpack
│       ├── mfsu
│       └── mfsu-deps
├── .env
├── .umirc.ts // 与 config/config 文件 2 选一
├── package.json
├── tsconfig.json
└── typings.d.ts
```
## package.json

包含插件和插件集，以 `@umijs/preset-`、`@umijs/plugin-`、`umi-preset-` 和 `umi-plugin-` 开头的依赖会被自动注册为插件或插件集。

## .env

环境变量。

示例：

```js
	PORT=8888
	COMPRESS=none
```

## .umirc.ts

> 与 `config/config.ts` 文件功能相同，2 选 1 。`.umirc.ts` 文件优先级较高

配置文件，包含 alita 内置功能和插件的配置。

## config/config.ts

> 与 `.umirc.ts` 文件功能相同，2 选 1 。`.umirc.ts` 文件优先级较高

配置文件，包含 alita 内置功能和插件的配置。

## dist 目录

执行 `alita build` 后，产物默认会存放在这里。可通过配置修改产物输出路径。

## mock 目录

存储 mock 文件，此目录下所有 js 和 ts 文件会被解析为 mock 文件。用于本地的模拟数据服务。

## public 目录

静态资源，此目录下所有文件会被 copy 到输出路径。


## src 目录
### .umi 目录

dev 时的临时文件目录，比如入口文件、路由等，都会被临时生成到这里。**不要提交 .umi 目录到 git 仓库，他们会在 alita dev 时被删除并重新生成。**

### .umi-production 目录

build 时的临时文件目录，比如入口文件、路由等，都会被临时生成到这里。**不要提交 .umi-production 目录到 git 仓库，他们会在 alita build 时被删除并重新生成。**

### layout 目录
#### layout.tsx
约定式路由时的全局布局文件，实际上是在路由外面套了一层。比如路由是：

```
[
  { path: '/', component: './pages/home' },
  { path: '/list', component: './pages/list' },
]
```

从组件角度可以简单的理解为如下关系：

```jsx
<layout>
  <page>1</page>
  <page>2</page>
</layout>
```

### pages 目录

所有路由组件存放在这里。使用约定式路由时，约定 `pages` 下所有的 `(j|t)sx?` 文件即路由。使用约定式路由，意味着不需要维护，可怕的路由配置文件。最常用的有基础路由和动态路由（用于详情页等，需要从 url 取参数的情况）
#### 404.tsx

当访问的路由地址不存在时，会自动显示 404 页面。只有 build 之后生效。调试的时候可以访问 `/404` 。

### app.[ts｜tsx]

配置各种插件运行时配置。全局引入的，不应该在这里配置。

### global.(j|t)sx?

在入口文件最前面被自动引入，可以执行进入页面前的一些逻辑，定义一些全局变量，引入全局依赖。

### global.(css|less|sass|scss)

这个文件不走 css modules，自动被引入，可以写一些全局样式，或者做一些样式覆盖。

### plugin.ts 

存在这个文件，会被当前项目加载为 alita 插件，你可以在这里解一些需要插件级支撑的问题。

```ts
import { AlitaApi } from 'alita';

export default (api: AlitaApi) => {
  api.onDevCompileDone((opts) => {
    opts;
    // console.log('> onDevCompileDone', opts.isFirstCompile);
  });
  api.onBuildComplete((opts) => {
    opts;
    // console.log('> onBuildComplete', opts.isFirstCompile);
  });
  api.chainWebpack((memo) => {
    memo;
  });
};

```
### favicon

约定如果存在 src/favicon.(ico|gif|png|jpg|jpeg|svg|avif|webp) 文件，将会使用它作为构建网页的 shortcut icon，如存在 src/favicon.png 则构建时会生成：

```
<link rel="shortcut icon" href="/favicon.png">
```

支持多种文件后缀，按以下优先级匹配：

```js
const FAVICON_FILES = [
  'favicon.ico',
  'favicon.gif',
  'favicon.png',
  'favicon.jpg',
  'favicon.jpeg',
  'favicon.svg',
  'favicon.avif',
  'favicon.webp',
];
```

如果约定方式不满足你的需求，可以使用 favicons 配置。

配置优先级会大于约定

### loading.(tsx|jsx)

定义懒加载过程中要显示的加载动画。
