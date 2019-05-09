---
sidebarDepth: 2
---

# 配置

## 基本配置

### history

* 类型：`String | [String, Object]`
* 默认值：`browser`

指定 history 类型，可选 `browser`、`hash` 和 `memory`。

比如：

```js
export default {
  history: 'hash',
};
```

### outputPath

* 类型：`String`
* 默认值：`./dist`

指定输出路径。

### base

* 类型：`String`
* 默认值：`/`

指定 react-router 的 base，部署到非根目录时需要配置。

### publicPath

* 类型：`String`
* 默认值：`/`

指定 webpack 的 publicPath，指向静态资源文件所在的路径。

### hash

* Type: `Boolean`
* Default: `false`

是否开启 hash 文件后缀。

### targets <Badge text="2.1.0+"/>

* Type: `Object`
* Default: `{ chrome: 49, firefox: 45, safari: 10, edge: 13, ios: 10 }`

配置浏览器最低版本，会自动引入 polyfill 和做语法转换，配置的 targets 会和合并到默认值，所以不需要重复配置。

比如要兼容 ie11，需配置：

```js
export default {
  targets: {
    ie: 11,
  },
};
```



### theme

配置主题，实际上是配 less 变量。支持对象和字符串两种类型，字符串需要指向一个返回配置的文件。
比如：

```
"theme": {
  "@primary-color": "#1DA57A"
}
```

或者，

```
"theme": "./theme-config.js"
```

### alias

配置 webpack 的 [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) 属性。

### disableCSSSourceMap

禁用 CSS 的 SourceMap 生成。

### extraBabelPresets

定义额外的 babel preset 列表，格式为数组。

### proxy

配置 webpack-dev-server 的 [proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy) 属性。
如果要代理请求到其他服务器，可以这样配：

```markup
"proxy": {
  "/api": {
    "target": "http://jsonplaceholder.typicode.com/",
    "changeOrigin": true,
    "pathRewrite": { "^/api" : "" }
  }
}
```

然后访问 /api/users` 就能访问到 http://jsonplaceholder.typicode.com/users](http://jsonplaceholder.typicode.com/users) 的数据。

### umi

之前的umi-plugin-react的配置，已到了umi,只是希望配置还保持灵活，较少使用这个配置。

```markup
"umi":{
      dva: {
        immer: true,
      },
      antd: true,
      routes: {
        exclude: [/models\//],
      },
      polyfills: ['ie9'],
      locale: {},
      library: 'react',
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/Loading.js',
      },
      dll: {
        exclude: [],
      },
      pwa: true,
      hd: true,
      fastClick: true,
      title: 'default title',
      chunks: ['vendor', 'umi'],
      scripts: [
        { src: 'http://cdn/a.js' },
        { src: '<%= PUBLIC_PATH %>a.js' },
        { content: `alert('a');` },
      ],
      headScripts: [],
      metas: [
        { charset: 'utf-8' },
      ],
      links: [
        { rel: 'stylesheet', href: 'http://cdn/a.css' },
      ],
    }
```
