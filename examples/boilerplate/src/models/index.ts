import { query } from '@/services/api';
// import { Effect, Reducer } from 'dva';

export interface Effect {}
export interface Reducer<T> {}
export interface IndexModelState {
  name: string;
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
  };
}

const IndexModel: IndexModelType = {
  namespace: 'index',

  state: {
    name: 'Hello Alita',
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
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

export default IndexModel;
