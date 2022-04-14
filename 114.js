"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[114],{4114:function(j,r,s){s.r(r);var a=s(5980),o=s.n(a),l=s(3524),h=s(9496),n=s(4637);function t(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};(0,h.useEffect)(function(){if(window.location.hash.length!==0){var e=window.location.hash;window.location.hash="",window.location.hash=e}},[]);var u=c.components||{},d=u.wrapper;return d?(0,n.jsx)(d,o()(o()({},c),{},{children:(0,n.jsx)(i,{})})):i();function i(){var e=Object.assign({h1:"h1",p:"p",h2:"h2",code:"code",a:"a",pre:"pre",h3:"h3"},c.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{id:"mock",children:"Mock"}),`
`,(0,n.jsx)(e.p,{children:"Umi \u63D0\u4F9B\u4E86\u5F00\u7BB1\u5373\u7528\u7684 Mock \u529F\u80FD\uFF0C\u80FD\u591F\u7528\u65B9\u4FBF\u7B80\u5355\u7684\u65B9\u5F0F\u6765\u5B8C\u6210 Mock \u6570\u636E\u7684\u8BBE\u7F6E\u3002"}),`
`,(0,n.jsx)(l.v0,{emoji:"\u{1F4A1}",children:(0,n.jsx)(e.p,{children:`\u4EC0\u4E48\u662F Mock \u6570\u636E\uFF1A\u5728\u524D\u540E\u7AEF\u7EA6\u5B9A\u597D API \u63A5\u53E3\u4EE5\u540E\uFF0C\u524D\u7AEF\u53EF\u4EE5\u4F7F\u7528 Mock \u6570\u636E\u6765\u5728\u672C\u5730\u6A21\u62DF\u51FA API \u5E94\u8BE5\u8981\u8FD4\u56DE\u7684\u6570\u636E\uFF0C\u8FD9\u6837\u4E00\u6765\u524D\u540E\u7AEF\u5F00\u53D1\u5C31\u53EF\u4EE5\u540C\u65F6\u8FDB\u884C\uFF0C\u4E0D\u4F1A\u56E0\u4E3A\u540E\u7AEF API
\u8FD8\u5728\u5F00\u53D1\u800C\u5BFC\u81F4\u524D\u7AEF\u7684\u5DE5\u4F5C\u88AB\u963B\u585E\u3002`})}),`
`,(0,n.jsx)(e.h2,{id:"\u76EE\u5F55\u7EA6\u5B9A",children:"\u76EE\u5F55\u7EA6\u5B9A"}),`
`,(0,n.jsxs)(e.p,{children:["Umi \u7EA6\u5B9A ",(0,n.jsx)(e.code,{children:"/mock"})," \u76EE\u5F55\u4E0B\u7684\u6240\u6709\u6587\u4EF6\u4E3A ",(0,n.jsx)(e.a,{href:"#mock-%E6%96%87%E4%BB%B6",children:"Mock \u6587\u4EF6"}),"\uFF0C\u4F8B\u5982\u8FD9\u6837\u7684\u76EE\u5F55\u7ED3\u6784\uFF1A"]}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-text",children:`.
\u251C\u2500\u2500 mock
    \u251C\u2500\u2500 todos.ts
    \u251C\u2500\u2500 items.ts
    \u2514\u2500\u2500 users.ts
\u2514\u2500\u2500 src
    \u2514\u2500\u2500 pages
        \u2514\u2500\u2500 index.tsx
