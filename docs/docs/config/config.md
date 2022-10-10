# 配置

约定 `config/config.j|ts` 为项目配置文件。

Alita 的设计初衷就是面向场景化的方案，所以我们的配置方案，有点偏向于指明是哪个场景下使用。其实极端一点的做法是提供一个 `appType` 配置，就能够满足所有的需求。但是考虑到用法上的简便和合理性。我们提供了几个配置项可供选择。

此外 Alita 支持的所有umi的配置。此处仅仅列出了 alita 项目中常用的一些配置。如果你对 Umi 比较熟悉，且有足够的心力维护增加配置之后的项目交付差异，请转向[官网](https://umijs.org/docs/api/config)查看全部配置。

## 一、Alita提供的配置

### appType 

* 类型：`pc | h5`
* 默认值：`{}`

配置项目类型

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'h5',
});
```

### aconsole

一些 alita 项目的移动端调试工具的集合。

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  aconsole:{
    inspx:{},
    console:{}
  }
});
```

#### inspx

inspx 可以通过摇一摇唤醒，用于查看页面渲染的 px 值，显示值为真实的 px 值，可能是设置的 px 值 @2x 或者 @3x。

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  aconsole:{
    inspx:{
      production: false, // 希望在生产上也能够保留 inspx 功能，一般用在特殊的灰度环境
      disabled: false, // 是否关闭 inspx 功能，推荐用法是不使用，这里可以不配置 inspx 。
      margin: true,
      size: true,
      padding: true,
    },
  }
});
```

#### console

控制台通过配置唤起。

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  aconsole:{
    console:{
      defaultPlugins: ['system', 'network', 'element', 'storage'], // 希需要自动初始化并加载的内置插件。
      onReady(){
        console.log('初始化完成')
      }, // 回调方法，当 vConsole 完成初始化并加载完内置插件后触发 。
      onClearLog(){
        console.log('清除完毕')
      },// 回调方法，点击 Log 或 System 面板的 "Clear" 按钮后出发。
      maxLogNumber: 1000,// 最大日志条数，超出的日志会被自动清除，默认为1000。
      disableLogScrolling: true,// 若为 `false`，有新日志时面板将不会自动滚动到底部。
      theme:'light',// 主题颜色，可选值为 'light'  | 'dark'，默认为 'light'。
    },
  }
});
```

### keepalive

* 类型：`string[]`

配置需要状态保持的路由，需要通过 `dropByCacheKey` 方法解除。

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  keepalive: ['/list'],
});
```

解除当前缓存

```ts
import { dropByCacheKey } from 'alita';

dropByCacheKey('/list');
```

> 注意，keepalive 的配置项，支持正则表达式。但是所有的路由正则匹配应该是全小写的，比如不管你的路由是 `home`、`Home` 还是 `hoMe` ，只有设置 `keepalive:[/home/]` 才有效。而字符串的配置方式就刚好相反，如果你的路由是`home`，你配置 `home`、`Home` 还是 `hoMe` 都有效。

以上使用方法是配合 `mobileLayout:true` 使用的。

如果你没有使用 `mobileLayout`，而是自定义的 `layout` ，即项目中存在 `src/layouts/index.tsx`。
需要使用 `useKeepOutlets` 获取到 `OutLet`，才能使用 `keepalive` 配置需要状态保持的路由。 

```ts
import React from 'react';
import type {FC} from 'react';
import { useKeepOutlets} from 'alita';

const Layout: FC = () => {
  const OutLet = useKeepOutlets();
  return <>{OutLet}</>;
};

export default Layout;
```

### mainPath

* 类型：`string`

修改项目的路由主入口。

默认主入口是 `src/pages/index/index.tsx`

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  mainPath: '/home',,
});
```

经过上面配置修改之后，主入口变成 `src/pages/home/index.tsx`

### mobileLayout

* 类型：`boolean`

使用 mobile layout 布局。

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  mobileLayout: true,
});
```

### retainLog

* 类型：`boolean`

默认在编译的时候，会去除日志打印，需要编译之后查看日志，需要手动配置保留。

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  retainLog: true,
});
```

## 二、共享 Umi4 的配置

### 开发相关配置

#### alias

* 类型：`Record<string, string>`
* 默认值：`{}`

配置别名，对 import 语句的 source 做隐射。

