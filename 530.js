"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[530],{6861:function(m,r,s){s.r(r);var t=s(5938),i=s.n(t),c=s(8821),o=s(9496),n=s(4637);function a(){var h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};(0,o.useEffect)(function(){if(window.location.hash.length!==0){var e=window.location.hash;window.location.hash="",window.location.hash=e}},[]);var j=h.components||{},l=j.wrapper;return l?(0,n.jsx)(l,i()(i()({},h),{},{children:(0,n.jsx)(d,{})})):d();function d(){var e=Object.assign({h1:"h1",p:"p",h2:"h2",a:"a",pre:"pre",code:"code",ol:"ol",li:"li"},h.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{id:"\u5F00\u53D1\u73AF\u5883",children:"\u5F00\u53D1\u73AF\u5883"}),`
`,(0,n.jsx)(e.p,{children:"\u672C\u6587\u5C06\u5E26\u9886\u4F60\u4ECE\u96F6\u5F00\u59CB\u5728\u672C\u5730\u642D\u5EFA\u4E00\u4E2A Umi.js \u9879\u76EE\u7684\u5F00\u53D1\u73AF\u5883\u3002"}),`
`,(0,n.jsx)(e.h2,{id:"nodejs",children:"Nodejs"}),`
`,(0,n.jsxs)(e.p,{children:["Umi.js \u9700\u8981\u4F7F\u7528 ",(0,n.jsx)(e.a,{href:"https://nodejs.org/zh-cn/",children:"Node.js"})," \u6765\u8FDB\u884C\u5F00\u53D1\uFF0C\u56E0\u6B64\u8BF7\u5148\u786E\u4FDD\u7535\u8111\u5DF2\u7ECF\u5B89\u88C5\u4E86 Node.js \u4E14\u7248\u672C\u5728 14 \u4EE5\u4E0A\u3002"]}),`
`,(0,n.jsx)(c.v0,{emoji:"\u{1F4A1}",children:(0,n.jsxs)(e.p,{children:["\u5982\u679C\u4F60\u662F macOS \u7528\u6237\uFF0C\u5EFA\u8BAE\u4F7F\u7528 ",(0,n.jsx)(e.a,{href:"https://github.com/nvm-sh/nvm",children:"nvm"}),` \u6765\u7BA1\u7406 Node.js \u7684\u7248\u672C\uFF1B
Windows \u7528\u6237\u5EFA\u8BAE\u4F7F\u7528 `,(0,n.jsx)(e.a,{href:"https://github.com/coreybutler/nvm-windows",children:"nvm-windows"})," \u3002"]})}),`
`,(0,n.jsxs)(e.p,{children:["\u672C\u6587\u5C06\u4EE5 macOS \u6216 Linux \u73AF\u5883\u4E0B\u4F7F\u7528 ",(0,n.jsx)(e.a,{href:"https://github.com/nvm-sh/nvm",children:"nvm"})," \u7684\u65B9\u5F0F\u5B89\u88C5 ",(0,n.jsx)(e.a,{href:"https://nodejs.org/zh-cn/",children:"Node.js"})," \uFF1A"]}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-bash",children:`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm -v

0.39.1
`})}),`
`,(0,n.jsxs)(e.p,{children:["\u5B89\u88C5\u5B8C\u6210 ",(0,n.jsx)(e.a,{href:"https://github.com/nvm-sh/nvm",children:"nvm"})," \u4E4B\u540E\uFF0C\u4F7F\u7528\u4EE5\u4E0B\u547D\u4EE4\u6765\u5B89\u88C5 ",(0,n.jsx)(e.a,{href:"https://nodejs.org/zh-cn/",children:"Node.js"})," \uFF1A"]}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-bash",children:`nvm install 16
nvm use 16
`})}),`
`,(0,n.jsx)(e.p,{children:"\u5B89\u88C5\u5B8C\u6210\u540E\uFF0C\u4F7F\u7528\u4EE5\u4E0B\u547D\u4EE4\u6765\u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F\u5E76\u4E14\u5B89\u88C5\u4E86\u6B63\u786E\u7684\u7248\u672C\uFF1A"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-bash",children:`node -v

