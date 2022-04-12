"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[119],{9119:function(u,r,s){s.r(r);var o=s(5938),t=s.n(o),h=s(9496),n=s(4637);function l(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};(0,h.useEffect)(function(){if(window.location.hash.length!==0){var e=window.location.hash;window.location.hash="",window.location.hash=e}},[]);var d=a.components||{},i=d.wrapper;return i?(0,n.jsx)(i,t()(t()({},a),{},{children:(0,n.jsx)(c,{})})):c();function c(){var e=Object.assign({h1:"h1",p:"p",h3:"h3",pre:"pre",code:"code"},a.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{id:"api",children:"API"}),`
`,(0,n.jsx)(e.p,{children:"\u4E3A\u65B9\u4FBF\u67E5\u627E\uFF0C\u4EE5\u4E0B\u5185\u5BB9\u901A\u8FC7\u5B57\u6BCD\u6392\u5E8F\u3002"}),`
`,(0,n.jsx)(e.h3,{id:"history",children:"history"}),`
`,(0,n.jsx)(e.p,{children:"\u548C history \u76F8\u5173\u7684\u64CD\u4F5C\uFF0C\u7528\u4E8E\u83B7\u53D6\u5F53\u524D\u8DEF\u7531\u4FE1\u606F\u3001\u6267\u884C\u8DEF\u7531\u8DF3\u8F6C\u3001\u76D1\u542C\u8DEF\u7531\u53D8\u66F4\u3002"}),`
`,(0,n.jsx)(e.p,{children:"\u83B7\u53D6\u5F53\u524D\u8DEF\u7531\u4FE1\u606F\u3002"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-js",children:`import { history } from 'umi';

// // history \u6808\u91CC\u7684\u5B9E\u4F53\u4E2A\u6570
history.length;

// \u5F53\u524D history \u8DF3\u8F6C\u7684 action\uFF0C\u6709 PUSH\u3001REPLACE \u548C POP \u4E09\u79CD\u7C7B\u578B
history.action;

// location \u5BF9\u8C61\uFF0C\u5305\u542B pathname\u3001search \u548C hash
history.location.pathname;
history.location.search;
history.location.hash;
`})}),`
`,(0,n.jsx)(e.p,{children:"\u547D\u4EE4\u5F0F\u8DEF\u7531\u8DF3\u8F6C\u3002"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-js",children:`import { history } from 'umi';

// \u8DF3\u8F6C\u5230\u6307\u5B9A\u8DEF\u7531
history.push('/list');

// \u5E26\u53C2\u6570\u8DF3\u8F6C\u5230\u6307\u5B9A\u8DEF\u7531
history.push('/list?a=b');
history.push({
  pathname: '/list',
  query: {
    a: 'b',
  },
});

// \u8DF3\u8F6C\u5230\u4E0A\u4E00\u4E2A\u8DEF\u7531
history.goBack();
`})}),`
`,(0,n.jsx)(e.p,{children:"\u8DEF\u7531\u76D1\u542C\u3002"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-js",children:`import { history } from 'umi';

const unlisten = history.listen((location, action) => {
  console.log(location.pathname);
});
unlisten();
`})}),`
`,(0,n.jsx)(e.h3,{id:"link",children:"Link"}),`
`,(0,n.jsxs)(e.p,{children:[(0,n.jsx)(e.code,{children:"<Link>"})," \u662F React \u7EC4\u4EF6\uFF0C\u662F\u5E26\u8DEF\u7531\u8DF3\u8F6C\u529F\u80FD\u7684 ",(0,n.jsx)(e.code,{children:"<a>"})," \u5143\u7D20\u3002"]}),`
`,(0,n.jsx)(e.p,{children:"\u7C7B\u578B\u5B9A\u4E49\u5982\u4E0B\u3002"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`declare function Link(props: {
  to: string | Partial<{ pathname: string; search: string; hash: string; }>,
  replace?: boolean;
  state?: boolean;
  reloadDocument?: boolean;
}): React.ReactElement;
`})}),`
`,(0,n.jsx)(e.p,{children:"\u6BD4\u5982\uFF1A"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-js",children:`import { Link } from 'umi';

function IndexPage({ user }) {
  return <Link to={user.id}>{user.name}</Link>;
}
`})}),`
`,(0,n.jsxs)(e.p,{children:[(0,n.jsx)(e.code,{children:"<Link to>"})," \u652F\u6301\u76F8\u5BF9\u8DEF\u5F84\u8DF3\u8F6C\uFF1B",(0,n.jsx)(e.code,{children:"<Link reloadDocument>"})," \u4E0D\u505A\u8DEF\u7531\u8DF3\u8F6C\uFF0C\u7B49\u540C\u4E8E ",(0,n.jsx)(e.code,{children:"<a href>"})," \u7684\u8DF3\u8F6C\u884C\u4E3A\u3002"]}),`
`,(0,n.jsx)(e.h3,{id:"outlet",children:"Outlet"}),`
`,(0,n.jsxs)(e.p,{children:[(0,n.jsx)(e.code,{children:"<Outlet>"})," \u7528\u4E8E\u6E32\u67D3\u7236\u8DEF\u7531\u4E2D\u6E32\u67D3\u5B50\u8DEF\u7531\u3002\u5982\u679C\u7236\u8DEF\u7531\u88AB\u4E25\u683C\u5339\u914D\uFF0C\u4F1A\u6E32\u67D3\u5B50\u8DEF\u7531\u4E2D\u7684 index \u8DEF\u7531\uFF08\u5982\u6709\uFF09\u3002"]}),`
`,(0,n.jsx)(e.p,{children:"\u793A\u4F8B\uFF0C"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-js",children:`import { Outlet } from 'umi';

