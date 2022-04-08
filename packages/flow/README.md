# @alita/flow

根据 solid 框架 api 的灵感，封装的 react 的流程控制组件库，现在的实现是常规实现，后续根据 react18 的 api 可以默认对这些东西进行优化。

## For

 ```typescript
 <For each={items} fallback={<div>No items</div>}>
   {(item, index) => <div data-index={index()}>{item}</div>}
 </For>
 ```

 ```ts
 {
   items.map((item, index) => <div data-index={index()}>{item}</div>)
 }
 ```

## Show

```typescript
<Show when={bool} fallback={<div>hidden!</div>}>
   <div>show!!</div>
</Show>
```

```ts
{
  bool && <div>show!!</div>
  !bool && <div>hidden!</div>
}
```

## Switch

```typescript
<Switch fallback={<FourOhFour />}>
  <Match when={state.route === 'home'}>
    <Home />
  </Match>
  <Match when={state.route === 'settings'}>
    <Settings />
  </Match>
</Switch>
```

```ts
{
  state.route === 'home' && <Home />
  state.route === 'settings' && <Settings />
  (state.route !== 'home' && state.route !== 'settings') && <FourOhFour />
}
```
## ErrorBoundary

```typescript
<ErrorBoundary
    fallback={({ error, componentStack, resetError }) => (
        <div>
            Error: {error.toString()}
            <button
              onClick={() => {
                console.log(componentStack);
                // setabc([1, 2, 3]);
                resetError();
              }}
            >
              重置错误
            </button>
            <details>Stack:{componentStack?.toString()}</details>
        </div>
        )}
    >
    <Error />
</ErrorBoundary>
```

## Page
## Header

## Content
## Footer


参考api https://www.solidjs.com/docs/latest/api

同事看到我写的东西，给我发了一个竞品 https://github.com/romac/react-if

See our website [alitajs](https://alitajs.com) for more information.