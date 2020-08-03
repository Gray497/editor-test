import React from 'react';
import styles from './index.less';
import { connect } from 'umi';

const PATH = 'www/articleDetail';

// @ts-ignore
@connect(({ [PATH]: _model }, dispatch) => ({
  dispatch,
  _model,
}))
export default class Index extends React.Component {

  render() {
    const { _model: { detail }, location } = this.props;
    return <div className={styles.wrap}>
      <div className={styles.contentWrap}>
        <div className={styles.title}>
          <div>{detail.title}</div>
        </div>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: detail.content, }}/>
        </div>
      </div>
    </div>;
  }
}
