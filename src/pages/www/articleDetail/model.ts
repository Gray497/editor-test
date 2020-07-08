// import { Effect, Reducer } from 'umi';
// import { history } from 'umi';
// import { create, query, detail, update, remove } from '@/services/article';
// import {getLocationQuery} from '@/utils/help';
//
// // const articleType = 1;
//
// export interface StateType {
//   dataSource: Array<any>,
//   pagination: Object,
//   detail: Object,
// }
//
// export interface ModelType {
//   namespace: string;
//   state: StateType;
//   subscriptions: object,
//   effects: {
//     detail: Effect,
//     query: Effect,
//   };
//   reducers: {
//     setState: Reducer,
//   };
// }
//
// const PATH = 'articleDetail';
//
// // @ts-ignore
// const Model: ModelType = {
//   namespace: PATH,
//
//   state: {
//     dataSource: [],
//     pagination:{
//       current: 1,
//       showTotal: (total: any) => `共 ${total} 条记录`,
//       total: 0,
//     },
//     detail:{},
//     // status: undefined,
//   },
//
//   subscriptions: {
// // @ts-ignore
//     setup({ dispatch, history }) {
//       history.listen((location: any) => {
//         // console.log(location);
//         const {id, type} = location.query;
//         if (location.pathname === `/${PATH}`){
//           if (!!type && !!id){
//             dispatch({ type: 'detail', payload:{id} })
//           } else {
//             dispatch({ type: 'query', payload: location.query })
//             dispatch({
//               type: 'setState',
//               payload: {
//                 detail: {  }
//               }
//             })
//           }
//         }
//       });
//     },
//   },
//
//   effects: {
//     * detail({ payload}, { call, put }) {
//       const { status, data } = yield call(detail, payload);
//       console.log(data)
//       if (status === 200){
//         yield put({
//           type: 'setState',
//           payload: {
//             detail: data
//           }
//         })
//       }
//     },
//   },
//
//   reducers: {
//     setState(state, action) {
//       return { ...state, ...action.payload }
//     },
//   },
// };
//
// export default Model;
