# @alita/chalk

See our website [alitajs](https://alitajs.com) for more information.

## 开关

通过全局的 alitadebug 开启，目的是为了已经部署上去的代码，也可以通过在控制台中设置变量开启。

## 颜色值

```ts
  const color: ColorProps = {
    black: '#00000',
    red: '#FF0000',
    green: '#008000',
    yellow: '#FFFF00',
    blue: '#0000FF',
    magenta: '#FF00FF',
    cyan: '#00FFFF',
    white: '#FFFFFF',
  };
```

使用如 `chalk.black()` 的 API 给控制台的文字上色，如 `chalk.black('黑色文字')`。
返回值为一个数组

```tsx
const black = [`%c黑色文字`,'color: #00000'];
```

## 打印方法

```ts
  const colorHash: ColorHashProps = {
    log: 'black',
    wait: 'cyan',
    error: 'red',
    warn: 'yellow',
    ready: 'green',
    info: 'blue',
    event: 'magenta',
    debug: 'gray',
  };
```

使用封装好的打印方法，可以添加一个带颜色的前缀用来醒目的区分日志类型。

`chalk.warn('警告')` 将会打印 `[Warn] 警告`

## hello

单独的 hello 方法用于打印版本号的场景

如：`chalk.hello('Alita','3.0.0')`

## add 

将两个有颜色的字拼接到一起，上述说过，有颜色的文字返回的是一个数组，所以不能简单的使用 `+` 进行拼接。

如 `add(chalk.black('黑色文字'),chalk.red('红色文字'))`

实际上是两个数组的拼接操作

```ts
const black = [`%c黑色文字`,'color: #00000'];
const red = [`%c红色文字`,'color: #FF0000'];

// black + add

const res = [`%c黑色文字%c红色文字`,'color: #00000','color: #FF0000'];
```
