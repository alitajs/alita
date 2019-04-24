import { query } from '@/services/api';


const DetialModel = {
  namespace: 'detial',

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
        if (pathname === '/detial') {
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

export default DetialModel;
