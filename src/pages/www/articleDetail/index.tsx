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
    const { _model: { detail }, location } = this.props;
    console.log(this.props);
    return <div className={styles.wrap}>
      <div className={styles.contentWrap}>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: detail.content, }}/>
      </div>
    </div>;
  }
}
