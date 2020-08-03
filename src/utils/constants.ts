import React from 'react';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import styles from '../pages/www/articles/articleType/index.less'

export const articleTypes = [
  {
    Icon: UserOutlined, label: '革命先烈', route: '/articles', wwwRoute: '/articles', type: '1', wwwIndexStyle: {
      backgroundSize: '200% 100%',
    },
    cardClassName: classnames(styles.gmxlCardItem)
  },
  { Icon: UserOutlined, label: '立功受奖', route: '/articles', wwwRoute: '/groups', type: '2' },
  { Icon: UploadOutlined, label: '创业先锋', route: '/articles', wwwRoute: '/groups', type: '3' },
  { Icon: UserOutlined, label: '政策文件', route: '/articles', wwwRoute: '/groups', type: '4',
    cardClassName: classnames(styles.cubeCardItem, styles.zcwjCardItem) },
  { Icon: VideoCameraOutlined, label: '办事流程', route: '/articles', wwwRoute: '/groups', type: '5',
    cardClassName: classnames(styles.cubeCardItem, styles.bslcCardItem) },
  { Icon: VideoCameraOutlined, label: '参军入伍', route: '/articles', wwwRoute: '/groups', type: '6',
    cardClassName: classnames(styles.cubeCardItem, styles.cjrwCardItem) },
];
