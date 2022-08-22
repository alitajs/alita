# 配置

Alita 的设计初衷就是面向场景化的方案，所以我们的配置方案，有点偏向于指明是哪个场景下使用。

其实极端一点的做法是提供一个 `appType` 配置，就能够满足所有的需求。

但是考虑到用法上的简便和合理性。

我们提供了几个配置项可供选择。

约定 `config/config.j|ts` 为项目配置文件。

为方便查找，以下配置项通过字母排序。

## appType

- Type: `pc`,`h5`,

// TODO: micro,native

配置项目类型，只支持 `pc`,`h5`, ... 五者之一。

详细的如何运行，请查阅[运行预览]()

## aconsole

一些 alita 项目的移动端调试工具的集合。

```ts
{
  aconsole:{
    inspx:{},
    console:{}
  }
}
```

### inspx

inspx 可以通过摇一摇唤醒，用于查看页面渲染的 px 值，显示值为真实的 px 值，可能是设置的 px 值 @2x 或者 @3x。

配置项。

- 可写
- 类型：object

```ts
export default {
  aconsole: {
    inspx: {
      production: false, // 希望在生产上也能够保留 inspx 功能，一般用在特殊的灰度环境
      disabled: false, // 是否关闭 inspx 功能，推荐用法是不使用，这里可以不配置 inspx 。
      margin: true,
      size: true,
      padding: true,
    },
  },
};
```

### console

控制台通过配置唤起。

配置项。

- 可写
- 类型：object

| 键名 | 类型 | 可选 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| defaultPlugins | Array | true | ['system', 'network', 'element', 'storage'] | 需要自动初始化并加载的内置插件。 |
| onReady             | Function | true | - | 回调方法，当 vConsole 完成初始化并加载完内置插件后触发。 |
| onClearLog          | Function | true | - | 回调方法，点击 Log 或 System 面板的 "Clear" 按钮后出发。 |
| maxLogNumber        | Number   | true | 1000 | 超出上限的日志会被自动清除。 |
| disableLogScrolling | Boolean  | true |- | 若为 `false`，有新日志时面板将不会自动滚动到底部。 |
| theme               | String   | true | 'light' | 主题颜色，可选值为 'light'  | 'dark'。 |

## keepalive

- Type: string[]

配置需要状态保持的路由，需要通过 `dropByCacheKey` 方法解除。

```ts
export default {
  keepalive: ['route path', 'route path'],
};
```

解除当前缓存

```ts
import { dropByCacheKey } from 'alita';

dropByCacheKey('/list');
```

> 注意，keepalive 的配置项，支持正则表达式。但是所有的路由正则匹配应该是全小写的，比如不管你的路由是 `home`、`Home` 还是 `hoMe` ，只有设置 `keepalive:[/home/]` 才有效。而字符串的配置方式就刚好相反，如果你的路由是`home`，你配置 `home`、`Home` 还是 `hoMe` 都有效。

以上使用方法是配合 `mobileLayout:true` 使用的。
如果你没有使用 `mobileLayout`，而是自定义的 `layout` ，即项目中存在 `src/layouts/index.tsx`。
需要使用 `KeepAliveLayout` 包裹 `children`。

```ts
import { KeepAliveLayout } from 'alita';
const BasicLayout: React.FC<BasicLayoutProps> = props => {
  return (
    <OtherLayout>
      <KeepAliveLayout {...props}>{children}</KeepAliveLayout>
    </OtherLayout>
  );
};

export default BasicLayout;
```

## mainPath

- Type: string

修改项目的路由主入口。

默认主入口是 `src/pages/index/index.tsx`

```ts
export default {
  mainPath: '/home',
};
```

经过上面配置修改之后，主入口变成 `src/pages/home/index.tsx`

## mobileLayout

- Type: boolean

开启 mobile layout 的运行时模式，可以在 `src/app.ts` 中，设置[运行时配置](/config/runtime) `mobileLayout`。
还可以在页面中使用 `setPageNavBar` 修改当前页面的 layout，使用 `setTabBarList` 在页面级修改底部 Tabs 的信息，常用与动态修改 `badge` 。

