import React, { Fragment } from 'react';
import styles from './index.less';
import { Layout, Menu, Popover, Badge, List, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BellOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect, Link } from 'umi';
import moment from 'moment';

const { SubMenu } = Menu;

const getMenuData = () => [
  { icon: <UserOutlined/>, label: '首页', route: '/' },
  { icon: <UserOutlined/>, label: '革命先烈-管理', route: '/gmxl' },
  { icon: <UserOutlined/>, label: '立功受奖-管理', route: '/1' },
  { icon: <UploadOutlined/>, label: '创业先锋-管理', route: '/index2' },
  { icon: <UserOutlined/>, label: '政策文件-管理', route: '/d' },
  { icon: <VideoCameraOutlined/>, label: '办事流程-管理', route: '/index' },
];

const { Header, Sider, Content } = Layout;

// @ts-ignore
@connect(({ dispatch }) => ({ dispatch }))
export default class BasicLayout extends React.Component {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {

    // @ts-ignore
    const { children, location, dispatch } = this.props;
    const {type} = location.query;

    if (location.pathname === '/login') {
      return children;
    }

    return <div>
      <Layout className={styles.container}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.logo}/>
          {location.pathname}
          <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
            {getMenuData().map(({ icon, label, route }, index) => <Menu.Item key={route} icon={icon} onClick={() => {
                console.log(route);
              }}>
                <Link to={route} key={index}>{label}</Link>
              </Menu.Item>,
            )}
          </Menu>
        </Sider>
        <Layout className={styles['site-layout']}>
          <Header className={styles.header} style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: this.toggle,
            })}
            <Menu key="user" mode="horizontal" onClick={(param) => {
              const {key} = param;
              if (key === 'logout'){
                dispatch({
                  type: 'app/logout'
                })
              }
            }}>
              <SubMenu title={<div className={styles.rightContent}>
                <span style={{ color: '#999',
                  marginRight: 4 }}>
                Hi，超级管理员</span>
                <Avatar icon={<UserOutlined />} />
              </div>}>
                <Menu.Item key="logout">
                  登出
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>

          {type && <div className={styles.breadcrumb}>
            <Link to={location.pathname}>{getMenuData().find(val => val.route === location.pathname).label}</Link>
            <span className={styles.breadSplit}>/</span>
            <span>{type === 'create' ? '新建' : '编辑'}</span>
          </div>}
          <Content
            className={styles['site-layout-background']}
            style={{
              // margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>;
  }
};

