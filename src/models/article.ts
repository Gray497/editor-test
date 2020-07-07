import { Effect, Reducer } from 'umi';
import {routerRedux} from 'dva/router'
import { create, query, detail, update, remove } from '@/services/article';
import {getLocationQuery} from '@/utils/help';

const articleType = 1;

export interface StateType {
  dataSource: Array<any>,
  pagination: Object,
  detail: Object,
}

export interface ModelType {
  namespace: string;
  state: StateType;
  subscriptions: object,
  effects: {
    create: Effect;
    query: Effect;
    detail: Effect,
    update: Effect,
    remove: Effect,
  };
  reducers: {
    setState: Reducer,
  };
}

// @ts-ignore
const Model: ModelType = {
  namespace: 'article',

  state: {
    dataSource: [],
    pagination:{
      current: 1,
      showTotal: (total: any) => `共 ${total} 条记录`,
      total: 0,
    },
    detail:{},
  },

  subscriptions: {
  },

  effects: {
    * remove({ payload}, { call, put }) {
      const { status, data } = yield call(remove, payload);
      if (status === 200){
        yield put({
          type: 'query',
          payload: getLocationQuery()
        })
      }
    },
    * detail({ payload}, { call, put }) {
      const { status, data } = yield call(detail, payload);
      console.log(data)
      if (status === 200){
        yield put({
          type: 'setState',
          payload: {
            detail: data
          }
        })
      }
    },
    * query({ payload}, { call, put }) {
      const {pageNum = 1, pageSize = 10, status: _status} = payload;
      const { status, data, total } = yield call(query, {
        type: articleType,
        pageNum,
        pageSize,
        status: _status
      });
      if (status === 200) {
        console.log(data)
        yield put({
          type: 'setState',
          payload:{
            dataSource: data.data,
            pagination:{
              current: pageNum,
              showTotal: (total: any) => `共 ${total} 条记录`,
              total: data.total,
            }
          }
        })
        // yield put(routerRedux.push('/gmxl'));
      }
    },
    * create({ payload }, { call, put }) {
      const { status, data } = yield call(create, {
        ...payload,
        type: articleType,
      });
      if (status === 200) {
        yield put(routerRedux.push('/gmxl'));
      }
    },
    * update({ payload }, { call, put }) {
      const { status, data } = yield call(update, {
        ...payload,
        type: articleType,
      });
      if (status === 200) {
        yield put(routerRedux.push('/gmxl'));
      }
    },
  },

  reducers: {
    setState(state, action) {
      console.log('========')
      return { ...state, ...action.payload }
    },
  },
};

export default Model;
