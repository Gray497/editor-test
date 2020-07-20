// import { stringify } from 'querystring';
import { Effect, Reducer, history } from 'umi';
import {queryGroup} from '@/services/article'
import {getGroupDetail} from '@/services/app'
import { logout } from '@/services/login';

// import { pathToRegexp } from 'path-to-regexp';

export interface StateType {
  status?: 'ok' | 'error';
  wwwType: string,
  groups: Array<any>
}

export interface AppModelType {
  namespace: string;
  state: StateType;
  subscriptions: object,
  effects: {
    logout: Effect;
    queryGroup: Effect,
    getGroupDetail: Effect,
  };
  reducers: {
    setState: Reducer,
  };
}

// @ts-ignore
const Model: AppModelType = {
  namespace: 'app',

  state: {
    status: undefined,
    wwwType: '1',
    groups: []
  },

  subscriptions: {
// @ts-ignore
    setup({ dispatch, history }) {
      history.listen((location: any) => {
        if (!(location.pathname.startsWith('/www'))){
          dispatch({type: 'queryGroup'})
        }
        const {query: {groupId}} = location;
        if (!!groupId){
          dispatch({type: 'getGroupDetail', payload: {id: groupId}})
        }
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
    * getGroupDetail({ payload }, { call, put }) {
      const { status, data } = yield call(getGroupDetail, payload);
      if (status === 200) {
        yield put({
          type: 'setState',
          payload: {
            group: data
          }
        })
      }
    },
    * queryGroup({ payload }, { call, put }) {
      const { status, data } = yield call(queryGroup, {
        pageSize: 9999,
        pageNum: 1
      });
      if (status === 200) {
        yield put({
          type: 'setState',
          payload: {
            groups: data.data
          }
        })
      }
    },
  },

  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload }
    },
  },
};

export default Model;
