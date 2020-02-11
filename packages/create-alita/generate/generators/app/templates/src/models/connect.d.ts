import { AnyAction, EffectsCommandMap, RouterTypes, match } from 'alita';
import { IndexModelState } from './index';
import { SettingsModelState } from './settings';
import { ListModelState } from './list';

export { ListModelState, SettingsModelState, IndexModelState };

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
export type Dispatch = <P = any, C = (payload: P) => void>(
  action: {
    type: string;
    payload?: P;
    callback?: C;
    [key: string]: any;
  },
) => any;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    index?: boolean;
    list?: boolean;
    settings?: boolean;
  };
}

export interface ConnectState {
  list?: ListModelState;

  settings?: SettingsModelState;

  index?: IndexModelState;
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
