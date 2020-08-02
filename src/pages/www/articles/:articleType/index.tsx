import React from 'react';
import styles from './index.less';
import { connect, Link } from 'umi';
import { Row, Col, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import config from '@/utils/config';
import defaultPic from '../../assets/zhongxin.png'

const { Paragraph } = Typography;

function renderItem(val, location) {
  return <Col key={val.id} span={6}>
    <Link to={`/www/articleDetail?id=${val.id}&wwwType=${location.query.wwwType}`}>
      <div className={styles.item}>
        {val.cover ? <img className={styles.pic} src={`${config.API}${val.cover}`} alt=""/> :
          <img className={styles.pic} src={defaultPic} alt=""/>
          }
        <div className={styles.title}>{val.title}</div>
        <div className={styles.desc}><Paragraph ellipsis={{ rows: 3}}>{val.desc}</Paragraph></div>
      </div>
    </Link>
  </Col>;
}

const PATH = 'www/gmxl';

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
