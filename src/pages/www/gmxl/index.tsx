
import React from 'react'
import styles from './index.less'
import { connect, Link } from 'umi';
import { Row, Col } from 'antd';
import config from '@/utils/config';


function renderItem (val, location){
  return <Col key={val.id} span={6}>
    <Link to={`${location.pathname}?id=${val.id}`}>
    <div className={styles.item}>
      <img className={styles.pic} src={`${config.API}${val.cover}`} alt=""/>
      <div className={styles.title}>{val.title}</div>
      <div className={styles.desc}>{val.desc}</div>
    </div>
  </Link>
  </Col>
}

const PATH = 'www/gmxl';

// @ts-ignore
@connect(({[PATH]: _model}, dispatch) => ({
  dispatch,
  _model
}))
export default class Index extends React.Component {

  render(){
    const {_model:{dataSource}, location} = this.props;

    return <div className={styles.wrap}>
      <Row gutter={16} className={styles.itemWrap}>
        {dataSource.map(val => renderItem(val, location))}
      </Row>
    </div>
  }
}
