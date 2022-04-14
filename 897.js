"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[897],{1897:function(j,r,s){s.r(r);var c=s(5980),d=s.n(c),a=s(9496),e=s(4637);function h(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};(0,a.useEffect)(function(){if(window.location.hash.length!==0){var n=window.location.hash;window.location.hash="",window.location.hash=n}},[]);var o=t.components||{},l=o.wrapper;return l?(0,e.jsx)(l,d()(d()({},t),{},{children:(0,e.jsx)(i,{})})):i();function i(){var n=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",pre:"pre",img:"img",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",blockquote:"blockquote",h3:"h3",ol:"ol",li:"li"},t.components);return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(n.h1,{id:"\u5217\u8868\u9875\u9762\u52A0\u8F7D\u66F4\u591A",children:"\u5217\u8868\u9875\u9762\uFF08\u52A0\u8F7D\u66F4\u591A\uFF09"}),`
`,(0,e.jsxs)(n.p,{children:["\u79FB\u52A8\u7AEF\u7684\u52A0\u8F7D\u66F4\u591A\u9875\u9762\u5C01\u88C5\uFF0C\u7B80\u5316\u4E1A\u52A1\u6D41\u7A0B\u3002\u4F7F\u7528\u4E86 ",(0,e.jsx)(n.code,{children:"@umijs/hooks"})," \u7684 ",(0,e.jsx)(n.code,{children:"useLoadMore"}),"\u3002"]}),`
`,(0,e.jsx)(n.h2,{id:"\u6700\u7B80-demo",children:"\u6700\u7B80 Demo"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`import LoadMoreListView from '@alitajs/list-view';
import { request } from 'alita';

export async function query(data): Promise<any> {
  return request('/api/list', { data });
}

const IndexPage: FC = () => {
  const renderRow = rowData => (
    <div style={{ height: 500 }}>{rowData.title}</div>
  );
  return (
    <LoadMoreListView
      requestFunc={query}
      renderRow={renderRow}
      requestParams={{
        abc: '123',
        token: 'alita',
        pageSize: 0,
        offset: 0,
      }}
    />
  );
};

