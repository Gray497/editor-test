import React from 'react';
import styles from './index.less';
import { connect, Link } from 'umi';
import classnames from 'classnames';
import { articleTypes } from '@/utils/constants';

function renderItem(val) {
  const route = `/www${val.wwwRoute}/${val.type}`;
  console.log(val.wwwIndexStyle)
  return <Link to={route} key={route}>
    <div className={classnames(styles.item, styles.itemBottom)} style={val.wwwIndexStyle}>{val.label}</div>
  </Link>;
}

export default (props) => {
  return <div className={styles.wrap}>
    <div className={styles.content}>
      {/*<div className={styles.content1}>*/}
      {/*  {[*/}
      {/*    { label: `革命先烈`, route: `/gmxl?wwwType=1`, className: styles.item1 },*/}
      {/*    { label: `立功受奖`, route: `/lgsj?wwwType=2`, className: styles.item2 },*/}
      {/*  ].map(renderItem)}*/}
      {/*</div>*/}
      <div className={styles.content2}>
        {articleTypes.map(renderItem)}
        {/*{[*/}
        {/*  { label: `革命先烈`, route: `/gmxl?wwwType=1`, className: styles.itemBottom, style: {backgroundSize: '200% 100%'} },*/}
        {/*  { label: `立功受奖`, route: `/groups?wwwType=2`, className: styles.itemBottom },*/}
        {/*  { label: `创业先锋`, route: `/groups?wwwType=3`, className: styles.itemBottom },*/}
        {/*  { label: `政策文件`, route: `/groups?wwwType=4`, className: styles.itemBottom },*/}
        {/*  { label: `办事流程`, route: `/groups?wwwType=5`, className: styles.itemBottom },*/}
        {/*  { label: `参军入伍`, route: `/groups?wwwType=6`, className: styles.itemBottom },*/}
        {/*].map(renderItem)}*/}
      </div>
    </div>
  </div>;
}
