import { Effect, Reducer } from 'umi';
import { history } from 'umi';
import { create, query, detail, update, remove, setTop, queryGroup } from '@/services/article';
import { getLocationQuery } from '@/utils/help';
import { pathToRegexp } from 'path-to-regexp';

export interface StateType {
  dataSource: Array<any>,
  pagination: Object,
  detail: Object,
  groups: Array<any>
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
    queryGroup: Effect,
  };
  reducers: {
    setState: Reducer,
  };
}

const PATH = 'articles';

function getAricleType(pathname = window.location.pathname) {
  const match = pathToRegexp(`/${PATH}/:id`).exec(pathname);
  if (match && match[1]) {
    return match[1];
  }
  return false;
}

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
    groups: [],
    // status: undefined,
  },

  subscriptions: {
// @ts-ignore
    setup({ dispatch, history }) {
      history.listen((location: any) => {
        const { id, type } = location.query;
        if (location.pathname.startsWith(`/${PATH}`)) {
          if (!!type) {
            dispatch({
              type: 'queryGroup',
              payload: {
                type: getAricleType(),
              },
            });
            if (!!id) {
              dispatch({ type: 'detail', payload: { id } });
            }
          } else {
            dispatch({ type: 'query', payload: location.query });
            dispatch({
              type: 'setState',
              payload: {
                detail: {},
              },
            });
          }
        }
      });
    },
  },

  effects: {
    * query({ payload }, { call, put, select }) {
      const { pageNum = 1, pageSize = 10, status: _status, title } = payload;
      const { status, data } = yield call(query, {
        type: getAricleType(),
        pageNum,
        pageSize,
        status: _status,
        title,
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
    * queryGroup({ payload }, { call, put }) {
      const { status, data } = yield call(queryGroup, {
        pageNum: 1,
        pageSize: 9999,
        type: getAricleType(),
      });
      if (status === 200) {
        console.log(data);
        yield put({
          type: 'setState',
          payload: {
            groups: data.data,
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
    * create({ payload }, { call, put }) {
      const { status } = yield call(create, {
        ...payload,
        type: getAricleType(),
      });
      if (status === 200) {
        history.push(window.location.pathname);
      }
    },
    * update({ payload }, { call, put }) {
      const { status } = yield call(update, {
        ...payload,
        type: getAricleType(),
      });
      if (status === 200) {
        history.push(window.location.pathname);
      }
    },
    * setTop({ payload }, { call, put }) {
      const { status } = yield call(setTop, {
        ...payload,
        type: getAricleType(),
      });
      if (status === 200) {
        history.push(window.location.pathname + window.location.search);
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
