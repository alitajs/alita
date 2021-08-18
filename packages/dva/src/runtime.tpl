import React from 'react';
import { _DvaContainer, getApp, _onCreate } from './dva';

export function rootContainer(container, opts) {
  return React.createElement(_DvaContainer, opts, container);
}

{{#SSR}}
export const ssr = {
  modifyGetInitialPropsCtx: async (ctx) => {
    // 服务端执行早于 constructor 中的 onCreate
    if (process.env.__IS_SERVER && ctx.history) {
      const tmpApp = _onCreate({
        // server
        history: ctx.history,
      })
      tmpApp.router(() => {})
      tmpApp.start();
      ctx.app = tmpApp;
    }
    // 一定有 app
    const { _store } = getApp();
    ctx.store = _store;
    return ctx;
  },
}
{{/SSR}}
