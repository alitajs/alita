
## Bundler
* [x] 支持两种构建方式，webpack 和 vite，主功能保持对齐
* [x] webpack 移除 4 的支持，只保留 5
* [x] 支持 esm 格式的输出
* [x] 支持 bundless dep cdn 接入
* [x] fork webpack-chain，支持 webpack 5
* [x] 默认开启 mfsu
* [x] mfsu 大版本迭代，发布 mfsu v3
  * [x] 包含请求合并
  * [x] esbuild 预编译
  * [x] Module Graph 更新
* [x] mfsu 方案通用化，适用于所有 webpack 项目
* [x] js 压缩默认用 esbuild，可选择 swc、terser、uglifyjs 或 none
* [x] css 压缩默认用 esbuild，可选择 cssnano 或 none
* [ ] 源码编译默认用 babel，可选择 swc 或 esbuild，swc 模式保证 umi 内功能全兼容，esbuild 模式会损失部分功能
* [x] assets 从白名单改成 fallback 的实现方式，避免未考虑到的文件类型不能正确被处理
* [x] 设置非 css modules 文件的 side effects，避免依赖库中的 css 文件被 tree-shaking 掉
* [ ] node 补丁默认不提供，配置开启
* [x] 升级 mini-css-extract-plugin 到 2
* [x] 升级 postcss 到 8
* [ ] 提供 3 套 code-splitting 策略，1）大 vendors 2）社区最优 3）包最小

## 路由
* [x] 路由换新的更灵活的数据结构，routeIds + routes 的形式，这对于灵活指定 global layout、layout 等插件编写、按需编译等都有帮助
* [ ] 支持 md、mdx 作为路由
* [x] 调整约定式路由规则，综合参考 remix + next.js
* [ ] 新增支持编程时的路由配置方式
* [x] 升级 react-router 到 6-beta

## 配置
* [x] register 从 babel-register 换成 esbuild，提速和减少路径限制
* [x] 通用化，适用非 umi 项目
* [ ] 支持异步

## Service + 插件
* [x] 插件编译改用 esbuild，所以以后可以用 TypeScript 写插件并且不用编译，而且还不慢
* [x] 删除 onPluginReady，统一用 onStart
* [x] 数据中心化，通过 modifyAppData 收集大量项目数据，供插件使用（不上报）
* [x] 新增 onCheck 阶段，在 onStart 之前，用于校验项目状态，比如适用于内网的强约束
* [x] 修复 EnableBy.config 对于 modifyDefaultConfig 和 modifyConfig 的影响
* [x] 废弃 `@umijs/type` 包，插件类型从 umi 中引
* [x] 通用化，适用非 umi 项目
* [x] 约定项目目录下的 `plugin.ts` 为插件，无需声明

## Runtime
* [ ] react 默认 17，支持 18-alpha
* [ ] 支持 ReactStrictMode，dev 时开启
* [x] 0 副作用，history 不走全局，用 useRef 存
* [ ] 尝试支持 runtime-vite
* [ ] 废弃 import all from umi，比如 `import { useModel } from @@/plugin-model`，但在 sekrio 和 bigfish 层有封装，非 alias，减少针对引用包的记忆
* [ ] 在全局和路由组件层做两层 Provider 和两层 ErrorBoundary
* [ ] 路由组件全量 memo 以减少 rerender
* [ ] 接口 hooks 化，提供比如 useHistory、useLocation、useParams、useRouteMatch、useRouteData、useBeforeUnload、usePendingLocation...
* [ ] 路由组件增加一层 TransitionManager，管理切换效果
* [ ] 废弃 document.ejs，提供 Meta、Links、Scripts 和 Outlet 等接口用于拼 html
* [x] 废弃 umi-request，换成 axios

## preset-built-in
* [ ] 允许配置入口，通过组装的方式搭建新的入口文件
* [ ] 约束临时文件内容
* [x] 提供 setup 命令，给项目的 postinstall script 用，也可单独调用，允许插件扩展
* [ ] 提供 verityCommit 命令
* [ ] dev 变更为交互式的命令方式，启动后可输入 web、sim、qr、help 等命令
* [x] 约定式的 favicon.ico
* [x] 约定式的 plugin.ts

## babel-preset-umi
* [x] 更新 babel 到 7.15+，重新梳理 preset 和 plugin

## umi
* [ ] 提供封装上层框架的封装，给 sekiro、bigfish 和 [alita](https://github.com/alitajs/alita) 用

## Lint & Prettier & verityCommit
* [ ] 支持 eslint 8
* [ ] 内置提供 lint、prettier 等相关规则
* [ ] 梳理 eslint 规则，只包含质量类规则，剔除所有格式化类规则，格式化的事情交给 prettier
* [ ] 锁死依赖，其中 eslint config 和 plugin 的封装基于 [Patch](https://www.npmjs.com/package/@rushstack/eslint-patch) 锁定

## Test
* [ ] 支持 jest 27
* [ ] 不再提供 jest 命令封装，而是提供配置
* [ ] 支持 esbuild 作为 js、ts 的编译器，提升性能
* [ ] 提供 umi/test 接口，提供 config、configEsbuildTranspiler、configUmiAlias 等方法，方便使用者在 jest.config.ts 里组装配置，然后自己依赖 jest 来跑用例

## Mock
TODO

## SSR
TODO

## 其他
* [x] 新增 bigfish 包（包名待定），内网 Bigfish 框架部分对外
* [x] 新增 Low Import 研发模式
* [ ] 依赖 es6 代码在 IE 报错的解决方案
* [x] 通过 ncc + dts-packer 预编译依赖，锁死所有能锁的依赖，主动升级
* [x] 需要 node 14+，且不支持 node 15