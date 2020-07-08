
import React from 'react'
import styles from './index.less'
import { connect, Link } from 'umi';

function renderItem (val){
  return <Link to={`/www${val.route}`}><div className={styles.item}>{val.label}</div></Link>
}

export default (props) => {
  return <div className={styles.wrap}>
    <div className={styles.content}>
      <div className={styles.content1}>
        {[
          { label: '革命先烈', route: '/gmxl' },
          { label: '立功受奖', route: '/lgsj' },
        ].map(renderItem)}
      </div>
      <div className={styles.content2}>
        {[
          { label: '创业先锋', route: '/cyxf' },
          { label: '政策文件', route: '/zcwj' },
          { label: '办事流程', route: '/bslc' },
        ].map(renderItem)}
      </div>
    </div>
  </div>
}
