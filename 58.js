"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[58],{6058:function(c,t,a){a.r(t);var d=a(5980),r=a.n(d),l=a(9496),n=a(4637);function i(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};(0,l.useEffect)(function(){if(window.location.hash.length!==0){var e=window.location.hash;window.location.hash="",window.location.hash=e}},[]);var u=s.components||{},o=u.wrapper;return o?(0,n.jsx)(o,r()(r()({},s),{},{children:(0,n.jsx)(_,{})})):_();function _(){var e=Object.assign({h1:"h1",h2:"h2",pre:"pre",code:"code"},s.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{id:"\u624B\u52BF\u5BC6\u7801",children:"\u624B\u52BF\u5BC6\u7801"}),`
`,(0,n.jsx)("img",{height:"300",src:"https://user-images.githubusercontent.com/11746742/68995608-735b4a00-08ca-11ea-8402-2d5229beaceb.png"}),`
`,(0,n.jsx)(e.h2,{id:"install",children:"install"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-bash",children:`// npm
npm install @alitajs/gesture-password-react --save

// yarn
yarn add @alitajs/gesture-password-react
`})}),`
`,(0,n.jsx)(e.h2,{id:"usage",children:"usage"}),`
`,(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-ts",children:`import React from 'react';
import GesturePassword from '@alitajs/gesture-password-react';

export default () => {
  const config = {
    width: 375,
    height: 300,
    onChange: (data: any) => console.log(data), // get gesture password
  };

  return <GesturePassword {...config} />;
};
`})})]})}}t.default=i}}]);
