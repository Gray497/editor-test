import { Effect, Reducer } from 'umi';
import { query } from '@/services/article';
import _ from 'lodash';

const articleType = 3;

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

const PATH = 'www/cyxf';

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
        if (location.pathname === `/${PATH}`){
          dispatch({ type: 'query', payload: location.query })
        }
      });
    },
  },

  effects: {
    * query({ payload}, { call, put }) {
      const { pageNum = 1, pageSize = 999 } = payload;
      const { status, data, total } = yield call(query, {
        type: articleType,
        pageNum,
        pageSize,
        status: 1
      });
      let _data = _.groupBy(data.data, 'groupName');
      console.log(_data)
      console.log(data.data)
      if (status === 200) {
        yield put({
          type: 'setState',
          payload: {
            dataSource: _data,
            pagination: {
              current: pageNum,
              showTotal: (total: any) => `共 ${total} 条记录`,
              pageSize,
              total: data.total,
            }
          }
        })
      }
    }
  },

  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload }
    },
  },
};

export default Model;
