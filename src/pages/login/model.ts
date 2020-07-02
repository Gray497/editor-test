// import { stringify } from 'querystring';
import { Effect } from 'umi';
import {login, getHi} from '@/services/login'

export interface StateType {
  status?: 'ok' | 'error';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getHi: Effect;
  };
  reducers: {
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { status, data } = yield call(login, payload);

      if (status === 200){
        console.log(data)
        localStorage.setItem('authrization', data.token)
        yield put({
          type: 'getHi'
        })
      }
    },
    *getHi({ payload }, { call, put }) {
      const { status, data } = yield call(getHi, payload);

      if (status === 200){
        console.log(data)
      }
    },
  },

  reducers: {
  },
};

export default Model;
