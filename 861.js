"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[861],{4019:function(p,i,s){s.r(i);var t=s(5938),l=s.n(t),c=s(9496),e=s(4637);function h(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};(0,c.useEffect)(function(){if(window.location.hash.length!==0){var n=window.location.hash;window.location.hash="",window.location.hash=n}},[]);var o=a.components||{},r=o.wrapper;return r?(0,e.jsx)(r,l()(l()({},a),{},{children:(0,e.jsx)(d,{})})):d();function d(){var n=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",a:"a"},a.components);return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(n.h1,{id:"\u547D\u4EE4\u884C",children:"\u547D\u4EE4\u884C"}),`
`,(0,e.jsx)(n.p,{children:"\u4E3A\u65B9\u4FBF\u67E5\u627E\uFF0C\u4EE5\u4E0B\u547D\u4EE4\u901A\u8FC7\u5B57\u6BCD\u6392\u5E8F\u3002"}),`
`,(0,e.jsx)(n.p,{children:"TODO: \u8FD9\u4E2A\u6587\u6863\u8FD8\u9700\u8981\u8865\u5145"}),`
`,(0,e.jsx)(n.h2,{id:"build",children:"build"}),`
`,(0,e.jsx)(n.p,{children:"\u6784\u5EFA\u9879\u76EE\uFF0C\u9002\u7528\u4E8E\u751F\u4EA7\u73AF\u5883\u7684\u90E8\u7F72\u3002"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-bash",children:`$ alita build
`})}),`
`,(0,e.jsx)(n.h2,{id:"dev",children:"dev"}),`
`,(0,e.jsx)(n.p,{children:"\u542F\u52A8\u672C\u5730\u5F00\u53D1\u670D\u52A1\u5668\uFF0C\u8FDB\u884C\u9879\u76EE\u7684\u5F00\u53D1\u4E0E\u8C03\u8BD5\u3002"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-bash",children:`$ alita dev
ready - App listening at http://127.0.0.1:8000
event - compiled successfully in 1051 ms (416 modules)
`})}),`
`,(0,e.jsx)(n.h2,{id:"generate",children:"generate"}),`
`,(0,e.jsxs)(n.p,{children:["\u7528\u4E8E\u589E\u91CF\u751F\u6210\u6587\u4EF6\u6216\u542F\u7528\u529F\u80FD\uFF0C\u547D\u4EE4\u884C\u522B\u540D\u662F ",(0,e.jsx)(n.code,{children:"g"}),"\u3002"]}),`
`,(0,e.jsx)(n.p,{children:"\u4E0D\u52A0\u4EFB\u4F55\u53C2\u6570\u65F6\u4F1A\u7ED9\u4EA4\u4E92\u5F0F\u7684\u751F\u6210\u5668\u9009\u62E9\u3002"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-bash",children:`$ alita g
# \u6216
$ alita generate
? Pick generator type \u203A - Use arrow-keys. Return to submit.
\u276F   Create Pages -- Create a alita page by page name
    Enable Prettier -- Enable Prettier
`})}),`
`,(0,e.jsx)(n.p,{children:"\u4E5F\u53EF\u4EE5\u6307\u5B9A\u53C2\u6570\u3002"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-bash",children:`# \u751F\u6210\u8DEF\u7531\u6587\u4EF6
$ alita g pages index
`})}),`
`,(0,e.jsx)(n.h2,{id:"setup",children:"setup"}),`
`,(0,e.jsxs)(n.p,{children:["\u521D\u59CB\u5316\u9879\u76EE\uFF0C\u4F1A\u505A\u4E34\u65F6\u6587\u4EF6\u7684\u751F\u6210\u7B49\u64CD\u4F5C\u3002\u901A\u5E38\u5728 package.json \u7684 ",(0,e.jsx)(n.code,{children:"scripts.postinstall"})," \u91CC\u8BBE\u7F6E\u3002"]}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-bash",children:`{
  "scripts": { "postinstall": "alita setup" }
}
`})}),`
`,(0,e.jsx)(n.h2,{id:"verifycommit",children:"verifyCommit"}),`
`,(0,e.jsxs)(n.p,{children:["\u9A8C\u8BC1 commit message \u4FE1\u606F\uFF0C\u901A\u5E38\u548C ",(0,e.jsx)(n.a,{href:"https://github.com/typicode/husky",children:"husky"})," \u642D\u914D\u4F7F\u7528\u3002"]}),`
`,(0,e.jsxs)(n.p,{children:["\u6BD4\u5982\u5728 ",(0,e.jsx)(n.code,{children:".husky/commit-msg"})," \u505A\u5982\u4E0B\u914D\u7F6E\uFF0C"]}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-bash",children:`#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install alita verify-ommit $1
`})}),`
`,(0,e.jsx)(n.h2,{id:"version",children:"version"}),`
`,(0,e.jsxs)(n.p,{children:["\u67E5\u770B alita \u7248\u672C\uFF0C\u7B49\u540C\u4E8E ",(0,e.jsx)(n.code,{children:"alita -v"}),"\u3002"]}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-bash",children:`$ alita version
3.0.0
`})})]})}}i.default=h}}]);
