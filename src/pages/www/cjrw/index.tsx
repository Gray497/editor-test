import React from 'react';
import styles from './index.less';
import { connect, Link } from 'umi';
import { Row, Col, Typography } from 'antd';
import config from '@/utils/config';

const { Paragraph } = Typography;

function renderItem(val, location) {
  return <Col key={val.id} span={6}>
    <Link to={`/www/articleDetail?id=${val.id}&wwwType=${location.query.wwwType}`}>
      <div className={styles.item}>
        <img className={styles.pic} src={`${config.API}${val.cover}`} alt=""/>
        <div className={styles.title}>{val.title}</div>
        <div className={styles.desc}><Paragraph ellipsis={{ rows: 4 }}>{val.desc}</Paragraph></div>
      </div>
    </Link>
  </Col>;
}

const PATH = 'www/cjrw';

// @ts-ignore
@connect(({ [PATH]: _model }, dispatch) => ({
  dispatch,
  _model,
}))
export default class Index extends React.Component {

  render() {
    const { _model: { dataSource }, location } = this.props;

    return <Row gutter={30} className={styles.itemWrap}>
      {dataSource.map(val => renderItem(val, location))}
    </Row>;
  }
}