`})}),`
`,(0,n.jsxs)(e.p,{children:["\u5219 ",(0,n.jsx)(e.code,{children:"/mock"})," \u76EE\u5F55\u4E2D\u7684 ",(0,n.jsx)(e.code,{children:"todos.ts"}),", ",(0,n.jsx)(e.code,{children:"items.ts"})," \u548C ",(0,n.jsx)(e.code,{children:"users.ts"})," \u5C31\u4F1A\u88AB Umi \u89C6\u4E3A ",(0,n.jsx)(e.a,{href:"#mock-%E6%96%87%E4%BB%B6",children:"Mock \u6587\u4EF6"})," \u6765\u5904\u7406\u3002"]}),`
`,(0,n.jsx)(e.h2,{id:"mock-\u6587\u4EF6",children:"Mock \u6587\u4EF6"}),`
`,(0,n.jsx)(e.p,{children:"Mock \u6587\u4EF6\u9ED8\u8BA4\u5BFC\u51FA\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u800C\u5BF9\u8C61\u7684\u6BCF\u4E2A Key \u5BF9\u5E94\u4E86\u4E00\u4E2A Mock \u63A5\u53E3\uFF0C\u503C\u5219\u662F\u8FD9\u4E2A\u63A5\u53E3\u6240\u5BF9\u5E94\u7684\u8FD4\u56DE\u6570\u636E\uFF0C\u4F8B\u5982\u8FD9\u6837\u7684 Mock \u6587\u4EF6\uFF1A"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`// ./mock/users.ts

export default {

  // \u8FD4\u56DE\u503C\u53EF\u4EE5\u662F\u6570\u7EC4\u5F62\u5F0F
  'GET /api/users': [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' }
  ],

  // \u8FD4\u56DE\u503C\u4E5F\u53EF\u4EE5\u662F\u5BF9\u8C61\u5F62\u5F0F
  'GET /api/users/1': { id: 1, name: 'foo' },

}
`})}),`
`,(0,n.jsxs)(e.p,{children:["\u5C31\u58F0\u660E\u4E86\u4E24\u4E2A Mock \u63A5\u53E3\uFF0C\u900F\u8FC7 ",(0,n.jsx)(e.code,{children:"GET /api/users"})," \u53EF\u4EE5\u62FF\u5230\u4E00\u4E2A\u5E26\u6709\u4E24\u4E2A\u7528\u6237\u6570\u636E\u7684\u6570\u7EC4\uFF0C\u900F\u8FC7 ",(0,n.jsx)(e.code,{children:"GET /api/users/1"})," \u53EF\u4EE5\u62FF\u5230\u67D0\u4E2A\u7528\u6237\u7684\u6A21\u62DF\u6570\u636E\u3002"]}),`
`,(0,n.jsx)(e.h3,{id:"\u8BF7\u6C42\u65B9\u6CD5",children:"\u8BF7\u6C42\u65B9\u6CD5"}),`
`,(0,n.jsx)(e.p,{children:"\u5F53 Http \u7684\u8BF7\u6C42\u65B9\u6CD5\u662F GET \u65F6\uFF0C\u53EF\u4EE5\u7701\u7565\u65B9\u6CD5\u90E8\u5206\uFF0C\u53EA\u9700\u8981\u8DEF\u5F84\u5373\u53EF\uFF0C\u4F8B\u5982\uFF1A"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`// ./mock/users.ts

export default {

  '/api/users': [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' }
  ],

  '/api/users/1': { id: 1, name: 'foo' },

}
`})}),`
`,(0,n.jsxs)(e.p,{children:["\u4E5F\u53EF\u4EE5\u7528\u4E0D\u540C\u7684\u8BF7\u6C42\u65B9\u6CD5\uFF0C\u4F8B\u5982 ",(0,n.jsx)(e.code,{children:"POST"}),"\uFF0C",(0,n.jsx)(e.code,{children:"PUT"}),"\uFF0C",(0,n.jsx)(e.code,{children:"DELETE"}),"\uFF1A"]}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`// ./mock/users.ts

