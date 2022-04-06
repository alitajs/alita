---
title: '列表页面（加载更多）'
---

# @alitajs/list-view

移动端的加载更多页面封装，简化业务流程。使用了 `@umijs/hooks` 的 `useLoadMore`。

## 最简 Demo

```ts
import LoadMoreListView from '@alitajs/list-view';
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
```

![](https://github.com/alitajs/list-view/raw/master/src/assets/showgif.gif)

## API

| 参数               | 说明                                                                                                                                                                                                                                                                     | 类型                                                    | 默认值           | 是否必填 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | ---------------- | -------- |
| height             | 滚动容器的高度                                                                                                                                                                                                                                                           | string                                                  | 充满剩余容器高度 | 否       |
| alias              | 请求参数的别名                                                                                                                                                                                                                                                           | AliasProps                                              | 见表格下方备注   | 否       |
| requestFunc        | 请求执行函数                                                                                                                                                                                                                                                             | 异步函数                                                | 无               | 是       |
| noData             | 空列表展示内容                                                                                                                                                                                                                                                           | string or node                                          | ''               | 否       |
| requestParams      | 请求参数                                                                                                                                                                                                                                                                 | object                                                  | {}               | 否       |
| renderRow          | 从数据源(data source)中接受一条数据，以及它和它所在 section 的 ID。返回一个可渲染的组件来为这行数据进行渲染。默认情况下参数中的数据就是放进数据源中的数据本身，不过也可以提供一些转换器。如果某一行正在被高亮（通过调用 highlightRow 函数），ListView 会得到相应的通知。 | (rowData, sectionID, rowID, highlightRow) => renderable | 无               | 是       |
| renderFooter       | 重新渲染页脚，会传入三个参数，表示列表页面的当前状态。                                                                                                                                                                                                                   | ( noMore, loadingMore, loadMore?) => React.ReactElement | ''               | 否       |
| isTabsPage         | 在 Tabs 页面中使用时需要配置，高度需要减去底部 tabs 高度                                                                                                                                                                                                                 | false                                                   | 否               |
| onChange           | 数据变化时回调，你可以通过它取得当前列表的所有值                                                                                                                                                                                                                         | (data)=>void                                            | 否               |
| autoFullViewPort   | 首屏数据不能覆盖全屏时，自动加载更多填充屏幕，解决因首次加载数据条目太少导致无法触发加载更多的 bug，`版本0.3.7`以后支持。                                                                                                                                                | boolean                                                 | 否               | 否       |
| startPage          | 起始加载页，如果`startPage`设置为 0, 刷新时会将`pageNum`重置为 0， `版本1.0.1-beta`以后支持。                                                                                                                                                                            | number                                                  | 1                | 否       |
| 其他 ListView 参数 | 能接收 ListView 的其他参数，请注意不要设置 'onEndReached'、 'dataSource'                                                                                                                                                                                                 | 无                                                      | 否               |

> 如果不需要下拉刷新的功能，可以设置 pullToRefresh={<></>}

### AliasProps

```ts
interface AliasProps {
  data?: string;
  pageSize?: string;
  offset?: string;
  total?: string;
}
```

### alias 和 requestParams

默认约定请求参数是 `{ pageSize, offset }` ,返回的数据是 `{ data, total }`。如果你的请求参数和返回数据不是按照约定，那你需要手动设置 `alias`。如你的返回数据是 `{ list, count }`，那你需要设置 `alias` 为 `{ data: 'list', total: 'count' }`。如果你的请求参数，除了 `pageSize` 和 `offset` 之外，还有其它的参数，那你需要设置 `requestParams`。`requestParams` 中的 `pageSize` 和 `offset` 会被组件接管和覆盖，在加载更多时，自动产生变化，你无需理会。

`requestParams` 发生改变的时候，会自动执行 `reload`。无需重复编写逻辑。

### 约定出入参

```ts
interface Params {
  pageSize: number;
  offset: number;
}
interface Result {
  total: number;
  data: any[];
}
```

### 模拟真实出入参

如果你的真实出入参如下：

```ts
interface Params {
  pageSize: number;
  offset1: number;
  type: string;
  search: string;
}
interface Result {
  count: number;
  data: any[];
}
```

那你可以这样使用

```html
<LoadMoreListView requestParams={{ type: 'alita', search: 'some search key', }}
alias={{ total: 'count', offset: 'offset1' }} />
```

### requestFunc

请求执行函数接收的是一个异步函数，你可以把之前写在 `@/services/api` 中的函数传进去就可以。

如

```ts
import { query } from '@/services/api';
const Page = () => {
  return <LoadMoreListView requestFunc={query} />;
};
export default Page;
```

这样的好处是，依旧享受之前项目中的代理，前缀和请求中间件。

### 手动 reload 列表

一般用于请求参数变更之后，手动刷新请求。

```ts
import React, { FC, useState, useRef } from 'react';
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
```

### 购物车类型的 LoadMoreListView

保留 LoadMoreListView 的所有配置，通过修改 renderCartRow 将已选多选选中未选中的逻辑封装起来，便于使用。

> 请注意，为了防止误写和认知差异 renderRow 属性会被弃用。

| 参数           | 说明                 | 类型                                                                                                                      | 默认值 | 是否必填 |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------ | -------- |
| renderCartRow  | 定义渲染每行的方式   | (rowData: any,isSelected: boolean,selectItem: (key: any) => void,unSelectItem: (key: any) => void,) => React.ReactElement | 无     | 是       |
| onSelectChange | 选中数据变更时，回调 | (selectData: any, isSelectAll: boolean) => void                                                                           | 无     | 是       |

| 参数         | 说明               | 类型                |
| ------------ | ------------------ | ------------------- |
| rowData      | 用于渲染每行的数据 | any                 |
| isSelected   | 当前行是否被选中   | boolean             |
| selectItem   | 选中当前行         | (item: any) => void |
| unSelectItem | 取消选中当前行     | (item: any) => void |

可以用上面的参数来渲染页面，如

```ts
const renderRow = (
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
    {isSelected ? '已选中' : '未选中'}
  </Item>
);
return <CartListView renderCartRow={renderCartRow} />;
```

> 由于《是否全选》是展示在父级，全选标示的逻辑在子组件内，因此你应该通过 onSelectChange 方法取得是否全选状态

```ts
import React, { FC, useState, useRef, useEffect } from 'react';
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
      {selectAll ? '已全选' : '未全选'}
    </Button>
    <CartListView
      ref={cartList}
      onSelectChange={(selectData: any, isSelectAll: boolean) => {
        setSelectAll(isSelectAll);
      }}
    />
  </>
);
```

### 所有支持的 current 方法

> 所有的方法都需要在异步方法中调用，因为在渲染函数中 current 未完全绑定。

```ts
export interface CartListAttributes {
  toggleAll: () => void;
  getSelectAll: () => boolean;
  selectItem: (item: any) => void;
  unSelectItem: (item: any) => void;
  getListData: () => any[];
  getSelectDate: () => any[];
  reloadDataSource: () => void;
}
```

| 参数             | 说明                                                       |
| ---------------- | ---------------------------------------------------------- |
| toggleAll        | 切换全选选中状态，在 true 或 false 之间变更                |
| getSelectAll     | 获取当前的 全选状态                                        |
| selectItem       | 动态的选中某一项，item 为 rowData                          |
| unSelectItem     | 动态的取消选中某一项，item 为 rowData                      |
| getListData      | 获取当前列表中的值，与 onChange 中取到的值一致             |
| getSelectDate    | 获取当前列表中被选中的值，与 onSelectChange 中取到的值一致 |
| reloadDataSource | 手动刷新列表数据，从初始值开始重新请求                     |

## 更新日志

### 1.0.1-beta

> 1. 替换@umijs/hooks(已废弃)为@ahooks。
> 2. 优化上拉刷新动画、加载更多动画。
> 3. 增加分页加载起始页`startPage`入参
> 4. 修改 CartListView。

### 0.3.7

> 解决首屏加载条目不能填充`listview`容器时，无法触发加载更多

## 常见问题

1. 当服务端数据返回格式多层嵌套时，如何设置`alias`?

   > 答: 目前`alias`是针对同层级结构。为了满足组件使用，需要你在 server 层转换数据格式。示例如下：

   ```typescript
   // 服务端数据
   {
     resultCode: 0,
     resultMsg: '',
     resultObject: {
       total: 100,
       data: [
         { key: 0, label: "测试" },
         { key: 1, label: "测试1" },
         { key: 2, label: "测试2" }
       ],
       ...
     }
   }

   // 需要在Promise函数中转化
   const call = async (params) => {
     return request(params).then(res => ({ data: res.resultObject.data, total: res.total }));
   }

    // 使用示例
   <LoadMoreListView
      autoFullViewPort
      initialListSize={25}
      ref={loadMoreList}
      requestFunc={loadmore}
      renderRow={row}
      // 在这里调用Promise函数
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
   ```

```

```