v16.14.0
`})}),`
`,(0,n.jsx)(e.h2,{id:"\u4F9D\u8D56\u7BA1\u7406",children:"\u4F9D\u8D56\u7BA1\u7406"}),`
`,(0,n.jsxs)(e.p,{children:["Node \u5B89\u88C5\u5B8C\u6210\u540E\u4F1A\u81EA\u5E26 ",(0,n.jsx)(e.a,{href:"https://www.npmjs.com/",children:"npm"})," \u4F9D\u8D56\u7BA1\u7406\u5DE5\u5177\uFF0C\u4F46 Umi.js \u63A8\u8350\u4F7F\u7528 ",(0,n.jsx)(e.a,{href:"https://pnpm.io/",children:"pnpm"})," \u6765\u7BA1\u7406\u4F9D\u8D56\uFF1A"]}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-bash",children:`curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
`})}),`
`,(0,n.jsx)(e.p,{children:"\u5B89\u88C5\u5B8C\u6210\u540E\uFF0C\u53EF\u4EE5\u7528\u4EE5\u4E0B\u547D\u4EE4\u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F\uFF1A"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-bash",children:`pnpm -v

6.27.1
`})}),`
`,(0,n.jsx)(e.h2,{id:"ide",children:"IDE"}),`
`,(0,n.jsxs)(e.p,{children:["\u5B89\u88C5\u5B8C ",(0,n.jsx)(e.a,{href:"https://nodejs.org/zh-cn/",children:"Node.js"})," \u53CA ",(0,n.jsx)(e.a,{href:"https://pnpm.io/",children:"pnpm"})," (\u6216\u5176\u4ED6\u4F9D\u8D56\u7BA1\u7406\u5DE5\u5177) \u540E\uFF0C\u4F60\u9700\u8981\u4E00\u4E2A\u81EA\u5DF1\u4E60\u60EF\u7684 IDE \u6216\u6587\u672C\u7F16\u8F91\u5668\u6765\u7F16\u5199\u4EE3\u7801\u3002\u5982\u679C\u4F60\u8FD8\u6CA1\u6709\u4E60\u60EF\u7684 IDE\uFF0C\u53EF\u4EE5\u4ECE\u4E0B\u65B9\u6311\u9009\u4E00\u4E2A\uFF1A"]}),`
`,(0,n.jsxs)(e.ol,{children:[`
`,(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.a,{href:"https://code.visualstudio.com/",children:"Visual Studio Code"})," (\u63A8\u8350)"]}),`
`,(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.a,{href:"https://www.jetbrains.com/webstorm/",children:"WebStorm"})," (\u63A8\u8350)"]}),`
`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.a,{href:"https://www.jetbrains.com/idea/",children:"IntelliJ IDEA"})}),`
`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.a,{href:"https://www.sublimetext.com/",children:"Sublime Text"})}),`
`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.a,{href:"https://atom.io/",children:"Atom"})}),`
`]}),`
`,(0,n.jsx)(e.h2,{id:"\u4E0B\u4E00\u6B65",children:"\u4E0B\u4E00\u6B65"}),`
`,(0,n.jsxs)(e.p,{children:["\u606D\u559C\u4F60\uFF01\u4F60\u7684\u672C\u5730\u73AF\u5883\u5DF2\u7ECF\u51C6\u5907\u597D\u5F00\u59CB\u5F00\u53D1 Umi.js \u9879\u76EE\u4E86\uFF0C\u9A6C\u4E0A\u524D\u5F80 ",(0,n.jsx)(e.a,{href:"boilerplate",children:"\u811A\u624B\u67B6"})," \u5B66\u4E60\u5982\u4F55\u4F7F\u7528 Umi.js \u811A\u624B\u67B6\u5FEB\u901F\u542F\u52A8\u4E00\u4E2A\u9879\u76EE\u5427 \u{1F389}"]})]})}}r.default=a}}]);