比如：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  alias: { 
    foo: '/tmp/to/foo',
  } 
});
```

然后代码里 `import 'foo'` 实际上会 `import '/tmp/to/foo'`。

有几个 Tip。

1、alias 的值最好用绝对路径，尤其是指向依赖时，记得加 `require.resolve`，比如，

```ts
import { defineConfig } from 'alita';

// ⛔
export default defineConfig({
  alias: { 
    foo: 'foo', 
  } 
});

// ✅
export default defineConfig({
  alias: { 
    foo: require.resolve('foo'), 
  } 
});
```

2、如果不需要子路径也被隐射，记得加 `$` 后缀，比如

`import 'foo/bar'` 会被隐射到 `import '/tmp/to/foo/bar'`

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  alias: { 
    foo: '/tmp/to/foo',
  } 
});
```
`import 'foo/bar'` 还是 `import 'foo/bar'`，不会被修改

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  alias: { 
    foo$: '/tmp/to/foo'
  } 
});
```

#### define

* 类型：`Record<string, string>`
* 默认值：`{ process.env.NODE_ENV: 'development' | 'production' }`

设置代码中的可用变量（全局变量）。

注意：属性值会经过一次 `JSON.stringify` 转换。

示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  define: { 
    FOO: 'bar' 
  }
});
```

项目中的 `console.log(hello, FOO)` 会被编译成 `console.log(hello, 'bar')`。

#### forkTSChecker

* 类型：`object`
* 默认值：`null`

开启 TypeScript 的类型检查。基于 fork-ts-checker-webpack-plugin，配置项可参考 [fork-ts-checker-webpack-plugin 的 Options](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#options)。


#### mock

* 类型：`{ exclude: string[], include: string[] }`
* 默认值：`{}`

配置 mock 功能。

参数：
* `exclude` 用于排除不需要的 mock 文件；
* `include` 用于额外添加 mock 目录之外的 mock 文件。

示例：

让所有 pages 下的 _mock.ts 文件成为 mock 文件。

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  mock: {
    include: ['src/pages/**/_mock.ts']
  }
});
```

注意：此功能默认开。配置 `mock: false` 关闭。

#### proxy

* 类型：`object`
* 默认值：`{}`

配置代理功能。

示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  proxy: {
    '/api': {
      'target': 'http://jsonplaceholder.typicode.com/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    }
  }
});
```

然后访问 `/api/users` 就能访问到 http://jsonplaceholder.typicode.com/users 的数据。

注意：proxy 功能仅在开发环境时有效。

#### theme

* 类型：`object`
* 默认值：`{}`

配置 less 变量主题。

示例：
```ts
import { defineConfig } from 'alita';

export default defineConfig({
  theme: { '@primary-color': '#1DA57A' }
});
```

#### plugins

* 类型：`string[]`
* 默认值：`[]`

配置额外的 umi 插件。

数组项为指向插件的路径，可以是 npm 依赖、相对路径或绝对路径。如果是相对路径，则会从项目根目录开始找。

示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  plugins: [
    // npm 依赖
    'umi-plugin-hello',
    // 相对路径
    './plugin',
    // 绝对路径
    `${__dirname}/plugin.js`,
  ],
});
```

### 构建相关配置

#### chainWebpack

* 类型：`(memo, args) => void`
* 默认值：`null`

用链式编程的方式修改 webpack 配置，基于 webpack-chain，具体 API 可参考 [webpack-api 的文档](https://github.com/mozilla-neutrino/webpack-chain)。

参数：

* `memo` 是现有 webpack 配置
* `args` 包含一些额外信息和辅助对象，目前有 `env` 和 `webpack`。`env` 为当前环境，值为 `development` 或 `production`；`webpack` 为 webpack 对象，可从中获取 webpack 内置插件等

示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  chainWebpack(memo, { env, webpack }) {
    // 设置 alias
    memo.resolve.alias.set('foo', '/tmp/to/foo');

    // 添加额外插件
    memo.plugin('hello').use(Plugin, [...args]);

    // 删除 umi 内置插件
    memo.plugins.delete('hmr');
  }
});
```

#### deadCode

* 类型：`{}`
* 默认值：`false`

检测未使用的文件和导出，仅在 build 阶段开启。

示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  deadCode: {} 
});
```

然后执行 build，如有发现，会有类似信息抛出。

```
Warning: There are 3 unused files:
 1. /mock/a.ts
 2. /mock/b.ts
 3. /pages/index.module.less
 Please be careful if you want to remove them (¬º-°)¬.
