"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[646],{7646:function(h,i,e){e.r(i);var l=e(5938),s=e.n(l),c=e(9496),n=e(4637);function d(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};(0,c.useEffect)(function(){if(window.location.hash.length!==0){var t=window.location.hash;window.location.hash="",window.location.hash=t}},[]);var u=a.components||{},r=u.wrapper;return r?(0,n.jsx)(r,s()(s()({},a),{},{children:(0,n.jsx)(o,{})})):o();function o(){var t=Object.assign({h1:"h1",p:"p",blockquote:"blockquote",strong:"strong",code:"code",a:"a",h2:"h2",pre:"pre",h3:"h3"},a.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"\u79FB\u52A8\u7AEF\u5168\u5C40\u5E03\u5C40",children:"\u79FB\u52A8\u7AEF\u5168\u5C40\u5E03\u5C40"}),`
`,(0,n.jsx)(t.p,{children:"The generic h5 layout in umi uses antd-mobile."}),`
`,(0,n.jsxs)(t.blockquote,{children:[`
`,(0,n.jsx)(t.p,{children:`umi@2 \u548C alita@1 \u8BF7\u4F7F\u7528 1.x \u7248\u672C
2.x \u7248\u672C\u53EA\u652F\u6301 umi@3 \u548C alita@2`}),`
`]}),`
`,(0,n.jsx)(t.p,{children:(0,n.jsxs)(t.strong,{children:["\u5728 ",(0,n.jsx)(t.code,{children:"alita"})," \u91CC\u4F7F\u7528\u53EF\u4EE5\u53C2\u8003",(0,n.jsx)(t.a,{href:"/config/config#mobilelayout",children:"mobileLayout"})]})}),`
`,(0,n.jsx)(t.h2,{id:"\u4F7F\u7528",children:"\u4F7F\u7528"}),`
`,(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:`npm i @alitajs/alita-layout --save
// or
yarn add @alitajs/alita-layout
`})}),`
`,(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-jsx",children:`import BasicLayout from '@alitajs/alita-layout';

