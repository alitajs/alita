# 微生成器

Umi 中内置了众多微生成器，协助你在开发中快速的完成一些繁琐的工作。在 alita 中使用，只需要注意执行命令即可。

## 如何使用

下面的命令会列出目前所有可用的生成器，可以通过交互式方式来选择你使用的功能，都有详细的提示。

```bash
$ alita generate xxx
# 或者
$ alita g xxx
```

你也可以通过 `alita g <generatorName>` 的形式来使用对应的生成器。

## 生成器列表

### 页面生成器

快速生成一个新页面，有以下使用方式。

交互式输入页面名称和文件生成方式：

```bash
$ alita g pages
? What is the name of page? › mypage
```

直接生成：

```bash
$ alita g pages foo
Write: src/pages/foo/index.tsx
Write: src/pages/foo/index.less
Write: src/pages/foo/service.ts
```

### 组件生成器

在 `src/components/` 目录下生成项目需要的组件。和页面生成器一样，组件生成器也有多种生成方式。

交互式生成：
```bash
$ alita g component
info  - @local
✔ Please input you component Name … foo
Write: src/components/Foo/index.ts
Write: src/components/Foo/Foo.tsx
```

直接生成：
```bash
$ alita g component bar
info  - @local
Write: src/components/Bar/index.ts
Write: src/components/Bar/Bar.tsx
```

嵌套生成：
```bash
$ alita g component group/subgroup/baz
info  - @local
Write: src/components/group/subgroup/Baz/index.ts
Write: src/components/group/subgroup/Baz/Baz.tsx
```

批量生成：
```bash
$ alita g component apple banana orange
info  - @local
Write: src/components/Apple/index.ts
Write: src/components/Apple/Apple.tsx
Write: src/components/Banana/index.ts
Write: src/components/Banana/Banana.tsx
Write: src/components/Orange/index.ts
Write: src/components/Orange/Orange.tsx
```

### Mock 生成器

生成 [Mock](./mock) 功能的模板文件，mock 的具体实现参考[文档](./mock)。

交互式生成：
```bash
$ alita g mock
info  - @local
✔ please input your mock file name … auth
Write: mock/auth.ts
```

直接生成:
```bash
$ alita g mock acl
info  - @local
Write: mock/acl.ts
```

嵌套生成:
```bash
$ alita g mock users/profile
info  - @local
Write: mock/users/profile.ts
```

### Tailwind CSS 配置生成器

为项目开启 [Tailwind CSS](https://tailwindcss.com/) 配置，命令执行后，`alita` 会生成 Tailwind CSS 和安装相应的的依赖。

```bash
$ alita g tailwindcss
info  - @local
info  - Write package.json
set config:tailwindcss on /Users/alita/playground/.alitarc.ts
set config:plugins on /Users/alita/playground/.alitarc.ts
info  - Update .alitarc.ts
info  - Write tailwind.config.js
info  - Write tailwind.css
```

### DvaJS 配置生成器

为项目开启 [Dva](https://dvajs.com/) 配置，命令执行后，`alita` 会生成 Dva 

```bash
$ alita g dva
info  - @local
set config:dva on /Users/alita/alita-playground/.alitarc.ts
set config:plugins on /Users/alita/alita-playground/.alitarc.ts
info  - Update config file
info  - Write example model
```
