import { Effect, Reducer } from 'umi';
import _ from 'lodash';
import { history } from 'umi';
import { create, query, detail, update, remove, setTop } from './services';
import { getLocationQuery } from '@/utils/help';

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
    top: Effect,
    setTop: Effect,
  };
  reducers: {
    setState: Reducer,
  };
}

const PATH = 'admin/groups';

// @ts-ignore
// @ts-ignore
const Model: ModelType = {
  namespace: PATH,

  state: {
    dataSource: [],
    pagination: {
      current: 1,
      showTotal: (total: any) => `共 ${total} 条记录`,
      total: 0,
    },
    detail: {},
    // status: undefined,
  },

  subscriptions: {
// @ts-ignore
    setup({ dispatch, history }) {
      history.listen((location: any) => {
        // console.log(location);
        const { id, type } = location.query;
        if (location.pathname === `/${PATH}`) {
          dispatch({ type: 'query', payload: location.query });
          dispatch({
            type: 'setState',
            payload: {
              detail: {},
            },
          });
        }
      });
    },
  },

  effects: {
    * setTop({ payload }, { call, put }) {
      const { status } = yield call(setTop, {
        ...payload,
      });
      if (status === 200) {
        history.push(window.location.pathname + window.location.search);
      }
    },
    * query({ payload, onBack }, { call, put, select }) {
      const { pageNum = 1, pageSize = 10, articleType } = payload;
      const typeObj = !!articleType ? {
        type: articleType,
      } : {

      };
      const { status, data } = yield call(query, {
        pageNum,
        pageSize,
        ...typeObj,
      });
      if (status === 200) {
        yield put({
          type: 'setState',
          payload: {
            dataSource: data.data,
            pagination: {
              current: pageNum,
              showTotal: (total: any) => `共 ${total} 条记录`,
              pageSize,
              total: data.total,
            },
          },
        });
      }
    },
    * remove({ payload }, { call, put }) {
      const { status } = yield call(remove, payload);
      if (status === 200) {
        yield put({
          type: 'query',
          payload: getLocationQuery(),
        });
      }
    },
    * detail({ payload }, { call, put }) {
      const { status, data } = yield call(detail, payload);
      console.log(data);
      if (status === 200) {
        yield put({
          type: 'setState',
          payload: {
            detail: data,
          },
        });
      }
    },
    * create({ payload, onBack }, { call, put }) {
      const { status } = yield call(create, {
        ...payload,
      });
      if (status === 200) {
        history.push(window.location.pathname);
        if (_.isFunction(onBack)){
          onBack();
        }
      }
    },
    * update({ payload, onBack }, { call, put }) {
      const { status } = yield call(update, {
        ...payload,
      });
      if (status === 200) {
        history.push(window.location.pathname);
        if (_.isFunction(onBack)){
          onBack();
        }
      }
    },
  },

  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};

export default Model;
