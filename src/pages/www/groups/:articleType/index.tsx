import React, { useState } from 'react';
import { useSelector, useHistory, useLocation, useDispatch } from 'umi';
import styles from './index.less';
import {Row, Col} from 'antd';
import {articleTypes} from '@/utils/constants'

const PATH = 'www/groups';

export default function Group() {
  const { pagination, dataSource } = useSelector(state => state[PATH]);
  const history = useHistory();
  const {query} = useLocation();

  return <Row className={styles.wrap} gutter={24}>
    {dataSource.map(val => <Col key={val.id} span={6} onClick={() => {
      history.push(`/www/articles?wwwType=${query.wwwType}&groupId=${val.id}`)
    }}>
      <div className={styles.item}>
        {val.groupName}
      </div>
    </Col>)}
  </Row>
}
