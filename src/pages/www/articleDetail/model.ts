import { Effect, Reducer } from 'umi';
import { detail } from '@/services/article';

export interface StateType {
  detail: Object,
}

export interface ModelType {
  namespace: string;
  state: StateType;
  subscriptions: object,
  effects: {
    detail: Effect,
  };
  reducers: {
    setState: Reducer,
  };
}

const PATH = 'www/articleDetail';

// @ts-ignore
const Model: ModelType = {
  namespace: PATH,

  state: {
    detail:{},
    // status: undefined,
  },

  subscriptions: {
// @ts-ignore
    setup({ dispatch, history }) {
      history.listen((location: any) => {
        // console.log(location);
        const {id} = location.query;
        if (location.pathname === `/${PATH}`){
          if (!!id){
            dispatch({ type: 'detail', payload:{id} })
          }
        }
      });
    },
  },

  effects: {
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
  },

  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload }
    },
  },
};

export default Model;
