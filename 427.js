"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[427],{7427:function(h,c,e){e.r(c);var r=e(5980),d=e.n(r),t=e(9496),n=e(4637);function a(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};(0,t.useEffect)(function(){if(window.location.hash.length!==0){var s=window.location.hash;window.location.hash="",window.location.hash=s}},[]);var p=i.components||{},l=p.wrapper;return l?(0,n.jsx)(l,d()(d()({},i),{},{children:(0,n.jsx)(o,{})})):o();function o(){var s=Object.assign({h1:"h1",p:"p",pre:"pre",code:"code",h2:"h2",h3:"h3",blockquote:"blockquote",strong:"strong",h4:"h4"},i.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"\u76EE\u5F55\u7ED3\u6784",children:"\u76EE\u5F55\u7ED3\u6784"}),`
`,(0,n.jsx)(s.p,{children:"\u8FD9\u91CC\u7F57\u5217\u4E86 alita \u9879\u76EE\u4E2D\u7EA6\u5B9A(\u6216\u63A8\u8350)\u7684\u76EE\u5F55\u7ED3\u6784\uFF0C\u5728\u9879\u76EE\u5F00\u53D1\u4E2D\uFF0C\u8BF7\u9075\u7167\u8FD9\u4E2A\u76EE\u5F55\u7ED3\u6784\u7EC4\u7EC7\u4EE3\u7801\u3002"}),`
`,(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:`.
\u251C\u2500\u2500 config
\u2502   \u2514\u2500\u2500 config.ts
\u251C\u2500\u2500 dist
\u251C\u2500\u2500 mock
\u2502   \u2514\u2500\u2500 app.ts\uFF5Ctsx
\u251C\u2500\u2500 src
\u2502 \xA0\xA0\u251C\u2500\u2500 .umi
\u2502 \xA0\xA0\u251C\u2500\u2500 .umi-production
\u2502   \u251C\u2500\u2500 app.ts
\u2502   \u251C\u2500\u2500 layout
\u2502   \u2502   \u251C\u2500\u2500 BasicLayout.tsx
\u2502   \u2502   \u251C\u2500\u2500 index.less
\u2502   \u251C\u2500\u2500 models
\u2502   \u2502   \u251C\u2500\u2500 global.ts
\u2502   \u2502   \u2514\u2500\u2500 index.ts
\u2502   \u251C\u2500\u2500 pages
\u2502   \u2502   \u251C\u2500\u2500 index.less
\u2502   \u2502   \u2514\u2500\u2500 index.tsx
\u2502   \u251C\u2500\u2500 utils // \u63A8\u8350\u76EE\u5F55
\u2502   \u2502   \u2514\u2500\u2500 index.ts
\u2502   \u251C\u2500\u2500 services // \u63A8\u8350\u76EE\u5F55
\u2502   \u2502   \u2514\u2500\u2500 api.ts
\u2502   \u251C\u2500\u2500 global.ts
\u2502   \u251C\u2500\u2500 global.(css|less|sass|scss)
\u2502   \u2514\u2500\u2500 plugin.ts 
\u251C\u2500\u2500 node_modules
\u2502 \xA0\xA0\u2514\u2500\u2500 .cache
\u2502       \u251C\u2500\u2500 bundler-webpack
\u2502       \u251C\u2500\u2500 mfsu
\u2502       \u2514\u2500\u2500 mfsu-deps
\u251C\u2500\u2500 .env
\u251C\u2500\u2500 .umirc.ts // \u4E0E config/config \u6587\u4EF6 2 \u9009\u4E00
\u251C\u2500\u2500 package.json
\u251C\u2500\u2500 tsconfig.json
\u2514\u2500\u2500 typings.d.ts
`})}),`
`,(0,n.jsx)(s.h2,{id:"\u6839\u76EE\u5F55",children:"\u6839\u76EE\u5F55"}),`
`,(0,n.jsx)(s.h3,{id:"packagejson",children:"package.json"}),`
`,(0,n.jsxs)(s.p,{children:["\u5305\u542B\u63D2\u4EF6\u548C\u63D2\u4EF6\u96C6\uFF0C\u4EE5 ",(0,n.jsx)(s.code,{children:"@umijs/preset-"}),"\u3001",(0,n.jsx)(s.code,{children:"@umijs/plugin-"}),"\u3001",(0,n.jsx)(s.code,{children:"umi-preset-"})," \u548C ",(0,n.jsx)(s.code,{children:"umi-plugin-"})," \u5F00\u5934\u7684\u4F9D\u8D56\u4F1A\u88AB\u81EA\u52A8\u6CE8\u518C\u4E3A\u63D2\u4EF6\u6216\u63D2\u4EF6\u96C6\u3002"]}),`
`,(0,n.jsx)(s.h3,{id:"env",children:".env"}),`
`,(0,n.jsx)(s.p,{children:"\u73AF\u5883\u53D8\u91CF\u3002"}),`
`,(0,n.jsx)(s.p,{children:"\u6BD4\u5982\uFF1A"}),`
`,(0,n.jsx)(s.p,{children:`PORT=8888
COMPRESS=none`}),`
`,(0,n.jsx)(s.h3,{id:"umircts",children:".umirc.ts"}),`
`,(0,n.jsxs)(s.blockquote,{children:[`
`,(0,n.jsxs)(s.p,{children:["\u4E0E ",(0,n.jsx)(s.code,{children:"config/config.ts"})," \u6587\u4EF6\u529F\u80FD\u76F8\u540C\uFF0C2 \u9009 1 \u3002",(0,n.jsx)(s.code,{children:".umirc.ts"})," \u6587\u4EF6\u4F18\u5148\u7EA7\u8F83\u9AD8"]}),`
`]}),`
`,(0,n.jsx)(s.p,{children:"\u914D\u7F6E\u6587\u4EF6\uFF0C\u5305\u542B umi \u5185\u7F6E\u529F\u80FD\u548C\u63D2\u4EF6\u7684\u914D\u7F6E\u3002"}),`
`,(0,n.jsx)(s.h3,{id:"configconfigts",children:"config/config.ts"}),`
`,(0,n.jsxs)(s.blockquote,{children:[`
`,(0,n.jsxs)(s.p,{children:["\u4E0E ",(0,n.jsx)(s.code,{children:".umirc.ts"})," \u6587\u4EF6\u529F\u80FD\u76F8\u540C\uFF0C2 \u9009 1 \u3002",(0,n.jsx)(s.code,{children:".umirc.ts"})," \u6587\u4EF6\u4F18\u5148\u7EA7\u8F83\u9AD8"]}),`
`]}),`
`,(0,n.jsx)(s.p,{children:"\u914D\u7F6E\u6587\u4EF6\uFF0C\u5305\u542B umi \u5185\u7F6E\u529F\u80FD\u548C\u63D2\u4EF6\u7684\u914D\u7F6E\u3002"}),`
`,(0,n.jsx)(s.h3,{id:"dist-\u76EE\u5F55",children:"dist \u76EE\u5F55"}),`
`,(0,n.jsxs)(s.p,{children:["\u6267\u884C ",(0,n.jsx)(s.code,{children:"alita build"})," \u540E\uFF0C\u4EA7\u7269\u9ED8\u8BA4\u4F1A\u5B58\u653E\u5728\u8FD9\u91CC\u3002\u53EF\u901A\u8FC7\u914D\u7F6E\u4FEE\u6539\u4EA7\u7269\u8F93\u51FA\u8DEF\u5F84\u3002"]}),`
`,(0,n.jsx)(s.h3,{id:"mock-\u76EE\u5F55",children:"mock \u76EE\u5F55"}),`
`,(0,n.jsx)(s.p,{children:"\u5B58\u50A8 mock \u6587\u4EF6\uFF0C\u6B64\u76EE\u5F55\u4E0B\u6240\u6709 js \u548C ts \u6587\u4EF6\u4F1A\u88AB\u89E3\u6790\u4E3A mock \u6587\u4EF6\u3002\u7528\u4E8E\u672C\u5730\u7684\u6A21\u62DF\u6570\u636E\u670D\u52A1\u3002"}),`
`,(0,n.jsx)(s.h3,{id:"public-\u76EE\u5F55",children:"public \u76EE\u5F55"}),`
`,(0,n.jsx)(s.p,{children:"\u6B64\u76EE\u5F55\u4E0B\u6240\u6709\u6587\u4EF6\u4F1A\u88AB copy \u5230\u8F93\u51FA\u8DEF\u5F84\u3002"}),`
`,(0,n.jsxs)(s.h2,{id:"src-\u76EE\u5F55",children:[(0,n.jsx)(s.code,{children:"/src"})," \u76EE\u5F55"]}),`
`,(0,n.jsx)(s.h3,{id:"umi-\u76EE\u5F55",children:".umi \u76EE\u5F55"}),`
`,(0,n.jsxs)(s.p,{children:["dev \u65F6\u7684\u4E34\u65F6\u6587\u4EF6\u76EE\u5F55\uFF0C\u6BD4\u5982\u5165\u53E3\u6587\u4EF6\u3001\u8DEF\u7531\u7B49\uFF0C\u90FD\u4F1A\u88AB\u4E34\u65F6\u751F\u6210\u5230\u8FD9\u91CC\u3002",(0,n.jsx)(s.strong,{children:"\u4E0D\u8981\u63D0\u4EA4 .umi \u76EE\u5F55\u5230 git \u4ED3\u5E93\uFF0C\u4ED6\u4EEC\u4F1A\u5728 alita dev \u65F6\u88AB\u5220\u9664\u5E76\u91CD\u65B0\u751F\u6210\u3002"})]}),`
`,(0,n.jsx)(s.h3,{id:"umi-production-\u76EE\u5F55",children:".umi-production \u76EE\u5F55"}),`
`,(0,n.jsxs)(s.p,{children:["build \u65F6\u7684\u4E34\u65F6\u6587\u4EF6\u76EE\u5F55\uFF0C\u6BD4\u5982\u5165\u53E3\u6587\u4EF6\u3001\u8DEF\u7531\u7B49\uFF0C\u90FD\u4F1A\u88AB\u4E34\u65F6\u751F\u6210\u5230\u8FD9\u91CC\u3002",(0,n.jsx)(s.strong,{children:"\u4E0D\u8981\u63D0\u4EA4 .umi-production \u76EE\u5F55\u5230 git \u4ED3\u5E93\uFF0C\u4ED6\u4EEC\u4F1A\u5728 alita build \u65F6\u88AB\u5220\u9664\u5E76\u91CD\u65B0\u751F\u6210\u3002"})]}),`
`,(0,n.jsx)(s.h3,{id:"apptstsx",children:"app.[ts\uFF5Ctsx]"}),`
`,(0,n.jsx)(s.p,{children:"\u8FD0\u884C\u65F6\u914D\u7F6E\u6587\u4EF6\uFF0C\u53EF\u4EE5\u5728\u8FD9\u91CC\u6269\u5C55\u8FD0\u884C\u65F6\u7684\u80FD\u529B\uFF0C\u6BD4\u5982\u4FEE\u6539\u8DEF\u7531\u3001\u4FEE\u6539 render \u65B9\u6CD5\u7B49\u3002\u8FD0\u884C\u65F6\u914D\u7F6E\u662F\u8DD1\u5728\u6D4F\u89C8\u5668\u7AEF\uFF0C\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u5728\u8FD9\u91CC\u5199\u51FD\u6570\u3001jsx \u8BED\u6CD5\uFF0Cimport \u6D4F\u89C8\u5668\u7AEF\u4F9D\u8D56\u7B49\u7B49\u3002"}),`
`,(0,n.jsx)(s.h3,{id:"layoutsindextsx",children:"layouts/index.tsx"}),`
`,(0,n.jsx)(s.p,{children:"\u7EA6\u5B9A\u5F0F\u8DEF\u7531\u65F6\u7684\u5168\u5C40\u5E03\u5C40\u6587\u4EF6\uFF0C\u5B9E\u9645\u4E0A\u662F\u5728\u8DEF\u7531\u5916\u9762\u5957\u4E86\u4E00\u5C42\u3002\u6BD4\u5982\uFF0C\u4F60\u7684\u8DEF\u7531\u662F\uFF1A"}),`
`,(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:`[
  { path: '/', component: './pages/index' },
  { path: '/users', component: './pages/users' },
]
`})}),`
`,(0,n.jsx)(s.p,{children:"\u4ECE\u7EC4\u4EF6\u89D2\u5EA6\u53EF\u4EE5\u7B80\u5355\u7684\u7406\u89E3\u4E3A\u5982\u4E0B\u5173\u7CFB\uFF1A"}),`
`,(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-jsx",children:`<layout>
  <page>1</page>
  <page>2</page>
