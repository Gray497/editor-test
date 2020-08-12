import React from 'react';
import { Redirect } from 'umi';
// import { Statistic, Row, Col } from 'antd';

export default function(){
    return <Redirect to={'/admin/dashboard'}/>
}

// const PATH = 'admin/dashboard';
// // @ts-ignore
// @connect(({ [PATH]: _model }, dispatch) => ({
//   // dispatch,
//   _model,
// }))
// export default class Index extends React.Component {
//   render() {
//     return <Redirect to={'/admin'}/>
//   }
// }