export default IndexPage;
`})}),`
`,(0,e.jsx)(n.p,{children:(0,e.jsx)(n.img,{src:"https://github.com/alitajs/list-view/raw/master/src/assets/showgif.gif",alt:""})}),`
`,(0,e.jsx)(n.h2,{id:"api",children:"API"}),`
`,(0,e.jsxs)(n.table,{children:[(0,e.jsx)(n.thead,{children:(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.th,{children:"\u53C2\u6570"}),(0,e.jsx)(n.th,{children:"\u8BF4\u660E"}),(0,e.jsx)(n.th,{children:"\u7C7B\u578B"}),(0,e.jsx)(n.th,{children:"\u9ED8\u8BA4\u503C"}),(0,e.jsx)(n.th,{children:"\u662F\u5426\u5FC5\u586B"})]})}),(0,e.jsxs)(n.tbody,{children:[(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"height"}),(0,e.jsx)(n.td,{children:"\u6EDA\u52A8\u5BB9\u5668\u7684\u9AD8\u5EA6"}),(0,e.jsx)(n.td,{children:"string"}),(0,e.jsx)(n.td,{children:"\u5145\u6EE1\u5269\u4F59\u5BB9\u5668\u9AD8\u5EA6"}),(0,e.jsx)(n.td,{children:"\u5426"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"alias"}),(0,e.jsx)(n.td,{children:"\u8BF7\u6C42\u53C2\u6570\u7684\u522B\u540D"}),(0,e.jsx)(n.td,{children:"AliasProps"}),(0,e.jsx)(n.td,{children:"\u89C1\u8868\u683C\u4E0B\u65B9\u5907\u6CE8"}),(0,e.jsx)(n.td,{children:"\u5426"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"requestFunc"}),(0,e.jsx)(n.td,{children:"\u8BF7\u6C42\u6267\u884C\u51FD\u6570"}),(0,e.jsx)(n.td,{children:"\u5F02\u6B65\u51FD\u6570"}),(0,e.jsx)(n.td,{children:"\u65E0"}),(0,e.jsx)(n.td,{children:"\u662F"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"noData"}),(0,e.jsx)(n.td,{children:"\u7A7A\u5217\u8868\u5C55\u793A\u5185\u5BB9"}),(0,e.jsx)(n.td,{children:"string or node"}),(0,e.jsx)(n.td,{children:"''"}),(0,e.jsx)(n.td,{children:"\u5426"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"requestParams"}),(0,e.jsx)(n.td,{children:"\u8BF7\u6C42\u53C2\u6570"}),(0,e.jsx)(n.td,{children:"object"}),(0,e.jsx)(n.td,{}),(0,e.jsx)(n.td,{children:"\u5426"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"renderRow"}),(0,e.jsx)(n.td,{children:"\u4ECE\u6570\u636E\u6E90(data source)\u4E2D\u63A5\u53D7\u4E00\u6761\u6570\u636E\uFF0C\u4EE5\u53CA\u5B83\u548C\u5B83\u6240\u5728 section \u7684 ID\u3002\u8FD4\u56DE\u4E00\u4E2A\u53EF\u6E32\u67D3\u7684\u7EC4\u4EF6\u6765\u4E3A\u8FD9\u884C\u6570\u636E\u8FDB\u884C\u6E32\u67D3\u3002\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u53C2\u6570\u4E2D\u7684\u6570\u636E\u5C31\u662F\u653E\u8FDB\u6570\u636E\u6E90\u4E2D\u7684\u6570\u636E\u672C\u8EAB\uFF0C\u4E0D\u8FC7\u4E5F\u53EF\u4EE5\u63D0\u4F9B\u4E00\u4E9B\u8F6C\u6362\u5668\u3002\u5982\u679C\u67D0\u4E00\u884C\u6B63\u5728\u88AB\u9AD8\u4EAE\uFF08\u901A\u8FC7\u8C03\u7528 highlightRow \u51FD\u6570\uFF09\uFF0CListView \u4F1A\u5F97\u5230\u76F8\u5E94\u7684\u901A\u77E5\u3002"}),(0,e.jsx)(n.td,{children:"(rowData, sectionID, rowID, highlightRow) => renderable"}),(0,e.jsx)(n.td,{children:"\u65E0"}),(0,e.jsx)(n.td,{children:"\u662F"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"renderFooter"}),(0,e.jsx)(n.td,{children:"\u91CD\u65B0\u6E32\u67D3\u9875\u811A\uFF0C\u4F1A\u4F20\u5165\u4E09\u4E2A\u53C2\u6570\uFF0C\u8868\u793A\u5217\u8868\u9875\u9762\u7684\u5F53\u524D\u72B6\u6001\u3002"}),(0,e.jsx)(n.td,{children:"( noMore, loadingMore, loadMore?) => React.ReactElement"}),(0,e.jsx)(n.td,{children:"''"}),(0,e.jsx)(n.td,{children:"\u5426"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"isTabsPage"}),(0,e.jsx)(n.td,{children:"\u5728 Tabs \u9875\u9762\u4E2D\u4F7F\u7528\u65F6\u9700\u8981\u914D\u7F6E\uFF0C\u9AD8\u5EA6\u9700\u8981\u51CF\u53BB\u5E95\u90E8 tabs \u9AD8\u5EA6"}),(0,e.jsx)(n.td,{children:"false"}),(0,e.jsx)(n.td,{children:"\u5426"}),(0,e.jsx)(n.td,{})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"onChange"}),(0,e.jsx)(n.td,{children:"\u6570\u636E\u53D8\u5316\u65F6\u56DE\u8C03\uFF0C\u4F60\u53EF\u4EE5\u901A\u8FC7\u5B83\u53D6\u5F97\u5F53\u524D\u5217\u8868\u7684\u6240\u6709\u503C"}),(0,e.jsx)(n.td,{children:"(data)=>void"}),(0,e.jsx)(n.td,{children:"\u5426"}),(0,e.jsx)(n.td,{})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"autoFullViewPort"}),(0,e.jsxs)(n.td,{children:["\u9996\u5C4F\u6570\u636E\u4E0D\u80FD\u8986\u76D6\u5168\u5C4F\u65F6\uFF0C\u81EA\u52A8\u52A0\u8F7D\u66F4\u591A\u586B\u5145\u5C4F\u5E55\uFF0C\u89E3\u51B3\u56E0\u9996\u6B21\u52A0\u8F7D\u6570\u636E\u6761\u76EE\u592A\u5C11\u5BFC\u81F4\u65E0\u6CD5\u89E6\u53D1\u52A0\u8F7D\u66F4\u591A\u7684 bug\uFF0C",(0,e.jsx)(n.code,{children:"\u7248\u672C0.3.7"}),"\u4EE5\u540E\u652F\u6301\u3002"]}),(0,e.jsx)(n.td,{children:"boolean"}),(0,e.jsx)(n.td,{children:"\u5426"}),(0,e.jsx)(n.td,{children:"\u5426"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"startPage"}),(0,e.jsxs)(n.td,{children:["\u8D77\u59CB\u52A0\u8F7D\u9875\uFF0C\u5982\u679C",(0,e.jsx)(n.code,{children:"startPage"}),"\u8BBE\u7F6E\u4E3A 0, \u5237\u65B0\u65F6\u4F1A\u5C06",(0,e.jsx)(n.code,{children:"pageNum"}),"\u91CD\u7F6E\u4E3A 0\uFF0C ",(0,e.jsx)(n.code,{children:"\u7248\u672C1.0.1-beta"}),"\u4EE5\u540E\u652F\u6301\u3002"]}),(0,e.jsx)(n.td,{children:"number"}),(0,e.jsx)(n.td,{children:"1"}),(0,e.jsx)(n.td,{children:"\u5426"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"\u5176\u4ED6 ListView \u53C2\u6570"}),(0,e.jsx)(n.td,{children:"\u80FD\u63A5\u6536 ListView \u7684\u5176\u4ED6\u53C2\u6570\uFF0C\u8BF7\u6CE8\u610F\u4E0D\u8981\u8BBE\u7F6E 'onEndReached'\u3001 'dataSource'"}),(0,e.jsx)(n.td,{children:"\u65E0"}),(0,e.jsx)(n.td,{children:"\u5426"}),(0,e.jsx)(n.td,{})]})]})]}),`
`,(0,e.jsxs)(n.blockquote,{children:[`
`,(0,e.jsxs)(n.p,{children:["\u5982\u679C\u4E0D\u9700\u8981\u4E0B\u62C9\u5237\u65B0\u7684\u529F\u80FD\uFF0C\u53EF\u4EE5\u8BBE\u7F6E pullToRefresh=",(0,e.jsx)(e.Fragment,{})]}),`
`]}),`
`,(0,e.jsx)(n.h3,{id:"aliasprops",children:"AliasProps"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`interface AliasProps {
  data?: string;
  pageSize?: string;
  offset?: string;
  total?: string;
}
`})}),`
`,(0,e.jsx)(n.h3,{id:"alias-\u548C-requestparams",children:"alias \u548C requestParams"}),`
`,(0,e.jsxs)(n.p,{children:["\u9ED8\u8BA4\u7EA6\u5B9A\u8BF7\u6C42\u53C2\u6570\u662F ",(0,e.jsx)(n.code,{children:"{ pageSize, offset }"})," ,\u8FD4\u56DE\u7684\u6570\u636E\u662F ",(0,e.jsx)(n.code,{children:"{ data, total }"}),"\u3002\u5982\u679C\u4F60\u7684\u8BF7\u6C42\u53C2\u6570\u548C\u8FD4\u56DE\u6570\u636E\u4E0D\u662F\u6309\u7167\u7EA6\u5B9A\uFF0C\u90A3\u4F60\u9700\u8981\u624B\u52A8\u8BBE\u7F6E ",(0,e.jsx)(n.code,{children:"alias"}),"\u3002\u5982\u4F60\u7684\u8FD4\u56DE\u6570\u636E\u662F ",(0,e.jsx)(n.code,{children:"{ list, count }"}),"\uFF0C\u90A3\u4F60\u9700\u8981\u8BBE\u7F6E ",(0,e.jsx)(n.code,{children:"alias"})," \u4E3A ",(0,e.jsx)(n.code,{children:"{ data: 'list', total: 'count' }"}),"\u3002\u5982\u679C\u4F60\u7684\u8BF7\u6C42\u53C2\u6570\uFF0C\u9664\u4E86 ",(0,e.jsx)(n.code,{children:"pageSize"})," \u548C ",(0,e.jsx)(n.code,{children:"offset"})," \u4E4B\u5916\uFF0C\u8FD8\u6709\u5176\u5B83\u7684\u53C2\u6570\uFF0C\u90A3\u4F60\u9700\u8981\u8BBE\u7F6E ",(0,e.jsx)(n.code,{children:"requestParams"}),"\u3002",(0,e.jsx)(n.code,{children:"requestParams"})," \u4E2D\u7684 ",(0,e.jsx)(n.code,{children:"pageSize"})," \u548C ",(0,e.jsx)(n.code,{children:"offset"})," \u4F1A\u88AB\u7EC4\u4EF6\u63A5\u7BA1\u548C\u8986\u76D6\uFF0C\u5728\u52A0\u8F7D\u66F4\u591A\u65F6\uFF0C\u81EA\u52A8\u4EA7\u751F\u53D8\u5316\uFF0C\u4F60\u65E0\u9700\u7406\u4F1A\u3002"]}),`
`,(0,e.jsxs)(n.p,{children:[(0,e.jsx)(n.code,{children:"requestParams"})," \u53D1\u751F\u6539\u53D8\u7684\u65F6\u5019\uFF0C\u4F1A\u81EA\u52A8\u6267\u884C ",(0,e.jsx)(n.code,{children:"reload"}),"\u3002\u65E0\u9700\u91CD\u590D\u7F16\u5199\u903B\u8F91\u3002"]}),`
`,(0,e.jsx)(n.h3,{id:"\u7EA6\u5B9A\u51FA\u5165\u53C2",children:"\u7EA6\u5B9A\u51FA\u5165\u53C2"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`interface Params {
  pageSize: number;
  offset: number;
}
interface Result {
  total: number;
  data: any[];
}
`})}),`
`,(0,e.jsx)(n.h3,{id:"\u6A21\u62DF\u771F\u5B9E\u51FA\u5165\u53C2",children:"\u6A21\u62DF\u771F\u5B9E\u51FA\u5165\u53C2"}),`
`,(0,e.jsx)(n.p,{children:"\u5982\u679C\u4F60\u7684\u771F\u5B9E\u51FA\u5165\u53C2\u5982\u4E0B\uFF1A"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`interface Params {
  pageSize: number;
  offset1: number;
  type: string;
  search: string;
}
interface Result {
  count: number;
  data: any[];
}
`})}),`
`,(0,e.jsx)(n.p,{children:"\u90A3\u4F60\u53EF\u4EE5\u8FD9\u6837\u4F7F\u7528"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-html",children:`<LoadMoreListView requestParams={{ type: 'alita', search: 'some search key', }}
alias={{ total: 'count', offset: 'offset1' }} />
`})}),`
`,(0,e.jsx)(n.h3,{id:"requestfunc",children:"requestFunc"}),`
`,(0,e.jsxs)(n.p,{children:["\u8BF7\u6C42\u6267\u884C\u51FD\u6570\u63A5\u6536\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\uFF0C\u4F60\u53EF\u4EE5\u628A\u4E4B\u524D\u5199\u5728 ",(0,e.jsx)(n.code,{children:"@/services/api"})," \u4E2D\u7684\u51FD\u6570\u4F20\u8FDB\u53BB\u5C31\u53EF\u4EE5\u3002"]}),`
`,(0,e.jsx)(n.p,{children:"\u5982"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`import { query } from '@/services/api';
const Page = () => {
  return <LoadMoreListView requestFunc={query} />;
};
export default Page;
`})}),`
`,(0,e.jsx)(n.p,{children:"\u8FD9\u6837\u7684\u597D\u5904\u662F\uFF0C\u4F9D\u65E7\u4EAB\u53D7\u4E4B\u524D\u9879\u76EE\u4E2D\u7684\u4EE3\u7406\uFF0C\u524D\u7F00\u548C\u8BF7\u6C42\u4E2D\u95F4\u4EF6\u3002"}),`
`,(0,e.jsx)(n.h3,{id:"\u624B\u52A8-reload-\u5217\u8868",children:"\u624B\u52A8 reload \u5217\u8868"}),`
`,(0,e.jsx)(n.p,{children:"\u4E00\u822C\u7528\u4E8E\u8BF7\u6C42\u53C2\u6570\u53D8\u66F4\u4E4B\u540E\uFF0C\u624B\u52A8\u5237\u65B0\u8BF7\u6C42\u3002"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`import React, { FC, useState, useRef } from 'react';
import LoadMoreListView, { LoadMoreListAttributes } from '@alitajs/list-view';

