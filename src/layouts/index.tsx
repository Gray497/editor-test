import React from 'react';
import styles from './index.less';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Link } from 'umi';

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

    const { children } = this.props;

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

