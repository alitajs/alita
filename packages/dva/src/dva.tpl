import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '{{{ dvaLoadingPkgPath }}}';
import { plugin, history } from '../core/umiExports';
{{ ^LazyLoad }}
{{{ RegisterModelImports }}}
{{ /LazyLoad }}
{{ #dvaImmer }}
import dvaImmer, { enableES5, enableAllPlugins } from '{{{ dvaImmerPath }}}';
{{ /dvaImmer }}

let app:any = null;

export {{ #LazyLoad }}async {{ /LazyLoad }}function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  {{ #LazyLoad }}
  {{{ RegisterModelImports }}}
  {{ /LazyLoad }}
  app = dva({
    history,
    {{{ ExtendDvaConfig }}}
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  {{{ EnhanceApp }}}
  app.use(createLoading());
  {{ #dvaImmer }}
  app.use(dvaImmer());
  {{ /dvaImmer }}
  {{ #dvaImmerES5 }}
  enableES5();
  {{ /dvaImmerES5 }}
  {{ #dvaImmerAllPlugins }}
  enableAllPlugins();
  {{ /dvaImmerAllPlugins }}
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  {{{ RegisterModels }}}
  return app;
}

export function getApp() {
  return app;
}

/**
 * whether browser env
 * 
 * @returns boolean
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (isBrowser()) {
      _onCreate()
      {{ #LazyLoad }}
        .then(() => {
          // force update
          this.forceUpdate();
        });
      {{ /LazyLoad }}
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    let app = getApp();
    {{#SSR}}
    // fix https://github.com/umijs/umi/issues/6404#issuecomment-828151923
    if (!isBrowser() && this.props.ctx?.app) {
      app = this.props.ctx.app;
    }
    {{/SSR}}
    {{ #LazyLoad }}
    if (!app) {
      return null;
    }
    {{ /LazyLoad }}
    app.router(() => this.props.children);
    return app.start()();
  }
}