const Page = () => {
  const loadMoreList = useRef<LoadMoreListAttributes>(null);

  return (
    <LoadMoreListView
      ref={loadMoreList}
      onClick={() => loadMoreList.current.reloadDataSource()}
    />
  );
};
export default Page;
`})}),`
`,(0,e.jsx)(n.h3,{id:"\u8D2D\u7269\u8F66\u7C7B\u578B\u7684-loadmorelistview",children:"\u8D2D\u7269\u8F66\u7C7B\u578B\u7684 LoadMoreListView"}),`
`,(0,e.jsx)(n.p,{children:"\u4FDD\u7559 LoadMoreListView \u7684\u6240\u6709\u914D\u7F6E\uFF0C\u901A\u8FC7\u4FEE\u6539 renderCartRow \u5C06\u5DF2\u9009\u591A\u9009\u9009\u4E2D\u672A\u9009\u4E2D\u7684\u903B\u8F91\u5C01\u88C5\u8D77\u6765\uFF0C\u4FBF\u4E8E\u4F7F\u7528\u3002"}),`
`,(0,e.jsxs)(n.blockquote,{children:[`
`,(0,e.jsx)(n.p,{children:"\u8BF7\u6CE8\u610F\uFF0C\u4E3A\u4E86\u9632\u6B62\u8BEF\u5199\u548C\u8BA4\u77E5\u5DEE\u5F02 renderRow \u5C5E\u6027\u4F1A\u88AB\u5F03\u7528\u3002"}),`
`]}),`
`,(0,e.jsxs)(n.table,{children:[(0,e.jsx)(n.thead,{children:(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.th,{children:"\u53C2\u6570"}),(0,e.jsx)(n.th,{children:"\u8BF4\u660E"}),(0,e.jsx)(n.th,{children:"\u7C7B\u578B"}),(0,e.jsx)(n.th,{children:"\u9ED8\u8BA4\u503C"}),(0,e.jsx)(n.th,{children:"\u662F\u5426\u5FC5\u586B"})]})}),(0,e.jsxs)(n.tbody,{children:[(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"renderCartRow"}),(0,e.jsx)(n.td,{children:"\u5B9A\u4E49\u6E32\u67D3\u6BCF\u884C\u7684\u65B9\u5F0F"}),(0,e.jsx)(n.td,{children:"(rowData: any,isSelected: boolean,selectItem: (key: any) => void,unSelectItem: (key: any) => void,) => React.ReactElement"}),(0,e.jsx)(n.td,{children:"\u65E0"}),(0,e.jsx)(n.td,{children:"\u662F"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"onSelectChange"}),(0,e.jsx)(n.td,{children:"\u9009\u4E2D\u6570\u636E\u53D8\u66F4\u65F6\uFF0C\u56DE\u8C03"}),(0,e.jsx)(n.td,{children:"(selectData: any, isSelectAll: boolean) => void"}),(0,e.jsx)(n.td,{children:"\u65E0"}),(0,e.jsx)(n.td,{children:"\u662F"})]})]})]}),`
`,(0,e.jsxs)(n.table,{children:[(0,e.jsx)(n.thead,{children:(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.th,{children:"\u53C2\u6570"}),(0,e.jsx)(n.th,{children:"\u8BF4\u660E"}),(0,e.jsx)(n.th,{children:"\u7C7B\u578B"})]})}),(0,e.jsxs)(n.tbody,{children:[(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"rowData"}),(0,e.jsx)(n.td,{children:"\u7528\u4E8E\u6E32\u67D3\u6BCF\u884C\u7684\u6570\u636E"}),(0,e.jsx)(n.td,{children:"any"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"isSelected"}),(0,e.jsx)(n.td,{children:"\u5F53\u524D\u884C\u662F\u5426\u88AB\u9009\u4E2D"}),(0,e.jsx)(n.td,{children:"boolean"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"selectItem"}),(0,e.jsx)(n.td,{children:"\u9009\u4E2D\u5F53\u524D\u884C"}),(0,e.jsx)(n.td,{children:"(item: any) => void"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"unSelectItem"}),(0,e.jsx)(n.td,{children:"\u53D6\u6D88\u9009\u4E2D\u5F53\u524D\u884C"}),(0,e.jsx)(n.td,{children:"(item: any) => void"})]})]})]}),`
`,(0,e.jsx)(n.p,{children:"\u53EF\u4EE5\u7528\u4E0A\u9762\u7684\u53C2\u6570\u6765\u6E32\u67D3\u9875\u9762\uFF0C\u5982"}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`const renderRow = (
  rowData: any,
  isSelected: boolean,
  selectItem: (key: any) => void,
  unSelectItem: (key: any) => void,
) => (
  <Item
    onClick={() => {
      if (isSelected) {
        unSelectItem(rowData);
      } else {
        selectItem(rowData);
      }
    }}
  >
    {isSelected ? '\u5DF2\u9009\u4E2D' : '\u672A\u9009\u4E2D'}
  </Item>
);
return <CartListView renderCartRow={renderCartRow} />;
`})}),`
`,(0,e.jsxs)(n.blockquote,{children:[`
`,(0,e.jsx)(n.p,{children:"\u7531\u4E8E\u300A\u662F\u5426\u5168\u9009\u300B\u662F\u5C55\u793A\u5728\u7236\u7EA7\uFF0C\u5168\u9009\u6807\u793A\u7684\u903B\u8F91\u5728\u5B50\u7EC4\u4EF6\u5185\uFF0C\u56E0\u6B64\u4F60\u5E94\u8BE5\u901A\u8FC7 onSelectChange \u65B9\u6CD5\u53D6\u5F97\u662F\u5426\u5168\u9009\u72B6\u6001"}),`
`]}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`import React, { FC, useState, useRef, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { CartListView, CartListAttributes } from '@alitajs/list-view';

const [selectAll, setSelectAll] = useState(false);
const cartList = useRef<CartListAttributes>(null);

return (
  <>
    <Button
      onClick={() => {
        cartList.current.toggleAll();
      }}
    >
      {selectAll ? '\u5DF2\u5168\u9009' : '\u672A\u5168\u9009'}
    </Button>
    <CartListView
      ref={cartList}
      onSelectChange={(selectData: any, isSelectAll: boolean) => {
        setSelectAll(isSelectAll);
      }}
    />
  </>
);
`})}),`
`,(0,e.jsx)(n.h3,{id:"\u6240\u6709\u652F\u6301\u7684-current-\u65B9\u6CD5",children:"\u6240\u6709\u652F\u6301\u7684 current \u65B9\u6CD5"}),`
`,(0,e.jsxs)(n.blockquote,{children:[`
`,(0,e.jsx)(n.p,{children:"\u6240\u6709\u7684\u65B9\u6CD5\u90FD\u9700\u8981\u5728\u5F02\u6B65\u65B9\u6CD5\u4E2D\u8C03\u7528\uFF0C\u56E0\u4E3A\u5728\u6E32\u67D3\u51FD\u6570\u4E2D current \u672A\u5B8C\u5168\u7ED1\u5B9A\u3002"}),`
`]}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-ts",children:`export interface CartListAttributes {
  toggleAll: () => void;
  getSelectAll: () => boolean;
  selectItem: (item: any) => void;
  unSelectItem: (item: any) => void;
  getListData: () => any[];
  getSelectDate: () => any[];
  reloadDataSource: () => void;
}
`})}),`
`,(0,e.jsxs)(n.table,{children:[(0,e.jsx)(n.thead,{children:(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.th,{children:"\u53C2\u6570"}),(0,e.jsx)(n.th,{children:"\u8BF4\u660E"})]})}),(0,e.jsxs)(n.tbody,{children:[(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"toggleAll"}),(0,e.jsx)(n.td,{children:"\u5207\u6362\u5168\u9009\u9009\u4E2D\u72B6\u6001\uFF0C\u5728 true \u6216 false \u4E4B\u95F4\u53D8\u66F4"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"getSelectAll"}),(0,e.jsx)(n.td,{children:"\u83B7\u53D6\u5F53\u524D\u7684 \u5168\u9009\u72B6\u6001"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"selectItem"}),(0,e.jsx)(n.td,{children:"\u52A8\u6001\u7684\u9009\u4E2D\u67D0\u4E00\u9879\uFF0Citem \u4E3A rowData"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"unSelectItem"}),(0,e.jsx)(n.td,{children:"\u52A8\u6001\u7684\u53D6\u6D88\u9009\u4E2D\u67D0\u4E00\u9879\uFF0Citem \u4E3A rowData"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"getListData"}),(0,e.jsx)(n.td,{children:"\u83B7\u53D6\u5F53\u524D\u5217\u8868\u4E2D\u7684\u503C\uFF0C\u4E0E onChange \u4E2D\u53D6\u5230\u7684\u503C\u4E00\u81F4"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"getSelectDate"}),(0,e.jsx)(n.td,{children:"\u83B7\u53D6\u5F53\u524D\u5217\u8868\u4E2D\u88AB\u9009\u4E2D\u7684\u503C\uFF0C\u4E0E onSelectChange \u4E2D\u53D6\u5230\u7684\u503C\u4E00\u81F4"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:"reloadDataSource"}),(0,e.jsx)(n.td,{children:"\u624B\u52A8\u5237\u65B0\u5217\u8868\u6570\u636E\uFF0C\u4ECE\u521D\u59CB\u503C\u5F00\u59CB\u91CD\u65B0\u8BF7\u6C42"})]})]})]}),`
`,(0,e.jsx)(n.h2,{id:"\u66F4\u65B0\u65E5\u5FD7",children:"\u66F4\u65B0\u65E5\u5FD7"}),`
`,(0,e.jsx)(n.h3,{id:"101-beta",children:"1.0.1-beta"}),`
`,(0,e.jsxs)(n.blockquote,{children:[`
`,(0,e.jsxs)(n.ol,{children:[`
`,(0,e.jsx)(n.li,{children:"\u66FF\u6362@umijs/hooks(\u5DF2\u5E9F\u5F03)\u4E3A@ahooks\u3002"}),`
`,(0,e.jsx)(n.li,{children:"\u4F18\u5316\u4E0A\u62C9\u5237\u65B0\u52A8\u753B\u3001\u52A0\u8F7D\u66F4\u591A\u52A8\u753B\u3002"}),`
`,(0,e.jsxs)(n.li,{children:["\u589E\u52A0\u5206\u9875\u52A0\u8F7D\u8D77\u59CB\u9875",(0,e.jsx)(n.code,{children:"startPage"}),"\u5165\u53C2"]}),`
`,(0,e.jsx)(n.li,{children:"\u4FEE\u6539 CartListView\u3002"}),`
`]}),`
`]}),`
`,(0,e.jsx)(n.h3,{id:"037",children:"0.3.7"}),`
`,(0,e.jsxs)(n.blockquote,{children:[`
`,(0,e.jsxs)(n.p,{children:["\u89E3\u51B3\u9996\u5C4F\u52A0\u8F7D\u6761\u76EE\u4E0D\u80FD\u586B\u5145",(0,e.jsx)(n.code,{children:"listview"}),"\u5BB9\u5668\u65F6\uFF0C\u65E0\u6CD5\u89E6\u53D1\u52A0\u8F7D\u66F4\u591A"]}),`
`]}),`
`,(0,e.jsx)(n.h2,{id:"\u5E38\u89C1\u95EE\u9898",children:"\u5E38\u89C1\u95EE\u9898"}),`
`,(0,e.jsxs)(n.ol,{children:[`
`,(0,e.jsxs)(n.li,{children:[`
`,(0,e.jsxs)(n.p,{children:["\u5F53\u670D\u52A1\u7AEF\u6570\u636E\u8FD4\u56DE\u683C\u5F0F\u591A\u5C42\u5D4C\u5957\u65F6\uFF0C\u5982\u4F55\u8BBE\u7F6E",(0,e.jsx)(n.code,{children:"alias"}),"?"]}),`
`,(0,e.jsxs)(n.blockquote,{children:[`
`,(0,e.jsxs)(n.p,{children:["\u7B54: \u76EE\u524D",(0,e.jsx)(n.code,{children:"alias"}),"\u662F\u9488\u5BF9\u540C\u5C42\u7EA7\u7ED3\u6784\u3002\u4E3A\u4E86\u6EE1\u8DB3\u7EC4\u4EF6\u4F7F\u7528\uFF0C\u9700\u8981\u4F60\u5728 server \u5C42\u8F6C\u6362\u6570\u636E\u683C\u5F0F\u3002\u793A\u4F8B\u5982\u4E0B\uFF1A"]}),`
`]}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-typescript",children:`// \u670D\u52A1\u7AEF\u6570\u636E
{
  resultCode: 0,
  resultMsg: '',
  resultObject: {
    total: 100,
    data: [
      { key: 0, label: "\u6D4B\u8BD5" },
      { key: 1, label: "\u6D4B\u8BD51" },
      { key: 2, label: "\u6D4B\u8BD52" }
    ],
    ...
  }
}

// \u9700\u8981\u5728Promise\u51FD\u6570\u4E2D\u8F6C\u5316
const call = async (params) => {
  return request(params).then(res => ({ data: res.resultObject.data, total: res.total }));
}

 // \u4F7F\u7528\u793A\u4F8B
<LoadMoreListView
   autoFullViewPort
   initialListSize={25}
   ref={loadMoreList}
   requestFunc={loadmore}
   renderRow={row}
   // \u5728\u8FD9\u91CC\u8C03\u7528Promise\u51FD\u6570
   requestParams={call}
   startPage={10}
   alias={{
     offset: 'abc',
     pageSize: 'pagesize',
     page: 'pageNum',
     data: 'a',
     total: 't',
   }}
   noData={<div style={{ height: '100px', backgroundColor: '#f40' }}>123456</div>}
 />
`})}),`
`]}),`
`]}),`
`,(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{})})]})}}r.default=h}}]);
