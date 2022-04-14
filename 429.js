"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[429],{1429:function(u,s,r){r.r(s);var o=r(5980),t=r.n(o),c=r(9496),n=r(4637);function d(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};(0,c.useEffect)(function(){if(window.location.hash.length!==0){var e=window.location.hash;window.location.hash="",window.location.hash=e}},[]);var h=i.components||{},a=h.wrapper;return a?(0,n.jsx)(a,t()(t()({},i),{},{children:(0,n.jsx)(l,{})})):l();function l(){var e=Object.assign({h1:"h1",h2:"h2",p:"p",ol:"ol",li:"li",strong:"strong",h3:"h3",code:"code",pre:"pre",img:"img",h4:"h4",a:"a"},i.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{id:"\u5347\u7EA7\u5230-alita-3",children:"\u5347\u7EA7\u5230 Alita 3"}),`
`,(0,n.jsx)(e.h2,{id:"\u5347\u7EA7\u6B65\u9AA4",children:"\u5347\u7EA7\u6B65\u9AA4"}),`
`,(0,n.jsx)(e.p,{children:"\u5347\u7EA7\u5230 Alita 3 \u53EA\u9700\u8981\u7B80\u5355\u7684\u51E0\u6B65\u64CD\u4F5C\u5C31\u80FD\u5B8C\u6210\uFF0C\u7B80\u5355\u7684\u63CF\u8FF0\u6574\u4E2A\u8FC7\u7A0B\u5C31\u662F - \u201C\u91CD\u88C5\u4F9D\u8D56\uFF0C\u4FEE\u6539\u914D\u7F6E\u201D\uFF1A"}),`
`,(0,n.jsxs)(e.ol,{children:[`
`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.strong,{children:"\u4F9D\u8D56\u5904\u7406"})}),`
`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.strong,{children:"\u975E\u5B98\u65B9\u63D2\u4EF6\u5347\u7EA7"})}),`
`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.strong,{children:"\u914D\u7F6E\u5C42\u8FC1\u79FB"})}),`
`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.strong,{children:"\u4EE3\u7801\u5C42\u4FEE\u6539"})}),`
`]}),`
`,(0,n.jsx)(e.h3,{id:"\u4F9D\u8D56\u5904\u7406",children:"\u4F9D\u8D56\u5904\u7406"}),`
`,(0,n.jsxs)(e.p,{children:["\u9879\u76EE\u7684 ",(0,n.jsx)(e.code,{children:"package.json"})," \u9700\u8981\u5347\u7EA7 alita\u3002"]}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-diff",children:`{
  "devDependencies": {
+   "alita": "^3.0.0",  
-   "alita": "^2.8.0",
  }
}
`})}),`
`,(0,n.jsxs)(e.p,{children:["\u5220\u9664 ",(0,n.jsx)(e.code,{children:"node_module"}),"\uFF0C\u6267\u884C\u4E0B ",(0,n.jsx)(e.code,{children:"npm install"})," \u91CD\u88C5\u4F9D\u8D56\u3002"]}),`
`,(0,n.jsx)(e.h3,{id:"\u4EE3\u7801\u5C42\u4FEE\u6539",children:"\u4EE3\u7801\u5C42\u4FEE\u6539"}),`
`,(0,n.jsx)(e.p,{children:"alita 3 \u4E2D\u5C06 react-router@5 \u5347\u7EA7\u5230 react-router@6\uFF0C\u6240\u4EE5\u8DEF\u7531\u76F8\u5173\u7684\u4E00\u4E9B api \u5B58\u5728\u7740\u4F7F\u7528\u4E0A\u7684\u5DEE\u5F02\u3002"}),`
`,(0,n.jsxs)(e.p,{children:[`props \u9ED8\u8BA4\u4E3A\u7A7A\u5BF9\u8C61\uFF0C\u4EE5\u4E0B\u5C5E\u6027\u90FD\u4E0D\u80FD\u76F4\u63A5\u4ECE props \u4E2D\u53D6\u51FA
`,(0,n.jsx)(e.img,{src:"https://img.alicdn.com/imgextra/i4/O1CN01H9ScQv21ymaLkwZ8p_!!6000000007054-2-tps-1210-374.png",alt:"image"})]}),`
`,(0,n.jsx)(e.h4,{id:"children",children:"children"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:`import { Outlet } from 'alita';
<Outlet/>
`})}),`
`,(0,n.jsx)(e.p,{children:"\u4E3B\u8981\u5728\u5168\u5C40 layout \u4E2D\u9700\u8981\u4FEE\u6539"}),`
`,(0,n.jsxs)(e.p,{children:["\u5982 ",(0,n.jsx)(e.code,{children:"layouts/index.tsx"}),"\uFF1A"]}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-diff",children:`import React from 'react';
+ import { Outlet } from 'alita';

export default function Layout(props) {
  return (
    <div>
-      { props.children }
+      <Outlet />
    </div>
  );
}
`})}),`
`,(0,n.jsx)(e.h4,{id:"history",children:"history"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-diff",children:`+ import { history } from 'alita';

