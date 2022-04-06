---
---

# 移动端的表单方案

```bash
yarn add @alitajs/dform
```

## 表单组件

封装常用的表单组件，将 antd-mobile 的组件，改成受控组件。

官方用法

```ts
<InputItem
  {...getFieldProps('autofocus')}
  clear
  placeholder="auto focus"
  ref={el => (this.autoFocusInst = el)}
>
  标题
</InputItem>
```

使用@alitajs/dform

```ts
<NomarInput name="autofocus" placeholder="auto focus" title="标题" />
```

## 动态表单

```ts
<List renderHeader={() => 'Customize to focus'}>
  <InputItem
    {...getFieldProps('autofocus')}
    clear
    placeholder="auto focus"
    ref={el => (this.autoFocusInst = el)}
  >
    标题
  </InputItem>
  <Picker
    extra="请选择(可选)"
    data={district}
    title="Areas"
    {...getFieldProps('district', {
      initialValue: ['340000', '341500', '341502'],
      rules: [{ required: true, message: `请输入${title}` }],
    })}
    onOk={e => console.log('ok', e)}
    onDismiss={e => console.log('dismiss', e)}
  >
    <List.Item arrow="horizontal">Multiple & cascader</List.Item>
  </Picker>
</List>
```

使用@alitajs/dform

```ts
const formData = [
  {
    type: 'input',
    fieldProps: 'autofocus',
    required: true,
    placeholder: 'auto focus',
    title: '标题',
    inputType: 'text',
  },
  {
    type: 'select',
    fieldProps: 'district',
    required: true,
    placeholder: '请选择(可选)',
    title: 'Multiple & cascader',
    data: district,
  },
];
<DynamicForm data={formData} />;
```

## 可视化编辑方案

方案灵感来源于 [ava](https://github.com/antvis/ava) 的 `autoChart`，用法和触发条件一致，都是 data 为空且在开发状态的时候，显示编辑表单按钮。用户可以强制设定 `isDev` 来在任意环境中使用。

![2020-01-20 17 16 23](https://user-images.githubusercontent.com/11746742/72713840-b37bc900-3ba8-11ea-8a94-d19cdd39be53.gif)

更多详情，请点击[dform 官网](https://dform.alitajs.com/) 欢迎交流。感谢！
