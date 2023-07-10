// 从 @umijs/plugin 复制，因为需要默认开启，修改了 enableBy
// 增加 types
import type { AlitaApi } from '@alita/types';
import * as t from '@umijs/bundler-utils/compiled/babel/types';
import { chalk, winPath } from '@umijs/utils';

import { dirname, extname, join, relative } from 'path';
import { Model, ModelUtils } from './utils/modelUtils';
import { withTmpPath } from './utils/withTmpPath';

export default (api: AlitaApi) => {
  const pkgPath = join(
    dirname(require.resolve('@umijs/plugins/package.json')),
    'libs',
    'dva.tsx',
  );
  // const enableBy = (opts: any) => {
  //   return !!opts.config.dva;
  // };

  api.describe({
    config: {
      schema(Joi) {
        return Joi.object({
          extraModels: Joi.array().items(Joi.string()),
          enableModelsReExport: Joi.object(),
          immer: Joi.object(),
        });
      },
    },
    // enableBy,
  });
  api.addRuntimePluginKey(() => ['dva']);

  // only dev or build running
  if (!['dev', 'build', 'dev-config', 'preview'].includes(api.name)) return;

  api.modifyAppData((memo) => {
    const models = getAllModels(api);
    memo.pluginDva = {
      pkgPath,
      models,
    };
    return memo;
  });

  api.modifyConfig((memo) => {
    // import from dva
    memo.alias['dva$'] = pkgPath;
    return memo;
  });

  api.onGenerateFiles((args) => {
    const models = args.isFirstTime
      ? api.appData.pluginDva.models
      : getAllModels(api);

    // models.ts
    api.writeTmpFile({
      path: 'models.ts',
      content: ModelUtils.getModelsContent(models),
    });

    // types.ts
    api.writeTmpFile({
      path: 'types.d.ts',
      tpl: `
export interface ConnectProps {
      dispatch?: Dispatch;
      // 兼容 alita2
      match?: any;
      location?: any;
      history?: History;
      route?: any;
      routes?: any;
}
type RequiredConnectProps = Required<ConnectProps>
export type ConnectRC<
      T = {},
      > = React.ForwardRefRenderFunction<any, T & RequiredConnectProps>;
interface Action<T = any> {
      type: T
}
interface AnyAction extends Action {
      // Allows any extra properties to be defined in an action.
      [extraProps: string]: any
}
interface Dispatch<A extends Action = AnyAction> {
      <T extends A>(action: T): T
}
interface EffectsCommandMap {
      put: <A extends AnyAction>(action: A) => any,
      call: Function,
      select: Function,
      take: Function,
      cancel: Function,
      [key: string]: any,
}
interface Action<T = any> {
      type: T
}
export type Reducer<S = any, A extends Action = AnyAction> = (prevState: S, action: A) => S;
export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;
type EffectType = 'takeEvery' | 'takeLatest' | 'watcher' | 'throttle';
type EffectWithType = [Effect, { type: EffectType }];
export type Subscription = (api: SubscriptionAPI, done: Function) => void;

export interface ReducersMapObject<T> {
      [key: string]: Reducer<T>,
}
export interface EffectsMapObject {
      [key: string]: Effect | EffectWithType,
}
export interface SubscriptionAPI {
      dispatch: Dispatch<any>,
}
export interface SubscriptionsMapObject {
      [key: string]: Subscription,
}
export interface DvaModel<T, E = EffectsMapObject, R = ReducersMapObject<T>> {
      namespace: string,
      state?: T,
      reducers?: R,
      effects?: E,
      subscriptions?: SubscriptionsMapObject,
}
${
  api.config.dva?.enableModelsReExport
    ? models
        .map((model: { file: string; namespace: string }) => {
          const { file, namespace } = model;
          // prettier-ignore
          // export type { IndexModelState } from '/Users/xiaohuoni/next-alita-app/src/models/index';
          return `export type { ${namespace.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}ModelState } from '${winPath(file.replace(extname(file), ''))}';`;
        })
        .join('\r\n')
    : ''
}
      `,
      context: {},
    });

    // dva.tsx
    api.writeTmpFile({
      path: 'dva.tsx',
      tpl: `
// It's faked dva
// aliased to @umijs/plugins/templates/dva
import { create, Provider } from 'dva';
import createLoading from '${winPath(require.resolve('dva-loading'))}';
${
  api.config.dva?.immer
    ? `
import dvaImmer, { enableES5, enableAllPlugins } from '${winPath(
        require.resolve('dva-immer'),
      )}';
`
    : ''
}
import React, { useRef } from 'react';
import { history, ApplyPluginsType, useAppData } from 'umi';
import { models } from './models';

let dvaApp: any;

export function RootContainer(props: any) {
  const { pluginManager } = useAppData();
  const app = useRef<any>();
  const runtimeDva = pluginManager.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  if (!app.current) {
    app.current = create(
      {
        history,
        ...(runtimeDva.config || {}),
      },
      {
        initialReducer: {},
        setupMiddlewares(middlewares: Function[]) {
          return [...middlewares];
        },
        setupApp(app: IDvaApp) {
          app._history = history;
        },
      },
    );
    dvaApp = app.current;
    app.current.use(createLoading());
    ${api.config.dva?.immer ? `app.current.use(dvaImmer());` : ''}
    ${api.config.dva?.immer?.enableES5 ? `enableES5();` : ''}
    ${api.config.dva?.immer?.enableAllPlugins ? `enableAllPlugins();` : ''}
    (runtimeDva.plugins || []).forEach((p) => {
      app.current.use(p);
    });
    for (const id of Object.keys(models)) {
      app.current.model({
        namespace: models[id].namespace,
        ...models[id].model,
      });
    }
    app.current.start();
  }
  return <Provider store={app.current!._store}>{props.children}</Provider>;
}

export function getDvaApp() {
  return dvaApp;
}
      `,
      context: {},
    });

    // runtime.tsx
    api.writeTmpFile({
      path: 'runtime.tsx',
      content: `
import React from 'react';
import { RootContainer } from './dva';

export function dataflowProvider(container, opts) {
  return React.createElement(RootContainer, opts, container);
}
      `,
    });

    // index.ts for export
    api.writeTmpFile({
      path: 'index.ts',
      content: `
export { connect, useDispatch, useStore, useSelector } from 'dva';
export { getDvaApp } from './dva';
`,
    });
  });

  api.addTmpGenerateWatcherPaths(() => {
    return [join(api.paths.absSrcPath, 'models')];
  });

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.tsx' })];
  });

  // dva list model
  api.registerCommand({
    name: 'dva',
    fn() {
      api.logger.info(chalk.green.bold('dva models'));
      api.appData.pluginDva.models.forEach((model: Model) => {
        api.logger.info(`  - ${relative(api.cwd, model.file)}`);
      });
    },
  });
};

export function getModelUtil(api: AlitaApi | null) {
  return new ModelUtils(api, {
    contentTest(content) {
      return content.startsWith('// @dva-model');
    },
    astTest({ node, content }) {
      if (isModelObject(node)) {
        return true;
      } else if (
        content.includes('dva-model-extend') &&
        t.isCallExpression(node) &&
        node.arguments.length === 2 &&
        isModelObject(node.arguments[1])
      ) {
        return true;
      }
      return false;
    },
  });
}

export function getAllModels(api: AlitaApi) {
  return getModelUtil(api).getAllModels({
    extraModels: [...(api.config.dva.extraModels || [])],
  });
}

function isModelObject(node: t.Node) {
  return (
    t.isObjectExpression(node) &&
    node.properties.some((property) => {
      return [
        'state',
        'reducers',
        'subscriptions',
        'effects',
        'namespace',
      ].includes((property as any).key.name);
    })
  );
}