export default function Page(props) {
  return (
    <div onClick={()=>{
-          props.history.push('list'); 
+          history.push('list'); 
    }}>
    </div>
  );
}
`})}),`
`,(0,n.jsx)(e.h4,{id:"location",children:"location"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-diff",children:`+ import { history } from 'alita';
export default function Page(props) {
  return (
    <div>
-     { props.location }
+     { history.location }
    </div>
  );
}
`})}),`
`,(0,n.jsx)(e.p,{children:"\u6216\u8005"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-diff",children:`+ import { useLocation } from 'alita';
export default function Page(props) {
+    let location = useLocation();
  return (
    <div>
-     { props.location }
+     { location }
    </div>
  );
}
`})}),`
`,(0,n.jsx)(e.h4,{id:"match",children:"match"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-diff",children:`+ import { useMatch } from 'alita';
export default function Page(props) {
+ const match = useMatch({ path: 'list/search/:type' });
  return (
    <div>
-     { props.match }
+     { location }
    </div>
  );
}
`})}),`
`,(0,n.jsx)(e.p,{children:"\u9700\u8981\u6CE8\u610F match \u6570\u636E\u7684\u5DEE\u5F02\uFF1A"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`// match v5
isExact: true
params: {}
path: "/users/abc"
url: "/users/abc"

// match v6
params:{  }
pathname: "/list/search/articles"
pathnameBase: "/list/search/articles"
pattern: {path: 'list/search/:type'}
`})}),`
`,(0,n.jsxs)(e.p,{children:["\u66F4\u591A\u6539\u52A8\u548C api \u53D8\u66F4\uFF0C\u8BF7\u67E5\u9605 ",(0,n.jsx)(e.a,{href:"https://reactrouter.com/docs/en/v6/api#uselocation",children:"react-router@6"})]}),`
`,(0,n.jsxs)(e.p,{children:["\u5B8C\u6210\u4EE5\u4E0A\u64CD\u4F5C\u540E\uFF0C\u6267\u884C\u4E0B ",(0,n.jsx)(e.code,{children:"alita dev"}),"\uFF0C\u8BBF\u95EE ",(0,n.jsx)(e.a,{href:"http://localhost:8000",children:"http://localhost:8000"}),"\uFF0C\u8BF7\u9A8C\u8BC1\u6240\u6709\u529F\u80FD\u90FD\u7B26\u5408\u9884\u671F\u3002"]}),`
`,(0,n.jsx)(e.p,{children:"\u5982\u679C\u4F60\u7684\u9879\u76EE\u65E0\u6CD5\u6B63\u5E38\u542F\u52A8\uFF0C\u4F60\u53EF\u80FD\u8FD8\u9700\u8981\u505A\u5982\u4E0B\u64CD\u4F5C\uFF1A"}),`
`,(0,n.jsx)(e.h2,{id:"\u914D\u7F6E\u53D8\u66F4",children:"\u914D\u7F6E\u53D8\u66F4"}),`
`,(0,n.jsx)(e.p,{children:"TODO"}),`
`,(0,n.jsx)(e.h2,{id:"faq",children:"FAQ"}),`
`,(0,n.jsx)(e.h3,{id:"location-\u4E2D\u7684-query-\u627E\u4E0D\u5230",children:"location \u4E2D\u7684 query \u627E\u4E0D\u5230\uFF1F"}),`
`,(0,n.jsxs)(e.p,{children:["location \u4E2D\u7684 query \u4E0D\u518D\u652F\u6301\u4E86\uFF0C\u540E\u7EED\u63A8\u8350\u7528 ",(0,n.jsx)(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams",children:"search"})]}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-diff",children:`- const { query } = history.location;
+ import { parse } from 'querystring';
+ const query = parse(history.location.search);
`})}),`
`,(0,n.jsx)(e.h3,{id:"d-\u6587\u4EF6\u627E\u4E0D\u5230\u6216\u8005\u5B83\u7684\u5F15\u7528\u627E\u4E0D\u5230",children:"*.d \u6587\u4EF6\u627E\u4E0D\u5230\uFF0C\u6216\u8005\u5B83\u7684\u5F15\u7528\u627E\u4E0D\u5230"}),`
`,(0,n.jsxs)(e.p,{children:["\u5728 alita@3 \u4E2D\u901A\u8FC7 ",(0,n.jsx)(e.code,{children:"import"})," \u4F1A\u81EA\u52A8\u627E\u5230\u540C\u540D\u7684 ",(0,n.jsx)(e.code,{children:".d.ts"})," \u6587\u4EF6\uFF0C\u5982\uFF1A"]}),`
`,(0,n.jsx)(e.p,{children:(0,n.jsx)(e.code,{children:"import { ButtonType } from './button';"})}),`
`,(0,n.jsxs)(e.p,{children:["\u5982\u679C\u5B58\u5728 ",(0,n.jsx)(e.code,{children:".button.d.ts"})," \u6587\u4EF6\uFF0C\u5728 alita@3 \u4E2D\u4F1A\u6B63\u786E\u6267\u884C\uFF0C\u4F46\u662F\u5728 alita@4 \u4E2D\u4F1A\u53D1\u751F\u62A5\u9519\uFF0C\u4F60\u53EF\u80FD\u9700\u8981\u66F4\u52A0\u89C4\u8303\u7684\u5F15\u7528\u7C7B\u578B\u3002"]}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-diff",children:`- import { ButtonType } from './button';
+ import type { ButtonType } from './button.d';
`})})]})}}s.default=d}}]);
