import React from 'react';
import styles from './index.less';
import { connect, Link } from 'umi';
import { Row, Col, Typography, Avatar } from 'antd';
import classnames from 'classnames';
import config from '@/utils/config';
import { pathToRegexp } from 'path-to-regexp';
import _ from 'lodash';
import { articleTypes } from '@/utils/constants';

const { Paragraph } = Typography;


const PATH = 'www/articles'

function getAricleType(pathname = window.location.pathname) {
  const match = pathToRegexp(`/${PATH}/:id`).exec(pathname);
  if (match && match[1]) {
    return match[1];
  }
  return false;
}

function renderItem(val, location, group) {
  const type = location.query.articleType || getAricleType();
  const articleConfig = _.find(articleTypes, val => val.type === type) || {};
  console.log(articleConfig, articleConfig.cardClassName)
  return <Col key={val.id} span={6}>
    <Link to={`/www/articleDetail?id=${val.id}&articleType=${type}`}>
      <div className={classnames(styles.item, articleConfig.cardClassName)}>
        {
          val.cover ?
            <img className={styles.pic} src={`${config.API}${val.cover}`} alt=""/>
            : (
              !_.isEmpty(group) && !_.isEmpty(group.cover) ?
                <img className={styles.pic} src={`${config.API}${group.cover}`} alt=""/>
                :
                <div className={classnames(styles.pic, styles.image)} alt=""/>
            )
        }
        <div className={styles.title}>{val.title}</div>
        <div className={styles.desc}><Paragraph ellipsis={{ rows: 3}}>{val.desc}</Paragraph></div>
      </div>
    </Link>
  </Col>;
}

// @ts-ignore
@connect(({ [PATH]: _model, app }, dispatch) => ({
  dispatch,
  _model,
  app,
}))
export default class Index extends React.Component {

  render() {
    // console.log(this.props)
    const { _model: { dataSource }, location, app: {group} } = this.props;

    return <Row gutter={30} className={styles.itemWrap}>
      {dataSource.map(val => renderItem(val, location, group))}
    </Row>;
  }
}
