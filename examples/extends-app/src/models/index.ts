import { query } from '@/services/api';
import type { DvaModel } from 'alita';

export interface IndexModelState {
  name: string;
}

const IndexModel: DvaModel<IndexModelState> = {
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
