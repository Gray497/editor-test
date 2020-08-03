import { Effect, Reducer } from 'umi';
import { query } from '@/services/article';
import { pathToRegexp } from 'path-to-regexp';

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
    query: Effect,
  };
  reducers: {
    setState: Reducer,
  };
}


const PATH = 'www/articles';

function getAricleType(pathname = window.location.pathname) {
  const match = pathToRegexp(`/${PATH}/:id`).exec(pathname);
  if (match && match[1]) {
    return match[1];
  }
  return false;
}

const initState = {
  dataSource: [],
  pagination: {
    current: 1,
    showTotal: (total: any) => `共 ${total} 条记录`,
    total: 0,
  },
  detail: {},
};

// @ts-ignore
const Model: ModelType = {
  namespace: PATH,

  state: initState,

  subscriptions: {
// @ts-ignore
    setup({ dispatch, history }) {
      history.listen((location: any) => {
        const { pathname } = location;
        if (pathname.startsWith(`/${PATH}`) || pathname.startsWith('/www/articles')) {
          dispatch({
            type: 'query',
            payload: {
              ...location.query,
              pageSize: 20,
            },
            back(){
              dispatch({
                type: 'query',
                payload: {
                  ...location.query,
                },
              });
            }
          });
        } else {
          dispatch({ type: 'setState', payload: initState });
        }
      });
    },
  },

  effects: {
    * query({ payload, back }, { call, put, select }) {
      const { pageNum = 1, pageSize = 9999999, articleType, ...restProps } = payload;
      const { status, data, total } = yield call(query, {
        type: getAricleType() || articleType,
        pageNum,
        pageSize,
        status: 1,
        ...restProps,
      });
      if (status === 200) {
        let _data = data.data;
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
        if (_.isFunction(back)){
          back();
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
