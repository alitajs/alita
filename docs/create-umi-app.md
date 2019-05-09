# 通过脚手架创建项目

## 创建 alita 项目

全局安装alita

```
$ yarn global add alita
```

```bash
$ mkdir myapp && cd myapp
$ alita g app
```

> FAQ：如果提示 **alita 命令不存在**，你需要执行 `yarn global bin`，然后把 global bin 的路径添加到环境变量 `PATH` 中。


选择是否使用 TypeScript，默认是JavaScript项目

```bash
? 是否使用typescript，默认否? (y/N)
```

选择是否是H5项目，默认是pc项目，可以通过修改apptype配置

```bash
? 是否是h5页面，默认pc? (y/N)
```

确定后，会根据你的选择自动创建好目录和文件，

```bash
   create package.json
   create src/pages/index/index.js
   create src/pages/index/index.less
   create src/models/index.js
   create mock/app.js
   create src/services/api.js
   create src/app.js
   create config/config.js
   create .gitignore
✔  success
```

然后安装依赖，

```bash
$ yarn
```

最后通过 `yarn start` 启动本地开发，

```bash
$ yarn start
```

如果顺利，在浏览器打开 [http://localhost:8000](http://localhost:8000) 可看到以下界面，

<img src="https://gw.alipayobjects.com/zos/rmsportal/YIFycZRnWWeXBGnSoFoT.png" width="754" />
