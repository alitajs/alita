# 命令行

为方便查找，以下命令通过字母排序。

TODO: 这个文档还需要补充

## build

构建项目，适用于生产环境的部署。

```bash
$ alita build
```

## dev

启动本地开发服务器，进行项目的开发与调试。

```bash
$ alita dev
ready - App listening at http://127.0.0.1:8000
event - compiled successfully in 1051 ms (416 modules)
```

## generate

用于增量生成文件或启用功能，命令行别名是 `g`。

不加任何参数时会给交互式的生成器选择。

```bash
$ alita g
# 或
$ alita generate
? Pick generator type › - Use arrow-keys. Return to submit.
❯   Create Pages -- Create a alita page by page name
    Enable Prettier -- Enable Prettier
```

也可以指定参数。

```bash
# 生成路由文件
$ alita g pages index
```

## setup

初始化项目，会做临时文件的生成等操作。通常在 package.json 的 `scripts.postinstall` 里设置。

```bash
{
  "scripts": { "postinstall": "alita setup" }
}
```

## verifyCommit

验证 commit message 信息，通常和 [husky](https://github.com/typicode/husky) 搭配使用。

比如在 `.husky/commit-msg` 做如下配置，

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install alita verify-ommit $1
```

## version

查看 alita 版本，等同于 `alita -v`。

```bash
$ alita version
3.0.0
```

## preview

`alita preview` 命令会在本地启动一个静态 Web 服务器，将 dist 文件夹运行在 http://127.0.0.1:4172, 用于预览构建后产物, 支持 proxy、mock 等设置。

你可以通过 `--port` 参数来配置服务的运行端口。

```bash
$ alita preview --port 9527
```

现在 `preview` 命令会将服务器运行在 http://127.0.0.1:9527.

通过 `--host` 参数来指定 配置服务运行的 hostname。

以下用户配置在 `preview` 时也会生效

* [proxy](../guides/proxy)
* [mock](../guides/mock)

注意 `dist` 目录会随着配置 `outputPath` 的变更而变更。
