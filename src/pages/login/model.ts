// import { stringify } from 'querystring';
import { Effect, router } from 'umi';
import { login, getHi } from '@/services/login';

// import { pathToRegexp } from 'path-to-regexp';

export interface StateType {
  status?: 'ok' | 'error';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  subscriptions: object,
  effects: {
    login: Effect;
    getHi: Effect;
  };
  reducers: {};
}

// @ts-ignore
const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  subscriptions: {
// @ts-ignore
    setup({ dispatch, history }) {
      history.listen((location: any) => {
        console.log(location);
        if (location.pathname === '/login'){
          dispatch({
            type: 'getHi'
          })
        }
        // console.log(pathToRegexp)
        // if (pathToRegexp('/login').exec(location.pathname)) {
        //   console.log(123);
        // }
      });
    },
  },

  effects: {
    * login({ payload }, { call, put }) {
      const { status, data } = yield call(login, payload);

      if (status === 200) {
        console.log(data);
        localStorage.setItem('authorization', data.token);
        yield put({
          type: 'getHi',
        });
        router.push('/');

      }
    },
    * getHi({ payload }, { call, put }) {
      const { status, data } = yield call(getHi, payload);

      console.log(status, data)
      if (status === 200) {
        console.log(data);
      }
    },
  },

  reducers: {},
};

export default Model;
