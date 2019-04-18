import { query } from '@/services/api';
import { Effect } from '@/models/connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';

export interface AppModelState {
  name: string;
}

export interface AppModel {
  namespace: 'app';
  state: AppModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save:  Reducer<AppModelState>;
  };
  subscriptions: { setup: Subscription };
}

const ListModel: AppModel = {
  namespace: 'app',

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

export default ListModel;
