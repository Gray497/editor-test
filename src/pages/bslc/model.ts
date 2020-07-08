import { Effect, Reducer } from 'umi';
import { history } from 'umi';
import { create, query, detail, update, remove } from '@/services/article';
import {getLocationQuery} from '@/utils/help';

const articleType = 5;

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

const PATH = 'bslc';

// @ts-ignore
const Model: ModelType = {
  namespace: PATH,

  state: {
    dataSource: [],
    pagination:{
      current: 1,
      showTotal: (total: any) => `共 ${total} 条记录`,
      total: 0,
    },
    detail:{},
    // status: undefined,
  },

  subscriptions: {
// @ts-ignore
    setup({ dispatch, history }) {
      history.listen((location: any) => {
        // console.log(location);
        const {id, type} = location.query;
        if (location.pathname === `/${PATH}`){
          if (!!type && !!id){
            dispatch({ type: 'detail', payload:{id} })
          } else {
            dispatch({ type: 'query', payload: location.query })
            dispatch({
              type: 'setState',
              payload: {
                detail: {  }
              }
            })
          }
        }
      });
    },
  },

  effects: {
    * query({ payload}, { call, put, select }) {
      const {pageNum = 1, pageSize = 10, status: _status} = payload;
      const { status, data } = yield call(query, {
        type: articleType,
        pageNum,
        pageSize,
        status: _status
      });
      if (status === 200) {
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
      }
    },
    * remove({ payload}, { call, put }) {
      const { status } = yield call(remove, payload);
      if (status === 200){
        yield put({
          type: 'query',
          payload: getLocationQuery()
        })
      }
    },
    * detail({ payload}, { call, put }) {
      const { status, data } = yield call(detail, payload);
      if (status === 200){
        yield put({
          type: 'setState',
          payload: {
            detail: data
          }
        })
      }
    },
    * create({ payload }, { call, put }) {
      const { status } = yield call(create, {
        ...payload,
        type: articleType,
      });
      if (status === 200) {
        history.push(window.location.pathname)
      }
    },
    * update({ payload }, { call, put }) {
      const { status } = yield call(update, {
        ...payload,
        type: articleType,
      });
      if (status === 200) {
        history.push(window.location.pathname)
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
