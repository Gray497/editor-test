import React from 'react';
import { Table, Space } from 'antd';
import styles from './index.less';
import Basic from './basic';
import { connect, Link, withRouter } from 'umi';

// @ts-ignore
@withRouter
// @ts-ignore
@connect(({ dispatch }) => ({ dispatch }))
export default class SiderDemo extends React.Component {
  render() {
    // console.log(this.props)
    return (
      <Basic/>
    )
  }
}
