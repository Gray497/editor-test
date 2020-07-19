import { Effect, Reducer } from 'umi';
import _ from 'lodash';
import { history } from 'umi';
import { query } from '../../group/services';
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
  };
  reducers: {
    setState: Reducer,
  };
}

const PATH = 'www/group';

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
        if (location.pathname === `/${PATH}`) {
          dispatch({ type: 'query', payload: location.query });
        }
      });
    },
  },

  effects: {
    * query({ payload, onBack }, { call, put, select }) {
      const { pageNum = 1, pageSize = 9999, wwwType: articleType } = payload;
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
  },

  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};

export default Model;
