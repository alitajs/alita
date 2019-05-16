import { query } from './service';
import { Effect } from './connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';
export interface BLOCK_NAME_CAMEL_CASEModelState {
  name: string;
}

export interface BLOCK_NAME_CAMEL_CASEModelType {
  namespace: 'BLOCK_NAME_CAMEL_CASE';
  state: BLOCK_NAME_CAMEL_CASEModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save:  Reducer<BLOCK_NAME_CAMEL_CASEModelState>;
  };
  subscriptions: { setup: Subscription };
}


const BLOCK_NAME_CAMEL_CASEModel: BLOCK_NAME_CAMEL_CASEModelType = {
  namespace: 'BLOCK_NAME_CAMEL_CASE',

  state: {
    name: ''
  },

  effects: {
    *query({ payload }, { call, put, select }) {
      const data = yield call(query, payload);
      console.log(data)
      yield put({
        type: 'save',
        payload: { name: data.text },
      });

    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query'
          })
        }
      });
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default BLOCK_NAME_CAMEL_CASEModel;
