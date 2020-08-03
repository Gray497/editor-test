import React from 'react';
import styles from './index.less';
import { Link } from 'umi';
import classnames from 'classnames';
import { articleTypes } from '@/utils/constants';

function renderItem(val) {
  const route = `/www${val.wwwRoute}/${val.type}`;
  return <Link to={route} key={route}>
    <div className={classnames(styles.item, styles.itemBottom)} style={val.wwwIndexStyle}>{val.label}</div>
  </Link>;
}

export default (props) => {


  return <div className={styles.wrap}>
    <div className={styles.content}>
      <div className={styles.content2}>
        {articleTypes.map(renderItem)}
      </div>
    </div>
  </div>;
}