```ts
import React, { FC, useEffect } from 'react';
import { setPageNavBar } from 'alita';
const SettingsPage: FC<> = ({ settings, dispatch, location }) => {
  const onLeftClick = () => {
    console.log('click left');
  };
  useEffect(() => {
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        onLeftClick,
        rightContent: [
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ],
      },
    });
    setTabBarList({
      pagePath: location.pathname,
      text: 'home',
      badge: '1',
    });

    setTabBarList([
      {
        pagePath: '/list',
        remove: true, // 删除操作
      },
      {
        pagePath: '/home',
        text: 'home',
        iconPath: 'img',
        selectedIconPath: 'img',
        title: 'home',
      },
      {
        pagePath: '/', // 原路由
        replace: '/index', // 替换操作
        text: '首页',
        iconPath: 'img',
        selectedIconPath: 'img',
        title: '首页',
      },
    ]);

    setTabBarList([
      {
        pagePath: '/list',
        remove: true, // 删除操作
      },
      {
        pagePath: '/home',
        text: 'home',
        iconPath: 'img',
        selectedIconPath: 'img',
        title: 'home',
      },
      {
        pagePath: '/', // 原路由
        replace: '/index', // 替换操作
        text: '首页',
        iconPath: 'img',
        selectedIconPath: 'img',
        title: '首页',
      },
    ]);
  }, []);
  const { name } = settings;

  return <div className={styles.center}>Hello Alita</div>;
};
```