function Dashboard() {
  return <div><h1>Dashboard</h1><Outlet /></div>;
}
`})}),`
`,(0,n.jsx)(e.h3,{id:"uselocation",children:"useLocation"}),`
`,(0,n.jsxs)(e.p,{children:[(0,n.jsx)(e.code,{children:"useLocation"})," \u8FD4\u56DE\u5F53\u524D location \u5BF9\u8C61\u3002"]}),`
`,(0,n.jsx)(e.p,{children:"\u7C7B\u578B\u5B9A\u4E49\u5982\u4E0B\u3002"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`declare function useLocation(): {
  pathname: string;
  search: string;
  state: unknown;
  key: Key;
};
`})}),`
`,(0,n.jsx)(e.p,{children:"\u4E00\u4E2A\u573A\u666F\u662F\u5728 location change \u65F6\u505A\u4E00\u4E9B side effect \u64CD\u4F5C\uFF0C\u6BD4\u5982 page view \u7EDF\u8BA1\u3002"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-js",children:`import { useLocation } from 'umi';

function App() {
  const location = useLocation();
  React.useEffect(() => {
    ga('send', 'pageview');
  }, [location]);
  // ...
}
`})}),`
`,(0,n.jsx)(e.h3,{id:"usematch",children:"useMatch"}),`
`,(0,n.jsxs)(e.p,{children:[(0,n.jsx)(e.code,{children:"useMatch"})," \u8FD4\u56DE\u4F20\u5165 path \u7684\u5339\u914D\u4FE1\u606F\u3002"]}),`
`,(0,n.jsx)(e.p,{children:"\u7C7B\u578B\u5B9A\u4E49\u5982\u4E0B\u3002"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`declare function useMatch(pattern: {
  path: string;
  caseSensitive?: boolean;
  end?: boolean;
} | string): {
  params: Record<string, string>;
  pathname: string;
  pattern: {
    path: string;
    caseSensitive?: boolean;
    end?: boolean;
  };
};
`})}),`
`,(0,n.jsx)(e.h3,{id:"usenavigate",children:"useNavigate"}),`
`,(0,n.jsx)(e.h3,{id:"useoutlet",children:"useOutlet"}),`
`,(0,n.jsxs)(e.p,{children:[(0,n.jsx)(e.code,{children:"useOutlet"})," \u8FD4\u56DE\u5F53\u524D\u5339\u914D\u7684\u5B50\u8DEF\u7531\u5143\u7D20\uFF0C",(0,n.jsx)(e.code,{children:"<Outlet>"})," \u5185\u90E8\u4F7F\u7528\u7684\u5C31\u662F\u6B64 hook \u3002"]}),`
`,(0,n.jsx)(e.h3,{id:"useparams",children:"useParams"}),`
`,(0,n.jsx)(e.h3,{id:"useresolvedpath",children:"useResolvedPath"}),`
`,(0,n.jsx)(e.h3,{id:"useroutedata",children:"useRouteData"}),`
`,(0,n.jsxs)(e.p,{children:[(0,n.jsx)(e.code,{children:"useRouteData"})," \u8FD4\u56DE\u5F53\u524D\u8DEF\u7531\u7684\u6570\u636E\u3002"]}),`
`,(0,n.jsx)(e.p,{children:"\u7C7B\u578B\u5B9A\u4E49\u5982\u4E0B\u3002"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`declare function useRouteData(): {
  route: Route;
};
`})}),`
`,(0,n.jsx)(e.p,{children:"\u6CE8\u610F\uFF1A\u6B64\u5904 API \u53EF\u80FD\u8FD8\u4F1A\u8C03\u6574\u3002"}),`
`,(0,n.jsx)(e.h3,{id:"useroutes",children:"useRoutes"}),`
`,(0,n.jsx)(e.h3,{id:"usesearchparams",children:"useSearchParams"}),`
`,(0,n.jsxs)(e.p,{children:[(0,n.jsx)(e.code,{children:"useSearchParams"})," \u7528\u4E8E\u8BFB\u53D6\u548C\u4FEE\u6539\u5F53\u524D URL \u7684 query string\u3002\u7C7B\u4F3C React \u7684 ",(0,n.jsx)(e.code,{children:"useState"}),"\uFF0C\u5176\u8FD4\u56DE\u5305\u542B\u4E24\u4E2A\u503C\u7684\u6570\u7EC4\uFF0C\u5F53\u524D URL \u7684 search \u53C2\u6570\u548C\u7528\u4E8E\u66F4\u65B0 search \u53C2\u6570\u7684\u51FD\u6570\u3002"]}),`
`,(0,n.jsx)(e.p,{children:"\u7C7B\u578B\u5B9A\u4E49\u5982\u4E0B\u3002"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`declare function useSearchParams(defaultInit?: URLSearchParamsInit): [
  URLSearchParams,
  (
    nextInit?: URLSearchParamsInit,
    navigateOpts?: : { replace?: boolean; state?: any }
  ) => void
];

type URLSearchParamsInit = 
  | string
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | URLSearchParams;
`})}),`
`,(0,n.jsx)(e.p,{children:"\u793A\u4F8B\u3002"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-js",children:`import React from 'react';
import { useSearchParams } from 'umi';

function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  function handleSubmit(event) {
    event.preventDefault();
    setSearchParams(serializeFormQuery(event.target));
  }
  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
`})})]})}}r.default=l}}]);