```

#### externals

* 类型：`Record<string, string> | Function`
* 默认值：`{}`

设置哪些模块不打包，转而通过 `<script>` 或其他方式引入，通常需要搭配 `headScripts` 配置使用。

示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  externals: { react: 'React' },
  headScripts: ['https://unpkg.com/react@17.0.1/umd/react.production.min.js'],
});
```

注意：不要轻易设置 antd 的 externals，由于依赖教多，使用方式复杂，可能会遇到较多问题，并且一两句话很难解释清楚。

#### hash

* 类型：`boolean`
* 默认值：`false`

开启 hash 模式，让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存。

示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  hash: true,
});
```

启用后，产物通常是这样：

```
+ dist
  - logo.sw892d.png
  - umi.df723s.js
  - umi.8sd8fw.css
  - index.html
```

注意：HTML 文件始终没有 hash 后缀。

#### ignoreMomentLocale

* 类型：`boolean`
* 默认值：`true`

忽略 moment 的 locale 文件，用于减少产物尺寸。

注意：此功能默认开。

可配置关闭，示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  ignoreMomentLocale: false
});
```

#### mfsu

* 类型：
```json
{ 
  esbuild: boolean; 
  mfName: string; 
  cacheDirectory: string; 
  strategy: 'normal' | 'eager'; 
  include?: string[]; 
  chainWebpack: (memo, args) => void; 
  exclude?: Array<string | RegExp> 
}
```
* 默认值：
```json
{ 
  mfName: 'mf',
  strategy: 'normal'
}
```

配置基于 Module Federation 的提速功能。

参数：

* `esbuild` 配为 `true` 后会让依赖的预编译走 esbuild，从而让首次启动更快，缺点是二次编译不会有 webpack 的物理缓存，稍慢一些；
* `mfName` 是此方案的 remote 库的全局变量，默认是 mf，通常在微前端中为了让主应用和子应用不冲突才会进行配置；
* `cacheDirectory` 可以自定义缓存目录，默认是 `node_modules/.cache/mfsu`;
* `chainWebpack` 用链式编程的方式修改依赖的 webpack 配置，基于 webpack-chain，具体 API 可参考 [webpack-api 的文档](https://github.com/mozilla-neutrino/webpack-chain)；
* `runtimePublicPath` 会让修改 mf 加载文件的 publicPath 为 `window.publicPath`；
* `strategy` 指定 mfsu 编译依赖的时机；
  - `normal` 模式下，采用 babel 编译分析后，构建 Module Federation 远端包；
  - `eager` 模式下采用静态分析的方式，和项目代码同时发起构建；
* `include` 仅在 `strategy: 'eager'` 模式下生效， 用于补偿在 eager 模式下，静态分析无法分析到的依赖，例如 `react` 未进入 Module Federation 远端模块可以这样配置 `{ include: [ 'react' ] }`；
* `exclude` 手动排除某些不需要被 MFSU 处理的依赖, 比如 `vant` 不希望走 MFSU 处理 可以配置 `{ exclude: [ 'vant' ] }`。

注意：此功能默认开。配置 `mfsu: false` 关闭：
```ts
import { defineConfig } from 'alita';

export default defineConfig({
  mfsu: false
});
```

示例：

用 esbuild 做依赖预编译

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  mfsu: { 
    esbuild: true 
  }
});
```

webpack 配置修改

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  mfsu: {
    chainWebpack(memo, args) {
      // 添加额外插件
      memo.plugin('hello').use(Plugin, [...args]);
      return memo;
    }
  }
});
```

#### monorepoRedirect

* 类型：`{ srcDir?: string[], exclude?: RegExp[] }`
* 默认值：`false`

在 monorepo 中使用 umi 时，你可能需要引入其他子包的组件、工具等，通过开启此选项来重定向这些子包的导入到他们的源码位置（默认为 `src` 文件夹），这也可以解决 `MFSU` 场景改动子包不热更新的问题。

通过配置 `srcDir` 来调整识别源码文件夹的优先位置，通过 `exclude` 来设定不需要重定向的依赖范围。

示例：

默认重定向到子包的 src 文件夹

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  monorepoRedirect: {}
});
```

优先定向到 libs 文件夹

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  monorepoRedirect: { srcDir: ['libs', 'src'] }
});
```

