"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[136],{3587:function(c,t,a){a.r(t);var i=a(5938),r=a.n(i),l=a(9496),e=a(4637);function u(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};(0,l.useEffect)(function(){if(window.location.hash.length!==0){var n=window.location.hash;window.location.hash="",window.location.hash=n}},[]);var _=s.components||{},o=_.wrapper;return o?(0,e.jsx)(o,r()(r()({},s),{},{children:(0,e.jsx)(d,{})})):d();function d(){var n=Object.assign({hr:"hr",h2:"h2",h1:"h1",pre:"pre",code:"code"},s.components);return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(n.hr,{}),`
`,(0,e.jsx)(n.h2,{id:"title-\u624B\u52BF\u5BC6\u7801",children:"title: '\u624B\u52BF\u5BC6\u7801'"}),`
`,(0,e.jsx)(n.h1,{id:"gesture-password-\u624B\u52BF\u5BC6\u7801",children:"Gesture Password (\u624B\u52BF\u5BC6\u7801)"}),`
`,(0,e.jsx)("img",{height:"300",src:"https://user-images.githubusercontent.com/11746742/68995608-735b4a00-08ca-11ea-8402-2d5229beaceb.png"}),`
`,(0,e.jsx)(n.h2,{id:"install",children:"install"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-bash",children:`// npm
npm install @alitajs/gesture-password-react --save

// yarn
yarn add @alitajs/gesture-password-react
`})}),`
`,(0,e.jsx)(n.h2,{id:"usage",children:"usage"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`import React from 'react';
import GesturePassword from '@alitajs/gesture-password-react';

export default () => {
  const config = {
    width: 375,
    height: 300,
    onChange: (data: any) => console.log(data), // get gesture password
  };

  return <GesturePassword {...config} />;
};
`})})]})}}t.default=u}}]);
