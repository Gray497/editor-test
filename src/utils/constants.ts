import React from 'react';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

export const articleTypes = [
  // { Icon: UserOutlined, label: '革命先烈', route: '/gmxl', type: 1, },
  // { Icon: UserOutlined, label: '立功受奖', route: '/lgsj', type: 2, },
  // { Icon: UploadOutlined, label: '创业先锋', route: '/cyxf', type: 3, },
  // { Icon: UserOutlined, label: '政策文件', route: '/zcwj', type: 4, },
  // { Icon: VideoCameraOutlined, label: '办事流程', route: '/bslc', type: 5, },
  // { Icon: VideoCameraOutlined, label: '参军入伍', route: '/cjrw', type: 6, },
  {
    Icon: UserOutlined, label: '革命先烈', route: '/articles', wwwRoute: '/articles', type: 1, wwwIndexStyle: {
      backgroundSize: '200% 100%',
    },
  },
  { Icon: UserOutlined, label: '立功受奖', route: '/articles', wwwRoute: '/groups', type: 2 },
  { Icon: UploadOutlined, label: '创业先锋', route: '/articles', wwwRoute: '/groups', type: 3 },
  { Icon: UserOutlined, label: '政策文件', route: '/articles', wwwRoute: '/groups', type: 4 },
  { Icon: VideoCameraOutlined, label: '办事流程', route: '/articles', wwwRoute: '/groups', type: 5 },
  { Icon: VideoCameraOutlined, label: '参军入伍', route: '/articles', wwwRoute: '/groups', type: 6 },
];
