import React from 'react';
import { useSelector, useHistory, useLocation } from 'umi';
import styles from './index.less';
import {Row, Col} from 'antd';
import { pathToRegexp } from 'path-to-regexp';

const PATH = 'www/groups';


function getAricleType(pathname = window.location.pathname) {
  const match = pathToRegexp(`/${PATH}/:id`).exec(pathname);
  if (match && match[1]) {
    return match[1];
  }
  return false;
}

export default function Group() {
  const { pagination, dataSource } = useSelector(state => state[PATH]);
  const history = useHistory();
  const {query} = useLocation();

  return <Row className={styles.wrap} gutter={24}>
    {dataSource.map(val => <Col key={val.id} span={6} onClick={() => {
      history.push(`/www/articles?articleType=${getAricleType()}&groupId=${val.id}`)
    }}>
      <div className={styles.item}>
        {val.groupName}
      </div>
    </Col>)}
  </Row>
}