不重定向 @scope/* 的子包

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  monorepoRedirect: { exclude: [/^@scope\/.+/] }
});
```

#### outputPath

* 类型：`string`
* 默认值：`dist`

配置输出路径。

注意：不允许设定为 src、public、pages、mock、config、locales、models 等约定式功能相关的目录。

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  outputPath: 'lib'
});
```

执行`pnpm build`，会生成一个 lib 文件。

### 部署相关配置

#### base

* 类型：`string`
* 默认值：`/`

设置路由 base，部署项目到非根目录下时使用。

比如有路由 `/` 和 `/users`，设置 base 为 `/foo/` 后就可通过 `/foo/` 和 `/foo/users` 访问到之前的路由。

#### publicPath

* 类型：`string`
* 默认值：`/`

配置 webpack 的 publicPath。当打包的时候，webpack 会在静态文件路径前面添加 publicPath 的值，当你需要修改静态文件地址时，比如使用 CDN 部署，把 publicPath 的值设为 CDN 的值就可以。如果使用一些特殊的文件系统，比如混合开发或者 cordova 等技术，可以尝试将 publicPath 设置成 ./ 相对路径。

> 相对路径 ./ 有一些限制，例如不支持多层路由 /foo/bar，只支持单层路径 /foo

如果你的应用部署在域名的子路径上，例如 https://xxx/foo/，你需要设置 publicPath 为 /foo/，如果同时要兼顾开发环境正常调试，你可以这样配置：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/foo/' : '/',
});
```

#### runtimePublicPath

* 类型：`boolean`
* 默认值：`false`

启用运行时 publicPath。

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  publicPath: {},
});
```
开启后，可以构建产物中的 index.html 文件中，新增

```
<head>
  <script>
    window.publicPath = '/foo/'
  </script>
</head>
```
后会使用 window.publicPath 作为资源动态加载的起始路径，相当 webpack 的 publicPath 的值为 `/foo/`。


### 产物相关配置

#### favicon

* 类型：`string`
* 默认值：`null`

配置 favicon 路径。可以是绝对路径，也可以是基于项目根目录的相对路径。

示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  favicon: '/assets/favicon.ico',
});
```

HTML 中会生成 `<link rel="shortcut icon" type="image/x-icon" href="/assets/favicon.ico" />`。






#### headScripts

* 类型：`string[] | Script[]`
* 默认值：`[]`

配置build后生成的 HTML 中 `<head></head>`标签中的额外 script。

示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  headScripts: [`alert(1);`, `https://a.com/b.js`]
});
```

build 后生成的 HTML：

```html
<head>
  <script>alert(1);</script>
  <script src="https://a.com/b.js"></script>
</head>
```

如果需要额外属性，切换到对象格式，示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  headScripts: [
    { src: '/foo.js', defer: true },
    { content: `alert('你好');`, charset: 'utf-8' },
  ]
});
```

build 后生成的 HTML：

```html
<head>
  <script defer="true" src="/foo.js"></script>
  <script charset="utf-8">alert('你好');</script>
</head>
```

#### scripts

* 类型：`string[] | Script[]`
* 默认值：`[]`

配置build后生成的 HTML 中 `<body></body>`标签中的额外 script。

示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  scripts: [`alert(1);`, `https://a.com/b.js`]
});
```

build 后生成的 HTML：

```html
<body>
  <script>alert(1);</script>
  <script src="https://a.com/b.js"></script>
</body>
```

如果需要额外属性，切换到对象格式，示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  scripts: [
    { src: '/foo.js', defer: true },
    { content: `alert('你好');`, charset: 'utf-8' },
  ]
});
```

build 后生成的 HTML：

```html
<body>
  <script defer="true" src="/foo.js"></script>
  <script charset="utf-8">alert('你好');</script>
</body>
```

#### metas

* 类型：`Meta[]`
* 默认值：`[]`

配置 build 后生成的 HTML 中额外的 `<meta/>` 标签。

示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  metas: [
    { name: 'keywords', content: 'umi, umijs' },
    { name: 'description', content: 'React framework.' },
  ]
});
```

build 后生成的 HTML：

```html
<meta name="keywords" content="umi, umijs" />
<meta name="description" content="React framework." />
```

#### styles

* 类型：`string[]`
* 默认值：`[]`

配置额外的 CSS。

配置项支持内联样式和外联样式路径，后者通过是否以 https?:// 开头来判断。

示例：

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  styles: [`body { color: red; }`, `https://a.com/b.css`]
});
```

build 后生成的 HTML：

```html
<style>
  body {
    color: red;
  }
</style>
<link rel="stylesheet" href="https://a.com/b.css" />
```

