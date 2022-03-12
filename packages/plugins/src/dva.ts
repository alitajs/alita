// 从 @umijs/plugin 复制，因为需要默认开启，修改了 enableBy
// 增加 types
import * as t from '@umijs/bundler-utils/compiled/babel/types';
import { chalk, logger, winPath } from '@umijs/utils';
import { AlitaApi } from 'alita';
import { dirname, extname, join, relative } from 'path';
import { Model, ModelUtils } from './utils/modelUtils';
import { withTmpPath } from './utils/withTmpPath';

export default (api: AlitaApi) => {
  const pkgPath = join(
    dirname(require.resolve('@umijs/plugins/package.json')),
    'libs',
    'dva.ts',
  );
  // const enableBy = (opts: any) => {
  //   return !!opts.config.dva;
  // };
  api.onStart(() => {
    logger.info('Using Dva Plugin');
  });
  api.describe({
    config: {
      schema(Joi) {
        return Joi.object({
          extraModels: Joi.array().items(Joi.string()),
          enableModelsReExport: Joi.boolean(),
        });
      },
    },
    // enableBy,
  });

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
import React, { useRef } from 'react';
import { history } from 'umi';
import { models } from './models';

export function RootContainer(props: any) {
  const app = useRef<any>();
  if (!app.current) {
    app.current = create(
      {
        history,
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
    for (const id of Object.keys(models)) {
      app.current.model(models[id].model);
    }
    app.current.start();
  }
  return <Provider store={app.current!._store}>{props.children}</Provider>;
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
export { connect, useDispatch, useStore, useSelector } from 'dva';`,
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
