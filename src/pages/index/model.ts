import { Effect, Reducer } from 'umi';
import { history } from 'umi';
import { getStatus } from '@/services/index';
import {getLocationQuery} from '@/utils/help';

const articleType = 1;

export interface StateType {
  status: object,
}

export interface ModelType {
  namespace: string;
  state: StateType;
  subscriptions: object,
  effects: {
    status: Effect;
  };
  reducers: {
    setState: Reducer,
  };
}

const PATH = 'index';

// @ts-ignore
const Model: ModelType = {
  namespace: PATH,

  state: {
    status:{},
    // status: undefined,
  },

  subscriptions: {
// @ts-ignore
    setup({ dispatch, history }) {
      history.listen((location: any) => {
        // console.log(location);
        const {id, type} = location.query;
        if (location.pathname === `/${PATH}`){
          dispatch({ type: 'getStatus', payload:{id} })
        }
      });
    },
  },

  effects: {
    * getStatus({ payload}, { call, put }) {
      const { status, data } = yield call(getStatus, payload);
      console.log(data)
      if (status === 200){
        yield put({
          type: 'setState',
          payload: {
            status: data
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
