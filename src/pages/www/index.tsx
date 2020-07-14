import React from 'react';
import styles from './index.less';
import { connect, Link } from 'umi';
import classnames from 'classnames';

function renderItem(val) {
  return <Link to={`/www${val.route}`} key={val.route}>
    <div className={classnames(styles.item, val.className)}>{val.label}</div>
  </Link>;
}

export default (props) => {
  return <div className={styles.wrap}>
    <div className={styles.content}>
      <div className={styles.content1}>
        {[
          { label: `革命先烈`, route: `/gmxl?wwwType=1`, className: styles.item1 },
          { label: `立功受奖`, route: `/lgsj?wwwType=2`, className: styles.item2 },
        ].map(renderItem)}
      </div>
      <div className={styles.content2}>
        {[
          { label: `创业先锋`, route: `/cyxf?wwwType=3`, className: styles.itemBottom },
          { label: `政策文件`, route: `/zcwj?wwwType=4`, className: styles.itemBottom },
          { label: `参军入伍`, route: `/cjrw?wwwType=5`, className: styles.itemBottom },
          { label: `办事流程`, route: `/bslc?wwwType=6`, className: styles.itemBottom },
        ].map(renderItem)}
      </div>
    </div>
  </div>;
}
