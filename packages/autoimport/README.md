# @alita/autoimport

See our website [alitajs](https://alitajs.com) for more information.

## 安装使用 

```
pnpm i @alita/autoimport

plugins:['@alita/autoimport']

autoImport:{
    libs:[ ],
}
```

## api.addLowImportLibs


```ts
api.addLowImportLibs(()=>[
    // import * as xxx from 'xxx';
    { namespaceImport: 'xxx' },
    // import xxx from 'xxx';
    { defaultImport: 'xx' },
     // import { 'computed', 'ref' } from 'xxx';
    { importFrom: 'xxx', members: ['computed', 'ref'] },
])
```


