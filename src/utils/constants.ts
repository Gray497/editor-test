import React from 'react';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

export const articleTypes = [
  { Icon: UserOutlined, label: '革命先烈', route: '/gmxl', type: 1, },
  { Icon: UserOutlined, label: '立功受奖', route: '/lgsj', type: 2, },
  { Icon: UploadOutlined, label: '创业先锋', route: '/cyxf', type: 3, },
  { Icon: UserOutlined, label: '政策文件', route: '/zcwj', type: 4, },
  { Icon: VideoCameraOutlined, label: '办事流程', route: '/bslc', type: 5, },
  { Icon: VideoCameraOutlined, label: '参军入伍', route: '/cjrw', type: 6, },
];