render(<BasicLayout />, document.getElementById('root'));
`})}),`
`,(0,n.jsx)(t.h2,{id:"api",children:"API"}),`
`,(0,n.jsx)(t.h3,{id:"\u6240\u6709\u53C2\u6570\u8BF4\u660E",children:"\u6240\u6709\u53C2\u6570\u8BF4\u660E"}),`
`,(0,n.jsx)(t.p,{children:`| \u5C5E\u6027          | \u7C7B\u578B            | \u5FC5\u586B | \u9ED8\u8BA4\u503C | \u63CF\u8FF0                                   |
| ------------- | --------------- | ---- | ------ | -------------------------------------- |
| tabBar        | TabBarProps     | \u5426   | \u65E0     | \u5B9A\u4E49\u9875\u9762\u5207\u6362\u9875\u4FE1\u606F\uFF0Capi \u53C2\u8003\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F |
| documentTitle | string          | \u5426   | \u65E0     | \u5B9A\u4E49\u9879\u76EE\u7684\u9ED8\u8BA4 title                   |
| titleList     | TitleListItem[] | \u5426   | \u65E0     | \u5B9A\u4E49\u6240\u6709\u9875\u9762\u7684 title                   |
| navBar        | NavBarProps     | \u5426   | \u65E0     | \u5B9A\u4E49\u5934\u90E8\u5BFC\u822A\u4FE1\u606F                       |`}),`
`,(0,n.jsx)(t.h3,{id:"tabbar-\u53C2\u6570\u8BF4\u660E",children:"tabBar \u53C2\u6570\u8BF4\u660E"}),`
`,(0,n.jsx)(t.p,{children:`| \u5C5E\u6027            | \u7C7B\u578B       | \u5FC5\u586B | \u9ED8\u8BA4\u503C | \u63CF\u8FF0                                                     |
| --------------- | ---------- | ---- | ------ | -------------------------------------------------------- |
| color           | HexColor   | \u662F   |        | tab \u4E0A\u7684\u6587\u5B57\u9ED8\u8BA4\u989C\u8272\uFF0C\u4EC5\u652F\u6301\u5341\u516D\u8FDB\u5236\u989C\u8272                 |
| selectedColor   | HexColor   | \u662F   |        | tab \u4E0A\u7684\u6587\u5B57\u9009\u4E2D\u65F6\u7684\u989C\u8272\uFF0C\u4EC5\u652F\u6301\u5341\u516D\u8FDB\u5236\u989C\u8272             |
| backgroundColor | HexColor   | \u662F   |        | tab \u7684\u80CC\u666F\u8272\uFF0C\u4EC5\u652F\u6301\u5341\u516D\u8FDB\u5236\u989C\u8272                         |
| list            | Array      | \u662F   |        | tab \u7684\u5217\u8868\uFF0C\u8BE6\u89C1 list \u5C5E\u6027\u8BF4\u660E\uFF0C\u6700\u5C11 2 \u4E2A\u3001\u6700\u591A 5 \u4E2A tab |
| position        | string     | \u5426   | bottom | tabBar \u7684\u4F4D\u7F6E\uFF0C\u4EC5\u652F\u6301 bottom / top                       |
| tabsGroup       | string[][] | \u5426   |        | \u5F53\u4E00\u4E2A\u9879\u76EE\u9700\u8981\u591A\u4E2A TabBar \u65F6\u914D\u7F6E                         |`}),`
`,(0,n.jsxs)(t.blockquote,{children:[`
`,(0,n.jsx)(t.p,{children:"tabsGroup \u4EC5\u4EC5\u6807\u8BB0 tab \u5206\u7EC4\uFF0C\u662F\u5426\u662F tab \u9875\u9762\uFF0C\u548C\u5176\u4ED6\u53C2\u6570\u4F9D\u65E7\u5728 list \u4E2D\u914D\u7F6E"}),`
`]}),`
`,(0,n.jsx)(t.p,{children:"\u6BD4\u5982\u6709\u56DB\u4E2A\u9875\u9762\u662F tab \u9875\u9762\uFF0C\u4F60\u5148\u4E0D\u7BA1\u4ED6\u4EEC\u5982\u4F55\u5206\u7EC4\uFF0C\u5168\u90E8\u6309\u7167 list \u7684\u914D\u7F6E\uFF0C\u5199\u5230 list \u91CC"}),`
`,(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",children:`const tabList: TabBarListItem[] = [
  {
    pagePath: '/',
    title: '\u9996\u9875',
    ...
  },
  {
    pagePath: '/list',
    title: '\u5217\u8868',
    ...
  },
  {
    pagePath: '/settings',
    title: '\u8BBE\u7F6E',
    ...
  },
  {
    pagePath: '/show',
    title: '\u5C55\u793A',
    ...
  },
];
`})}),`
`,(0,n.jsx)(t.p,{children:"\u7136\u540E\u518D\u5C06\u4ED6\u4EEC\u8FDB\u884C\u5206\u7EC4\uFF0C\u6BD4\u5982\u5C06\u9996\u9875\u548C\u5217\u8868\u5206\u4E3A\u4E00\u7EC4\uFF0C\u5F53\u8BBF\u95EE\u9996\u9875\u7684\u65F6\u5019\uFF0C\u5E95\u90E8 TabBar \u4F1A\u6709\u9996\u9875\u548C\u5217\u8868\u4E24\u4E2A\u5207\u6362\u9879\u3002"}),`
`,(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",children:`const tabBar: TarBarProp
  list: tabList,
  tabsGroup: [['/','/list'],['/setting','/show']]
};
`})}),`
`,(0,n.jsx)(t.h3,{id:"list-\u53C2\u6570\u8BF4\u660E",children:"list \u53C2\u6570\u8BF4\u660E"}),`
`,(0,n.jsx)(t.p,{children:`| \u5C5E\u6027             | \u7C7B\u578B      | \u5FC5\u586B | \u8BF4\u660E                                                   |
| ---------------- | --------- | ---- | ------------------------------------------------------ |
| pagePath         | string    | \u662F   | \u9875\u9762\u8DEF\u5F84\uFF0C\u5FC5\u987B\u5728 pages \u4E2D\u5148\u5B9A\u4E49                        |
| text             | string    | \u5426   | tab \u4E0A\u6309\u94AE\u6587\u5B57                                         |
| iconPath         | string    | \u5426   | \u56FE\u7247\u8DEF\u5F84\uFF0C\u5F53 position \u4E3A top \u65F6\uFF0C\u4E0D\u663E\u793A icon\u3002         |
| selectedIconPath | string    | \u5426   | \u9009\u4E2D\u65F6\u7684\u56FE\u7247\u8DEF\u5F84\uFF0C\u5F53 position \u4E3A top \u65F6\uFF0C\u4E0D\u663E\u793A icon\u3002 |
| iconSize         | string    | \u5426   | 0.44rem                                                |
| badge            | string    | \u5426   | badge                                                  |
| onPress          | function  | \u5426   | \u70B9\u51FB\u4E8B\u4EF6                                               |
| title            | string    | \u5426   | \u5B9A\u4E49\u9875\u9762\u6807\u9898                                           |
| icon             | ReactNode | \u5426   | \u81EA\u5B9A\u4E49 tab \u6837\u5F0F                                        |
| selectedIcon     | ReactNode | \u5426   | \u81EA\u5B9A\u4E49\u9009\u4E2D tab \u6837\u5F0F                                    |`}),`
`,(0,n.jsxs)(t.blockquote,{children:[`
`,(0,n.jsx)(t.p,{children:`\u5173\u4E8E\u9875\u9762\u6807\u9898\uFF0C\u58F0\u660E\u6743\u91CD\u5982\u4E0B\uFF1A
titleList > list.title > list.text > documentTitle > ''`}),`
`]}),`
`,(0,n.jsx)(t.h3,{id:"navbar-\u53C2\u6570\u8BF4\u660E",children:"navBar \u53C2\u6570\u8BF4\u660E"}),`
`,(0,n.jsxs)(t.p,{children:[`| \u5C5E\u6027           | \u8BF4\u660E                       | \u7C7B\u578B              | \u9ED8\u8BA4\u503C                                    |
| -------------- | -------------------------- | ----------------- | ----------------------------------------- |
| mode           | \u6A21\u5F0F                       | string            | 'dark' enum`,"light",`              |
| icon           | \u51FA\u73B0\u5728\u6700\u5DE6\u8FB9\u7684\u56FE\u6807\u5360\u4F4D\u7B26   | ReactNode         | \u4E0D\u5728 tabsBar \u7684\u9875\u9762\uFF0C\u4F1A\u6709\u9ED8\u8BA4\u5DE6\u4FA7\u56DE\u9000\u56FE\u6807 |
| leftContent    | \u5BFC\u822A\u5DE6\u8FB9\u5185\u5BB9               | any               | \u65E0                                        |
| rightContent   | \u5BFC\u822A\u53F3\u8FB9\u5185\u5BB9               | any               | \u65E0                                        |
| onLeftClick    | \u5BFC\u822A\u5DE6\u8FB9\u70B9\u51FB\u56DE\u8C03           | (e: Object): void | \u6709\u5DE6\u4FA7\u56DE\u9000\u56FE\u6807\u7684\u9ED8\u8BA4\u4E8B\u4EF6\u662F\u8FD4\u56DE\u4E0A\u4E00\u9875      |
| navList        | \u5355\u72EC\u8BBE\u7F6E\u67D0\u4E9B\u9875\u9762\u7684 navbar  | NarBarListItem    | \u65E0                                        |
| hideNavBar     | \u9690\u85CF NavBar\uFF0C\u9ED8\u8BA4\u6709 NarBar | boolean           | false                                     |
| fixed          | NavBar \u56FA\u5B9A\u5728\u9875\u9762\u5934\u90E8      | boolean           | false                                     |
| pageBackground | \u9875\u9762\u7684\u80CC\u666F\u989C\u8272             | string            | '#FFF'                                    |
| pageTitle      | \u9875\u9762\u6807\u9898                   | string            | \u65E0\uFF0C\u4F18\u5148\u7EA7\u6700\u9AD8                            |`]}),`
`,(0,n.jsx)(t.h3,{id:"navlist-\u53C2\u6570\u8BF4\u660E",children:"navList \u53C2\u6570\u8BF4\u660E"}),`
`,(0,n.jsx)(t.p,{children:`| \u5C5E\u6027     | \u8BF4\u660E              | \u7C7B\u578B        | \u9ED8\u8BA4\u503C |
| -------- | ----------------- | ----------- | ------ |
| pagePath | \u8DEF\u7531\u540D\u79F0          | string      | \u65E0     |
| navBar   | \u5F53\u524D\u8DEF\u7531\u7684 navBar | NavBarProps | \u65E0     |`})]})}}i.default=d}}]);
