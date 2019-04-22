import { query } from '@/services/api';
<% if (isTypeScript) { %>
import { Effect } from '@/models/connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';
export interface <%= componentName %>ModelState {
  name: string;
}

export interface <%= componentName %>ModelType {
  namespace: '<%= name %>';
  state: <%= componentName %>ModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save:  Reducer<<%= componentName %>ModelState>;
  };
  subscriptions: { setup: Subscription };
}
<% } %>

const <%= componentName %>Model<% if (isTypeScript) { %>: <%= componentName %>ModelType<% } %> = {
  namespace: '<%= name %>',

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

export default <%= componentName %>Model;