`setPageNavBar` 接收一个[对象 或 对象数组](/components/alita-layout#navlist-)，有两个值，一个是需要修改的 `pagePath`。第二个参数是 `navBar` 配置的是 `antd-mobile` 的 `NavBar`,支持的参数有

| 属性         |           说明           |       类型        |            默认值            |
| :----------- | :----------------------: | :---------------: | :--------------------------: |
| mode         |           模式           |      string       | 'dark' enum{'dark', 'light'} |
| icon         | 出现在最左边的图标占位符 |     ReactNode     |              -               |
| leftContent  |       导航左边内容       |        any        |              无              |
| rightContent |       导航右边内容       |        any        |              无              |
| onLeftClick  |     导航左边点击回调     | (e: Object): void |              无              |

`setTabBarList` 接收一个[对象 或 对象数组](/components/alita-layout#list-)

| 属性             | 类型     | 必填 | 说明                                                   |
| ---------------- | -------- | ---- | ------------------------------------------------------ |
| pagePath         | string   | 是   | 页面路径，必须在 pages 中先定义                        |
| text             | string   | 是   | tab 上按钮文字                                         |
| iconPath         | string   | 是   | 图片路径，当 position 为 top 时，不显示 icon。         |
| selectedIconPath | string   | 是   | 选中时的图片路径，当 position 为 top 时，不显示 icon。 |
| iconSize         | string   | 否   | 0.44rem                                                |
| badge            | string   | 否   | badge                                                  |
| onPress          | function | 否   | 点击事件                                               |
| title            | string   | 否   | 定义页面标题                                           |
| remove           | boolean  | 否   | 是否删除当前的 tabItem                                 |
| replace          | string   | 否   | 需要替换的 tabItem 路由                                |

> 注意：在使用 `setPageNavBar` 设置响应函数时，不要使用 `hooks` 方法。（可能会有闭包问题。）尽量使用 `dispatch` 抛出事件。

> 注意：如果是从 `props.location.pathname` 中取到，可能快速切换的时候，会出现错误。尽量显示写明，如：`pagePath:'/home'`。

## retainLog

默认在编译的时候，会去除日志打印，需要编译之后查看日志，需要手动配置保留。

```ts
export default {
  retainLog: true,
};
```

## umi 系共享的配置

> 此处仅仅列出了 alita 项目中常用的一些配置， umi 支持的所有的配置都支持。如果你对 umi 比较熟悉，且有足够的心力维护增加配置之后的项目交付差异，请转向[官网](https://umijs.org/zh-CN/config)查看全部配置。

### alias

* 类型：`Record<string, string>`
* 默认值：`{}`

配置别名，对 import 语句的 source 做隐射。

比如：

```js
{ alias: { foo: '/tmp/to/foo' } }
```

然后代码里 `import 'foo'` 实际上会 `import '/tmp/to/foo'`。

有几个 Tip。

1、alias 的值最好用绝对路径，尤其是指向依赖时，记得加 `require.resolve`，比如，

```js
// ⛔
{ alias: { foo: 'foo' } }

// ✅
{ alias: { foo: require.resolve('foo') } }
```

2、如果不需要子路径也被隐射，记得加 `$` 后缀，比如

```js
// import 'foo/bar' 会被隐射到 import '/tmp/to/foo/bar'
{ alias: { foo: '/tmp/to/foo' } }

// import 'foo/bar' 还是 import 'foo/bar'，不会被修改
{ alias: { foo$: '/tmp/to/foo' } }
```

### base

* 类型：`string`
* 默认值：`/`

设置路由 base，部署项目到非根目录下时使用。

比如有路由 `/` 和 `/users`，设置 base 为 `/foo/` 后就可通过 `/foo/` 和 `/foo/users` 访问到之前的路由。

### chainWebpack

* 类型：`(memo, args) => void`
* 默认值：`null`

用链式编程的方式修改 webpack 配置，基于 webpack-chain，具体 API 可参考 [webpack-api 的文档](https://github.com/mozilla-neutrino/webpack-chain)。

参数中，

* `memo` 是现有 webpack 配置
* `args` 包含一些额外信息和辅助对象，目前有 `env` 和 `webpack`。`env` 为当前环境，值为 `development` 或 `production`；`webpack` 为 webpack 对象，可从中获取 webpack 内置插件等

示例，

```js
export default {
  chainWebpack(memo, { env, webpack }) {
  	// 设置 alias
  	memo.resolve.alias.set('foo', '/tmp/to/foo');
  	
  	// 添加额外插件
  	memo.plugin('hello').use(Plugin, [...args]);
  	
  	// 删除 umi 内置插件
  	memo.plugins.delete('hmr');
  }
}
```

### deadCode

* 类型：`{}`
* 默认值：`false`

检测未使用的文件和导出，仅在 build 阶段开启。

比如：

```
deadCode: {}
```

然后执行 build，如有发现，会有类似信息抛出。

```
Warning: There are 3 unused files:
 1. /mock/a.ts
 2. /mock/b.ts
 3. /pages/index.module.less
 Please be careful if you want to remove them (¬º-°)¬.
```

### define

* 类型：`Record<string, string>`
* 默认值：`{ process.env.NODE_ENV: 'development' | 'production' }`

设置代码中的可用变量。

注意：属性值会经过一次 `JSON.stringify` 转换。

比如，

```
define: { FOO: 'bar' }
```

然后代码里的 `console.log(hello, FOO)` 会被编译成 `console.log(hello, 'bar')`。


### externals

* 类型：`Record<string, string> | Function`
* 默认值：`{}`

设置哪些模块不打包，转而通过 `<script>` 或其他方式引入，通常需要搭配 scripts 或 headScripts 配置使用。

示例，

```
// external react
externals: { react: 'React' },
scripts: ['https://unpkg.com/react@17.0.1/umd/react.production.min.js'],
```

注意：不要轻易设置 antd 的 externals，由于依赖教多，使用方式复杂，可能会遇到较多问题，并且一两句话很难解释清楚。

### favicon

* 类型：`string`
* 默认值：`null`

配置 favicon 路径。可以是绝对路径，也可以是基于项目根目录的相对路径。

比如：

```js
favicon: '/assets/favicon.ico'
```

HTML 中会生成 `<link rel="shortcut icon" type="image/x-icon" href="/assets/favicon.ico" />`。

### forkTSChecker

* 类型：`object`
* 默认值：`null`

开启 TypeScript 的类型检查。基于 fork-ts-checker-webpack-plugin，配置项可参考 [fork-ts-checker-webpack-plugin 的 Options](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#options)。

### hash

* 类型：`boolean`
* 默认值：`false`

开启 hash 模式，让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存。

启用后，产物通常是这样，

```
+ dist
    - logo.sw892d.png
    - umi.df723s.js
    - umi.8sd8fw.css
    - index.html
```

注意：HTML 文件始终没有 hash 后缀。

### headScripts

* 类型：`string[] | Script[]`
* 默认值：`[]`

配置 `<head>` 中的额外 script。

比如，

```js
headScripts: [`alert(1);`, `https://a.com/b.js`]
```

会生成 HTML，

```html
<script>
    alert(1);
</script>
<script src="https://a.com/b.js"></script>
```

如果需要额外属性，切换到对象格式，比如，

```js
headScripts: [
    { src: '/foo.js', defer: true },
    { content: `alert('你好');`, charset: 'utf-8' },
]
```

### ignoreMomentLocale

* 类型：`boolean`
* 默认值：`true`

忽略 moment 的 locale 文件，用于减少产物尺寸。

注意：此功能默认开。配置 `ignoreMomentLocale: false` 关闭。

### metas

* 类型：`Meta[]`
* 默认值：`[]`

配置额外的 meta 标签。

比如，

```js
metas: [
  { name: 'keywords', content: 'umi, umijs' },
  { name: 'description', content: 'React framework.' },
]
```

会生成以下 HTML，

```html
<meta name="keywords" content="umi, umijs" />
<meta name="description" content="React framework." />
```

### mfsu

* 类型：`{ esbuild: boolean; mfName: string; cacheDirectory: string; chainWebpack: (memo, args) => void }`
* 默认值：`{ mfName: 'mf' }`

配置基于 Module Federation 的提速功能。

关于参数。`esbuild` 配为 `true` 后会让依赖的预编译走 esbuild，从而让首次启动更快，缺点是二次编译不会有 webpack 的物理缓存，稍慢一些；`mfName` 是此方案的 remote 库的全局变量，默认是 mf，通常在微前端中为了让主应用和子应用不冲突才会进行配置；`cacheDirectory` 可以自定义缓存目录，默认是 `node_modules/.cache/mfsu`; `chainWebpack` 用链式编程的方式修改 依赖的 webpack 配置，基于 webpack-chain，具体 API 可参考 [webpack-api 的文档](https://github.com/mozilla-neutrino/webpack-chain)。

示例，

```js
// 用 esbuild 做依赖预编译
mfsu: { esbuild: true }

// 关于 mfsu 功能
mfsu: false
```

```js
// webpack 配置修改
mfsu: {
  chainWebpack(memo, args) {
    // 添加额外插件
  	memo.plugin('hello').use(Plugin, [...args]);
    return memo;
  }
}
```

注意：此功能默认开。配置 `mfsu: false` 关闭。

## mock

* 类型：`{ exclude: string[], include: string[] }`
* 默认值：`{}`

配置 mock 功能。

关于参数。`exclude` 用于排除不需要的 mock 文件；`include` 用于额外添加 mock 目录之外的 mock 文件。

示例，

```js
// 让所有 pages 下的 _mock.ts 文件成为 mock 文件
mock: {
  include: ['src/pages/**/_mock.ts']
}
```

注意：此功能默认开。配置 `mock: false` 关闭。

### monorepoRedirect

* 类型：`{ srcDir?: string[], exclude?: RegExp[] }`
* 默认值：`false`

在 monorepo 中使用 umi 时，你可能需要引入其他子包的组件、工具等，通过开启此选项来重定向这些子包的导入到他们的源码位置（默认为 `src` 文件夹），这也可以解决 `MFSU` 场景改动子包不热更新的问题。

通过配置 `srcDir` 来调整识别源码文件夹的优先位置，通过 `exclude` 来设定不需要重定向的依赖范围。

示例：

```js
// 默认重定向到子包的 src 文件夹
monorepoRedirect: {}
// 优先定向到 libs 文件夹
monorepoRedirect: { srcDir: ['libs', 'src'] }
// 不重定向 @scope/* 的子包
monorepoRedirect: { exclude: [/^@scope\/.+/] }
```

### outputPath

* 类型：`string`
* 默认值：`dist`

配置输出路径。

注意：不允许设定为 src、public、pages、mock、config、locales、models 等约定式功能相关的目录。

### plugins

* 类型：`string[]`
* 默认值：`[]`

配置额外的 umi 插件。

数组项为指向插件的路径，可以是 npm 依赖、相对路径或绝对路径。如果是相对路径，则会从项目根目录开始找。

示例，

```js
plugins: [
  // npm 依赖
  'umi-plugin-hello',
  // 相对路径
  './plugin',
  // 绝对路径
  `${__dirname}/plugin.js`,
],
```

### proxy

* 类型：`object`
* 默认值：`{}`

配置代理功能。

比如，

```js
proxy: {
  '/api': {
    'target': 'http://jsonplaceholder.typicode.com/',
    'changeOrigin': true,
    'pathRewrite': { '^/api' : '' },
  }
}
```

然后访问 `/api/users` 就能访问到 http://jsonplaceholder.typicode.com/users 的数据。

注意：proxy 功能仅在 dev 时有效。

### publicPath

* 类型：`string`
* 默认值：`/`

配置 webpack 的 publicPath。

### runtimePublicPath

* 类型：`boolean`
* 默认值：`false`

启用运行时 publicPath。

### scripts

* 类型：`string[] | Script[]`
* 默认值：`[]`

配置 `<body>` 中额外的 script 标签。

比如，

```js
scripts: [`alert(1);`, `https://a.com/b.js`]
```

会生成 HTML，

```html
<script>
    alert(1);
</script>
<script src="https://a.com/b.js"></script>
```

如果需要额外属性，切换到对象格式，比如，

```js
scripts: [
    { src: '/foo.js', defer: true },
    { content: `alert('你好');`, charset: 'utf-8' },
]
```

### styles

* 类型：`string[]`
* 默认值：`[]`

配置额外的 CSS。

配置项支持内联样式和外联样式路径，后者通过是否以 https?:// 开头来判断。

比如：

```js
styles: [`body { color: red; }`, `https://a.com/b.css`]
```

会生成以下 HTML，

```html
<style>
  body {
    color: red;
  }
</style>
<link rel="stylesheet" href="https://a.com/b.css" />
```

### theme

* 类型：`object`
* 默认值：`{}`

配置 less 变量主题。

示例：

```js
theme: { '@primary-color': '#1DA57A' }
```

