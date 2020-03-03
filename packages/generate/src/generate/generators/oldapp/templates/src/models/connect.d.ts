import { RouterTypes, AnyAction, match, EffectsCommandMap } from 'alita';
import { <%= componentName %>ModelState } from './<%= name %>';

export {
  <%= componentName %>ModelState,
};

export interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  path: string;
  [key: string]: any;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    <%= name %>?: boolean;
  };
}

export interface ConnectState {
  <%= name %>?: <%= componentName %>ModelState;
}

/**
 * @type P: Params matched in dynamic routing
 */
export interface ConnectProps<P extends { [K in keyof P]?: string } = {}>
  extends Partial<RouterTypes<Route>> {
  dispatch?: Dispatch;
  // https://github.com/umijs/umi/pull/2194
  match?: match<P>;
}

// eslint-disable-next-line no-undef
export default ConnectState;
