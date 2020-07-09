import React from 'react';
import { connect } from 'umi';
import CommonArticle from '@/components/CommonArticle'

const PATH = 'home'
// @ts-ignore
@connect(({[PATH]: _model}, dispatch) => ({
  // dispatch,
  _model
}))
export default class Index extends React.Component {
  render() {
    return <div>123</div>;
  }
}
