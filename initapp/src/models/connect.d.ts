import { EffectsCommandMap } from 'dva';
import { match } from 'react-router-dom';
import { AnyAction } from 'redux';
import { RouterTypes } from 'umi';
import { AppModelState } from './app';

export {
  AppModelState
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
    activities?: boolean;
    chart?: boolean;
    form?: boolean;
    geographic?: boolean;
    global?: boolean;
    list?: boolean;
    login?: boolean;
    menu?: boolean;
    monitor?: boolean;
    profile?: boolean;
    project?: boolean;
    register?: boolean;
    rule?: boolean;
    setting?: boolean;
    user?: boolean;
  };
}

export interface ConnectState {
  app?: AppModelState;
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

export default ConnectState;
