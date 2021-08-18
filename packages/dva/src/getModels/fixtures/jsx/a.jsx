import React from 'react';

const A = () => <div>123</div>
const AbcModel = {
  namespace: 'a',

  state: {
    name: '123',
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: { name: 'data.text' },
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

export default AbcModel;
