import { Effect, Reducer } from 'alita';
import { queryMenu, queryNotices } from '@/services/api';
import { NoticeIconData } from '@/components/NoticeIcon';

export interface GlobalModelState {
  menu: [];
  notices: [];
}
export interface NoticeItem extends NoticeIconData {
  id: string;
  type: string;
  status: string;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    menu: Effect;
    fetchNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
  };
  reducers: {
    save: Reducer<GlobalModelState>;
  };
}

const IndexModel: GlobalModelType = {
  namespace: 'global',

  state: {
    menu: [],
    notices: [],
  },

  effects: {
    *menu({ payload }, { call, put }) {
      const data = yield call(queryMenu, payload);
      yield put({
        type: 'save',
        payload: { menu: data },
      });
    },
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'save',
        payload: { notices: data },
      });
      const unreadCount: number = yield select(
        (state: any) => state.global.notices.filter((item: any) => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'save',
        payload: { notices: payload },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices: NoticeItem[] = yield select((state: any) =>
        state.global.notices.map((item: any) => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );
      yield put({
        type: 'save',
        payload: { notices },
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
