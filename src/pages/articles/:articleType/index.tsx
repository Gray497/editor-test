import React from 'react';
import { connect } from 'umi';
import CommonArticle from '@/components/CommonArticle'

const PATH = 'articles'
// @ts-ignore
@connect(({[PATH]: _model}, dispatch) => ({
  // dispatch,
  _model
}))
export default class Index extends React.Component {
  render() {
    // return 1;
    return <CommonArticle {...this.props} PATH={PATH}/>;
  }
}
