// import { stringify } from 'querystring';
import { Effect } from 'umi';
import { logout } from '@/services/login';
const {routerRedux} = require("dva").router

// import { pathToRegexp } from 'path-to-regexp';

export interface StateType {
  status?: 'ok' | 'error';
}

export interface AppModelType {
  namespace: string;
  state: StateType;
  subscriptions: object,
  effects: {
    logout: Effect;
  };
  reducers: {};
}

// @ts-ignore
const Model: AppModelType = {
  namespace: 'app',

  state: {
    status: undefined,
  },

  subscriptions: {
// @ts-ignore
    setup({ dispatch, history }) {
      history.listen((location: any) => {
        // if (location.pathname === '/login'){
        // }
      });
    },
  },

  effects: {
    * logout({ payload }, { call, put }) {
      const { status, data } = yield call(logout, payload);
      if (status === 200) {
        localStorage.setItem('authorization', '/');
        yield put(routerRedux.push('/login'));
      }
    },
  },

  reducers: {},
};

export default Model;
