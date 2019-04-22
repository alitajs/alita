# Alita
<a href="https://alitajs.com"><img src="https://img.shields.io/badge/alitajs-alita-blue.svg" alt="alita" /></a>

alita是一个社区组织，请把这个徽章添加到你的项目的README.md来支持alita

```html
<a href="https://alitajs.com"><img src="https://img.shields.io/badge/alitajs-alita-blue.svg" alt="alita" /></a>
```

或者在markdown中使用

```markdown
[![Alita](https://img.shields.io/badge/alitajs-alita-blue.svg)](alitajs.com)
```

![2019-04-10 11 37 33](https://user-images.githubusercontent.com/11746742/55874614-75875880-5bc5-11e9-8890-9d10c7f46ca9.gif)

## [Future](https://github.com/alitajs/alita/issues/1)
|产品|项目|备注|
|  :-:  | :-:  |:-:  |
|web-components| https://github.com/alitajs/components||
|blocks||充分用上抽象语法树 https://github.com/angular/angular-cli 感觉可以归到umi ui里面|
|alitax||https://github.com/refect/refect|
|kiwi|https://github.com/alitajs/umi-plugin-kiwi|https://github.com/alibaba/kiwi|
|ice||https://github.com/alibaba/ice/|
|landing||可视化编辑页面 https://github.com/ant-design/ant-design-landing|
|static mock|| 将mock数据解析成静态json，去掉参数，保留正确响应。使得 umi build 之后，不需要部署服务器就可以预览页面，用于项目演示|

## 低门槛
学习成本低，完整的上手教程只需要五分钟,等发布正式版会附上开发手册。
## 高性能
自动压缩代码，自动使用摇树算法，去掉业务中不需要的多余代码，以路由为单元的代码分割
## 多环境
同时支持 pc 端和 h5 端，适配各种环境，比如中台业务、无线业务、egg、支付宝钱包等
## 前端工程化
使用 webpack 打包，配套有 vscode 插件。使用脚本对代码格式化。另外增加了提交代码前的代码质量检测，不合格的代码无法上传到 git 上,减轻代码 review 的工作量。
## 低维护性
alita 基于蚂蚁金服内部唯一的前端标准方案 umi 开发，后续 umi 添加的所有特性都能够及时享受。有用的方案也可以反馈到 umi 社区。
## 其他配套生态
### 国际化
和阿里巴巴国际化全流程解决方案 kiwi 结合使用，能实现一键提取中文文案 、一键替换文本、一键翻译、一键导出文本等功能。配合 vscode 插件使用，甚至可以实现可视化操作功能，后续国际化版本甚至可以让客服人员点点鼠标就能高效快速完成。

### 页面权限
直接新建 src/Authority.js 文件，然后在配置文件中，写上需要检测权限的页面 url 即可。甚至可以使用正则，通配符的形式进行页面较权。
### 模版库代码
pc 端的模版库可以直接使用 ant-design-pro 的代码，也可以享受到 antd 区块的开发福利。
h5 的模版库暂时没有，但只要承接几个 h5 项目就可以沉淀下来业务代码，因为不需要编写组件库，只需要保留简单的业务堆叠。
### 其他业务
其他业务需求都可以通过，插件的形式实现，有需要的项目按需添加，也是只要简单的更改配置文件即可，不需要写多余的代码。

我们将为你提供技术指导与技术支持，使umi更适用于你们内部业务，这一切都是免费的。

请告诉我们你的需求[Alita/Issues](https://github.com/alitajs/alita/issues) 、[umi/Issues](https://github.com/umijs/umi/issues) 、 [ant-design-pro/Issues](https://github.com/ant-design/ant-design-pro/issues)
