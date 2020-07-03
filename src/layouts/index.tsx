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
import { Link } from 'umi';
import moment from 'moment';

const { SubMenu } = Menu;

const getMenuData = () => [
  { icon: <UserOutlined/>, label: '字典管理', route: '/' },
  { icon: <UserOutlined/>, label: '用户管理', route: '/' },
  { icon: <UploadOutlined/>, label: '菜单管理', route: '/index2' },
  { icon: <UserOutlined/>, label: '角色管理', route: '/' },
  { icon: <VideoCameraOutlined/>, label: '日志管理', route: '/index' },
];

const { Header, Sider, Content } = Layout;

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
    const { children, location } = this.props;

    if (location.pathname === '/login') {
      return children;
    }

    return <div>
      <Layout className={styles.container}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.logo}/>
          <Menu theme="dark" mode="inline">
            {getMenuData().map(({ icon, label, route }, index) => <Menu.Item key={index} icon={icon} onClick={() => {
                console.log(route);
              }}>
                <Link to={route} key={index}>{label}</Link>
              </Menu.Item>,
            )}
          </Menu>
        </Sider>
        <Layout className={styles['site-layout']}>
          <Header className={styles['site-layout-background']} style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: this.toggle,
            })}
            <Menu key="user" mode="horizontal" onClick={(key) => {
              console.log(123, key);
            }}>
              <SubMenu title={<div className={styles.rightContent}>
                <span style={{ color: '#999',
                  marginRight: 4 }}>
                Hi，超级管理员</span>
                <Avatar icon={<UserOutlined />} />
              </div>}>
                <Menu.Item key="SignOut">
                  登出
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Content
            className={styles['site-layout-background']}
            style={{
              margin: '24px 16px',
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

