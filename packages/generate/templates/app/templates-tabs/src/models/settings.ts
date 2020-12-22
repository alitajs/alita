import { query } from '@/services/api';
import { Effect, Reducer } from 'alita';

export interface SettingsModelState {
  name: string;
}

export interface SettingsModelType {
  namespace: 'settings';
  state: SettingsModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<SettingsModelState>;
  };
}

const SettingsModel: SettingsModelType = {
  namespace: 'settings',

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {
      const { data } = yield call(query, payload);
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

export default SettingsModel;