</layout>
`})}),`
`,(0,n.jsx)(s.h3,{id:"pages-\u76EE\u5F55",children:"pages \u76EE\u5F55"}),`
`,(0,n.jsxs)(s.p,{children:["\u6240\u6709\u8DEF\u7531\u7EC4\u4EF6\u5B58\u653E\u5728\u8FD9\u91CC\u3002\u4F7F\u7528\u7EA6\u5B9A\u5F0F\u8DEF\u7531\u65F6\uFF0C\u7EA6\u5B9A ",(0,n.jsx)(s.code,{children:"pages"})," \u4E0B\u6240\u6709\u7684 ",(0,n.jsx)(s.code,{children:"(j|t)sx?"})," \u6587\u4EF6\u5373\u8DEF\u7531\u3002\u4F7F\u7528\u7EA6\u5B9A\u5F0F\u8DEF\u7531\uFF0C\u610F\u5473\u7740\u4E0D\u9700\u8981\u7EF4\u62A4\uFF0C\u53EF\u6015\u7684\u8DEF\u7531\u914D\u7F6E\u6587\u4EF6\u3002\u6700\u5E38\u7528\u7684\u6709\u57FA\u7840\u8DEF\u7531\u548C\u52A8\u6001\u8DEF\u7531\uFF08\u7528\u4E8E\u8BE6\u60C5\u9875\u7B49\uFF0C\u9700\u8981\u4ECE url \u53D6\u53C2\u6570\u7684\u60C5\u51B5\uFF09"]}),`
`,(0,n.jsx)(s.h4,{id:"\u57FA\u7840\u8DEF\u7531",children:"\u57FA\u7840\u8DEF\u7531"}),`
`,(0,n.jsxs)(s.p,{children:["\u5047\u8BBE ",(0,n.jsx)(s.code,{children:"pages"})," \u76EE\u5F55\u7ED3\u6784\u5982\u4E0B\uFF1A"]}),`
`,(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:`+ pages/
  + users/
    - index.js
  - index.js
