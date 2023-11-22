# @alita/plugin-azure

See our website [alitajs](https://alitajs.com) for more information.

增加 azure api 对接插件

## 配置

配置中需要提供三个变量

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  plugins: [
    require.resolve('@alita/plugin-azure'),
  ],
  azure: {
    apiVersion: '2023-07-01-preview',
    model: 'alita4',
    resource: 'alita',
  },
});
```

环境变量中必须提供 AZURE_OPENAI_API_KEY

如 `.env.local` 中

```sh
AZURE_OPENAI_API_KEY=azureee754027ac362ec351d6bd93
```

## 使用 

### 项目中使用 

从 alita 中导出 sendOpenAI 和 openai

```tsx
import { sendOpenAI, openai } from 'alita';
import { useState } from 'react';

export default () => {
  const [message, setMessage] = useState<string | null>();
  return (
    <>
      {message}
      <button
        onClick={async () => {
          const result = await sendOpenAI('你好');
          setMessage(result.choices[0]!.message?.content);
        }}
      >
        点我向 GPT 打招呼
      </button>
    </>
  );
};
```

### 插件中使用

增加 umi 插件 api  - onIntlAzure 可以取到 send 和 openai 对象，你可以保存下来，供其他生命周期使用

```ts
import { IApi } from 'umi';

let _send = (_: any) => {};
export default (api: IApi) => {
  // @ts-ignore
  api.onIntlAzure(async({send,openai})=>{
    _send = send;
  })
  api.onDevCompileDone(async()=>{
    const result = await _send('你好');
    console.log(result.choices[0]!.message?.content);
  })
};
```