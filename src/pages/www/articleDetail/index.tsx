import React from 'react';
import styles from './index.less';
import { connect, Link } from 'umi';

const PATH = 'www/articleDetail';

// @ts-ignore
@connect(({ [PATH]: _model }, dispatch) => ({
  dispatch,
  _model,
}))
export default class Index extends React.Component {

  render() {
    const { _model:{detail}, location } = this.props;
    console.log(this.props);
    return <div className={styles.wrap}>
      {detail.content}
      <div dangerouslySetInnerHTML={{
        __html: detail.content
      }}></div>
      {/*{[*/}
      {/*  {route: '/gmxl'}*/}
      {/*]}*/}
    </div>;
  }
}