`})}),`
`,(0,n.jsx)(s.p,{children:"\u90A3\u4E48\uFF0C\u4F1A\u81EA\u52A8\u751F\u6210\u8DEF\u7531\u914D\u7F6E\u5982\u4E0B\uFF1A"}),`
`,(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-javascript",children:`[
  { path: '/', component: './pages/index.js' },
  { path: '/users/', component: './pages/users/index.js' },
];
`})}),`
`,(0,n.jsx)(s.h4,{id:"\u52A8\u6001\u8DEF\u7531",children:"\u52A8\u6001\u8DEF\u7531"}),`
`,(0,n.jsxs)(s.p,{children:["\u7EA6\u5B9A\uFF0C\u5E26 ",(0,n.jsx)(s.code,{children:"[]"})," \u7684\u76EE\u5F55\u6216\u6587\u4EF6\u4E3A\u52A8\u6001\u8DEF\u7531\u3002\u6BD4\u5982\u4EE5\u4E0B\u76EE\u5F55\u7ED3\u6784\uFF1A"]}),`
`,(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:`+ pages/
  + post/
    - [index].js
  + users/
  - [index].js
`})}),`
`,(0,n.jsx)(s.p,{children:"\u4F1A\u751F\u6210\u8DEF\u7531\u914D\u7F6E\u5982\u4E0B\uFF1A"}),`
`,(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-javascript",children:`[
  { path: '/', component: './pages/index.js' },
  { path: '/users/:index', component: './pages/users/$index.js' },
  { path: '/post/:index', component: './pages/post/$index.js' },
];
`})}),`
`,(0,n.jsx)(s.h4,{id:"srcpages404js",children:"./src/pages/404.js"}),`
`,(0,n.jsxs)(s.p,{children:["\u5F53\u8BBF\u95EE\u7684\u8DEF\u7531\u5730\u5740\u4E0D\u5B58\u5728\u65F6\uFF0C\u4F1A\u81EA\u52A8\u663E\u793A 404 \u9875\u9762\u3002\u53EA\u6709 build \u4E4B\u540E\u751F\u6548\u3002\u8C03\u8BD5\u7684\u65F6\u5019\u53EF\u4EE5\u8BBF\u95EE ",(0,n.jsx)(s.code,{children:"/404"})," \u3002"]}),`
`,(0,n.jsx)(s.h3,{id:"globaljtsx",children:"global.(j|t)sx?"}),`
`,(0,n.jsxs)(s.p,{children:["\u5728\u5165\u53E3\u6587\u4EF6\u6700\u524D\u9762\u88AB\u81EA\u52A8\u5F15\u5165\uFF0C\u53EF\u4EE5\u8003\u8651\u5728\u6B64\u52A0\u5165 polyfill\u3002umi \u533A\u522B\u4E8E\u5176\u4ED6\u524D\u7AEF\u6846\u67B6\uFF0C\u6CA1\u6709\u663E\u5F0F\u7684\u7A0B\u5E8F\u4E3B\u5165\u53E3\uFF0C\u5982 ",(0,n.jsx)(s.code,{children:"src/index.js"}),"\uFF0C\u6240\u4EE5\u5728\u5F15\u7528\u67D0\u4E9B\u6A21\u5757\u7684\u65F6\u5019\uFF0C\u5982\u679C\u6A21\u5757\u529F\u80FD\u8981\u6C42\u5728\u7A0B\u5E8F\u4E3B\u5165\u53E3\u6DFB\u52A0\u4EE3\u7801\u65F6\uFF0C\u4F60\u5C31\u53EF\u4EE5\u5199\u5230\u8FD9\u4E2A\u6587\u4EF6\u3002"]}),`
`,(0,n.jsx)(s.h3,{id:"globalcsslesssassscss",children:"global.(css|less|sass|scss)"}),`
`,(0,n.jsx)(s.p,{children:"\u8FD9\u4E2A\u6587\u4EF6\u4E0D\u8D70 css modules\uFF0C\u81EA\u52A8\u88AB\u5F15\u5165\uFF0C\u53EF\u4EE5\u5199\u4E00\u4E9B\u5168\u5C40\u6837\u5F0F\uFF0C\u6216\u8005\u505A\u4E00\u4E9B\u6837\u5F0F\u8986\u76D6\u3002"}),`
`,(0,n.jsx)(s.h3,{id:"plugints",children:"plugin.ts"}),`
`,(0,n.jsx)(s.p,{children:"\u5B58\u5728\u8FD9\u4E2A\u6587\u4EF6\uFF0C\u4F1A\u88AB\u5F53\u524D\u9879\u76EE\u52A0\u8F7D\u4E3A alita \u63D2\u4EF6\uFF0C\u4F60\u53EF\u4EE5\u5728\u8FD9\u91CC\u89E3\u4E00\u4E9B\u9700\u8981\u63D2\u4EF6\u7EA7\u652F\u6491\u7684\u95EE\u9898\u3002"}),`
`,(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:`import { AlitaApi } from 'alita';

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

`})})]})}}c.default=a}}]);
