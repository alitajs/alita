# @alitajs/aconsole

一些 alita 项目的移动端调试工具的集合。

```ts
{
  aconsole:{
    inspx:{},
    console:{}
  }
}
```

## inspx

inspx 可以通过摇一摇唤醒，用于查看页面渲染的 px 值，显示值为真实的 px 值，可能是设置的 px 值 @2x 或者 @3x。

配置项。

- 可写
- 类型：object

```tsx
export default {
  aconsole:{
    inspx: {
      production: false, // 希望在生产上也能够保留 inspx 功能，一般用在特殊的灰度环境
      disabled: false, // 是否关闭 inspx 功能，推荐用法是不使用，这里可以不配置 inspx 。
      margin: true,
      size: true,
      padding: true,
    },
  }
};
```

## console

控制台通过配置唤起。

配置项。

- 可写
- 类型：object

| 键名                | 类型     | 可选 | 默认值                                      | 描述                                                     |
| ------------------- | -------- | ---- | ------------------------------------------- | -------------------------------------------------------- |
| defaultPlugins      | Array    | true | ['system', 'network', 'element', 'storage'] | 需要自动初始化并加载的内置插件。                         |
| onReady             | Function | true |                                             | 回调方法，当 vConsole 完成初始化并加载完内置插件后触发。 |
| onClearLog          | Function | true |                                             | 回调方法，点击 Log 或 System 面板的 "Clear" 按钮后出发。 |
| maxLogNumber        | Number   | true | 1000                                        | 超出上限的日志会被自动清除。                             |
| disableLogScrolling | Boolean  | true |                                             | 若为 `false`，有新日志时面板将不会自动滚动到底部。       |
| theme               | String   | true | 'light'                                     | 主题颜色，可选值为 'light'                               | 'dark'。 |
