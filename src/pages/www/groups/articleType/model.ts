import { Effect, Reducer } from 'umi';
import { query } from '../../../groups/services';
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
    create: Effect;
    query: Effect;
    detail: Effect,
    update: Effect,
    remove: Effect,
    top: Effect,
  };
  reducers: {
    setState: Reducer,
  };
}

const PATH = 'www/groups';

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
    // status: undefined,
  },

  subscriptions: {
// @ts-ignore
    setup({ dispatch, history }) {
      history.listen((location: any) => {
        // console.log(location);
        const { id, type } = location.query;
        if (location.pathname.startsWith(`/${PATH}`)) {
          dispatch({ type: 'query', payload: location.query });
        }
      });
    },
  },

  effects: {
    * query({ payload, onBack }, { call, put, select }) {
      const { pageNum = 1, pageSize = 9999 } = payload;
      const { status, data } = yield call(query, {
        pageNum,
        pageSize,
        type: getAricleType(),
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
  },

  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};

export default Model;
