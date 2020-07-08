// import { stringify } from 'querystring';
import { Effect, history } from 'umi';
import { logout } from '@/services/login';

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
      const { status } = yield call(logout, payload);
      if (status === 200) {
        localStorage.setItem('authorization', '/');
        history.push('/login');
      }
    },
  },

  reducers: {},
};

export default Model;
