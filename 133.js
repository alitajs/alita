"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[133],{8133:function(h,a,t){t.r(a);var l=t(5938),r=t.n(l),u=t(9496),e=t(4637);function c(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};(0,u.useEffect)(function(){if(window.location.hash.length!==0){var n=window.location.hash;window.location.hash="",window.location.hash=n}},[]);var d=s.components||{},o=d.wrapper;return o?(0,e.jsx)(o,r()(r()({},s),{},{children:(0,e.jsx)(i,{})})):i();function i(){var n=Object.assign({hr:"hr",h1:"h1",pre:"pre",code:"code",h2:"h2",p:"p",a:"a",img:"img"},s.components);return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(n.hr,{}),`
`,(0,e.jsx)(n.hr,{}),`
`,(0,e.jsx)(n.h1,{id:"\u79FB\u52A8\u7AEF\u7684\u8868\u5355\u65B9\u6848",children:"\u79FB\u52A8\u7AEF\u7684\u8868\u5355\u65B9\u6848"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-bash",children:`yarn add @alitajs/dform
`})}),`
`,(0,e.jsx)(n.h2,{id:"\u8868\u5355\u7EC4\u4EF6",children:"\u8868\u5355\u7EC4\u4EF6"}),`
`,(0,e.jsx)(n.p,{children:"\u5C01\u88C5\u5E38\u7528\u7684\u8868\u5355\u7EC4\u4EF6\uFF0C\u5C06 antd-mobile \u7684\u7EC4\u4EF6\uFF0C\u6539\u6210\u53D7\u63A7\u7EC4\u4EF6\u3002"}),`
`,(0,e.jsx)(n.p,{children:"\u5B98\u65B9\u7528\u6CD5"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`<InputItem
  {...getFieldProps('autofocus')}
  clear
  placeholder="auto focus"
  ref={el => (this.autoFocusInst = el)}
>
  \u6807\u9898
</InputItem>
`})}),`
`,(0,e.jsx)(n.p,{children:"\u4F7F\u7528@alitajs/dform"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`<NomarInput name="autofocus" placeholder="auto focus" title="\u6807\u9898" />
`})}),`
`,(0,e.jsx)(n.h2,{id:"\u52A8\u6001\u8868\u5355",children:"\u52A8\u6001\u8868\u5355"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`<List renderHeader={() => 'Customize to focus'}>
  <InputItem
    {...getFieldProps('autofocus')}
    clear
    placeholder="auto focus"
    ref={el => (this.autoFocusInst = el)}
  >
    \u6807\u9898
  </InputItem>
  <Picker
    extra="\u8BF7\u9009\u62E9(\u53EF\u9009)"
    data={district}
    title="Areas"
    {...getFieldProps('district', {
      initialValue: ['340000', '341500', '341502'],
      rules: [{ required: true, message: \`\u8BF7\u8F93\u5165\${title}\` }],
    })}
    onOk={e => console.log('ok', e)}
    onDismiss={e => console.log('dismiss', e)}
  >
    <List.Item arrow="horizontal">Multiple & cascader</List.Item>
  </Picker>
</List>
`})}),`
`,(0,e.jsx)(n.p,{children:"\u4F7F\u7528@alitajs/dform"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`const formData = [
  {
    type: 'input',
    fieldProps: 'autofocus',
    required: true,
    placeholder: 'auto focus',
    title: '\u6807\u9898',
    inputType: 'text',
  },
  {
    type: 'select',
    fieldProps: 'district',
    required: true,
    placeholder: '\u8BF7\u9009\u62E9(\u53EF\u9009)',
    title: 'Multiple & cascader',
    data: district,
  },
];
<DynamicForm data={formData} />;
`})}),`
`,(0,e.jsx)(n.h2,{id:"\u53EF\u89C6\u5316\u7F16\u8F91\u65B9\u6848",children:"\u53EF\u89C6\u5316\u7F16\u8F91\u65B9\u6848"}),`
`,(0,e.jsxs)(n.p,{children:["\u65B9\u6848\u7075\u611F\u6765\u6E90\u4E8E ",(0,e.jsx)(n.a,{href:"https://github.com/antvis/ava",children:"ava"})," \u7684 ",(0,e.jsx)(n.code,{children:"autoChart"}),"\uFF0C\u7528\u6CD5\u548C\u89E6\u53D1\u6761\u4EF6\u4E00\u81F4\uFF0C\u90FD\u662F data \u4E3A\u7A7A\u4E14\u5728\u5F00\u53D1\u72B6\u6001\u7684\u65F6\u5019\uFF0C\u663E\u793A\u7F16\u8F91\u8868\u5355\u6309\u94AE\u3002\u7528\u6237\u53EF\u4EE5\u5F3A\u5236\u8BBE\u5B9A ",(0,e.jsx)(n.code,{children:"isDev"})," \u6765\u5728\u4EFB\u610F\u73AF\u5883\u4E2D\u4F7F\u7528\u3002"]}),`
`,(0,e.jsx)(n.p,{children:(0,e.jsx)(n.img,{src:"https://user-images.githubusercontent.com/11746742/72713840-b37bc900-3ba8-11ea-8a94-d19cdd39be53.gif",alt:"2020-01-20 17 16 23"})}),`
`,(0,e.jsxs)(n.p,{children:["\u66F4\u591A\u8BE6\u60C5\uFF0C\u8BF7\u70B9\u51FB",(0,e.jsx)(n.a,{href:"https://dform.alitajs.com/",children:"dform \u5B98\u7F51"})," \u6B22\u8FCE\u4EA4\u6D41\u3002\u611F\u8C22\uFF01"]})]})}}a.default=c}}]);