export default {

  'POST /api/users': { result: 'true' },

  'PUT /api/users/1': { id: 1, name: 'new-foo' },

}
`})}),`
`,(0,n.jsx)(e.h3,{id:"\u81EA\u5B9A\u4E49\u51FD\u6570",children:"\u81EA\u5B9A\u4E49\u51FD\u6570"}),`
`,(0,n.jsx)(e.p,{children:"\u9664\u4E86\u76F4\u63A5\u9759\u6001\u58F0\u660E\u8FD4\u56DE\u503C\uFF0C\u4E5F\u53EF\u4EE5\u7528\u51FD\u6570\u7684\u65B9\u5F0F\u6765\u58F0\u660E\u5982\u4F55\u8BA1\u7B97\u8FD4\u56DE\u503C\uFF0C\u4F8B\u5982\uFF1A"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`export default {

  'POST /api/users/create': (req, res) => {
    // \u6DFB\u52A0\u8DE8\u57DF\u8BF7\u6C42\u5934
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  }

}
`})}),`
`,(0,n.jsxs)(e.p,{children:["\u5173\u4E8E ",(0,n.jsx)(e.code,{children:"req"})," \u548C ",(0,n.jsx)(e.code,{children:"res"})," \u7684 API \u53EF\u53C2\u8003 ",(0,n.jsx)(e.a,{href:"https://expressjs.com/en/api.html",children:"Express@4 \u5B98\u65B9\u6587\u6863"})," \u6765\u8FDB\u4E00\u6B65\u4E86\u89E3\u3002"]}),`
`,(0,n.jsx)(e.h2,{id:"\u5173\u95ED-mock",children:"\u5173\u95ED Mock"}),`
`,(0,n.jsx)(e.p,{children:"Umi \u9ED8\u8BA4\u5F00\u542F Mock \u529F\u80FD\uFF0C\u5982\u679C\u4E0D\u9700\u8981\u7684\u8BDD\u53EF\u4EE5\u4ECE\u914D\u7F6E\u6587\u4EF6\u5173\u95ED\uFF1A"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`// .umirc.ts

export default {
  mock: false,
};
`})}),`
`,(0,n.jsx)(e.p,{children:"\u6216\u662F\u7528\u73AF\u5883\u53D8\u91CF\u7684\u65B9\u5F0F\u5173\u95ED\uFF1A"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-bash",children:`MOCK=none umi dev
`})}),`
`,(0,n.jsx)(e.h2,{id:"\u5F15\u5165-mockjs",children:"\u5F15\u5165 Mock.js"}),`
`,(0,n.jsxs)(e.p,{children:["\u5728 Mock \u4E2D\u6211\u4EEC\u7ECF\u5E38\u4F7F\u7528 ",(0,n.jsx)(e.a,{href:"http://mockjs.com/",children:"Mock.js"}),` \u6765\u5E2E\u6211\u4EEC\u65B9\u4FBF\u7684\u751F\u6210\u968F\u673A\u7684\u6A21\u62DF\u6570\u636E\uFF0C\u5982\u679C\u4F60\u4F7F\u7528\u4E86 Umi \u7684 Mock
\u529F\u80FD\uFF0C\u5EFA\u8BAE\u4F60\u642D\u914D\u8FD9\u4E2A\u5E93\u6765\u63D0\u5347\u6A21\u62DF\u6570\u636E\u7684\u771F\u5B9E\u6027\uFF1A`]}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`import mockjs from 'mockjs';

export default {
  // \u4F7F\u7528 mockjs \u7B49\u4E09\u65B9\u5E93
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),
};
`})}),`
`,(0,n.jsx)(e.h2,{id:"\u5176\u4ED6\u914D\u7F6E",children:"\u5176\u4ED6\u914D\u7F6E"}),`
`,(0,n.jsxs)(e.p,{children:["\u5173\u4E8E Mock \u529F\u80FD\u5B8C\u6574\u7684\u7684\u5176\u4ED6\u914D\u7F6E\u9879\uFF0C\u8BF7\u5728\u6587\u6863\u7684 ",(0,n.jsx)(e.a,{href:"../api/config#mock",children:"\u914D\u7F6E"})," \u7AE0\u8282\u4E2D\u67E5\u770B\u3002"]})]})}}r.default=t}}]);
