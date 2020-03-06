import { IRoute } from '@umijs/core';
import { AnyAction } from 'redux'
import { EffectsCommandMap } from 'dva'
import { match } from 'react-router-dom'
import { Location, LocationState } from 'history';
// import { IndexModelState } from './index';
// import { SettingsModelState } from './settings';
// import { ListModelState } from './list';

// export { ListModelState, SettingsModelState, IndexModelState };

{{{ alitaDvaHeadExport }}}

export interface Action<T = any> {
  type: T
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S

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
    // index?: boolean;
    // list?: boolean;
    // settings?: boolean;
    {{{ alitaDvaLoadingModels }}}
  };
}

export interface ConnectState {
  // list?: ListModelState;
  // settings?: SettingsModelState;
  // index?: IndexModelState;
  {{{ alitaDvaConnectState }}}
}

/**
 * @type P: Params matched in dynamic routing
 */
export interface ConnectProps<P extends { [K in keyof P]?: string } = {}, S = LocationState>
  extends Partial<IRoute> {
  dispatch?: Dispatch;
  // https://github.com/umijs/umi/pull/2194
  match?: match<P>;
  location: Location<S>;
}

// eslint-disable-next-line no-undef
export default ConnectState;
