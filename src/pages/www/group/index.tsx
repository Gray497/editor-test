import React, { useState } from 'react';
import { useSelector, useHistory, useLocation, useDispatch } from 'umi';
import styles from './index.less';
import {Row, Col} from 'antd';
import {articleTypes} from '@/utils/constants'

const PATH = 'www/group';

export default function Group() {
  const { pagination, dataSource } = useSelector(state => state[PATH]);
  const history = useHistory();
  const {query} = useLocation();

  return <Row className={styles.wrap} gutter={20}>
    {dataSource.map(val => <Col key={val.id} span={6} className={styles.item} onClick={() => {
      // @ts-ignore
      const route = articleTypes.find(item => item.type.toString() === query.wwwType).route;
      history.push(`/www${route}?wwwType=${query.wwwType}&groupId=${val.id}`)
    }}>
      {val.groupName}
    </Col>)}
  </Row>
}
