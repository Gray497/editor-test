import React, { Fragment } from 'react';
import styles from './index.less';
import { Layout, Menu, Popover, Badge, List, Avatar, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
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
  { icon: <UserOutlined/>, label: '首页', route: '/index/dashboard', type: 999, },
  { icon: <UserOutlined/>, label: '革命先烈', route: '/gmxl', type: 1, },
  { icon: <UserOutlined/>, label: '立功受奖', route: '/lgsj', type: 2, },
  { icon: <UploadOutlined/>, label: '创业先锋', route: '/cyxf', type: 3, },
  { icon: <UserOutlined/>, label: '政策文件', route: '/zcwj', type: 4, },
  { icon: <VideoCameraOutlined/>, label: '办事流程', route: '/bslc', type: 5, },
];

const { Header, Sider, Content } = Layout;

// @ts-ignore
@connect(({'app': _model}, dispatch) => ({
  // dispatch,
  _model
}))
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
    const { children, location, dispatch, _model, history }  = this.props;
    const { type, wwwType } = location.query;
    // const {wwwType} = _model;

    if (location.pathname === '/'){
      history.push('/index/dashboard');
    }

    if (location.pathname === '/login') {
      return children;
    }

    if (location.pathname.startsWith('/www')) {
      return <div className={styles.wwwWrap}>
        <div className={styles.top}>
          {/*<img src="" alt=""/>*/}
          <div style={{ width: 126, height: 76, marginRight: 20, background: '#aaaaaa' }}></div>
          <div className={styles.title}>
            <div>
              { (getMenuData().find(val => {
                return val.type.toString() === wwwType
              }) || {}).label || '清远市清新区退役军人事务局'}
            </div>
            { location.pathname === '/www/articleDetail' ? <div className={styles.back} onClick={() => {
                history.push(`/www${(getMenuData().find(val => {
                  return val.type.toString() === wwwType
                }) || {}).route}`)
              }}>
              返回上级
            </div>
              :
              (
                location.pathname !== '/www' && <div className={styles.back} onClick={() => {
                  history.push('/www')
                }}>
                  返回菜单
                </div>
              )
            }
          </div>
        </div>
        <div className={styles.wwwContent}>
          {children}
        </div>
      </div>;
    }

    return <div>
      <ConfigProvider locale={zhCN}>
        <Layout className={styles.container}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className={styles.logo}/>
            {location.pathname}
            <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
              {getMenuData().map(({ icon, label, route }, index) => <Menu.Item key={route} icon={icon}>
                  <Link to={route} key={index}>{label}-管理</Link>
                </Menu.Item>
              )}
              <Menu.Item icon={<VideoCameraOutlined/>}>
                <Link to={'/www'}>前台页面</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className={styles['site-layout']}>
            <Header className={styles.header} style={{ padding: 0 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: styles.trigger,
                onClick: this.toggle,
              })}
              <Menu key="user" mode="horizontal" onClick={(param) => {
                const { key } = param;
                if (key === 'logout') {
                  dispatch({
                    type: 'app/logout',
                  });
                }
              }}>
                <SubMenu title={<div className={styles.rightContent}>
                <span style={{
                  color: '#999',
                  marginRight: 4,
                }}>
                Hi，超级管理员</span>
                  <Avatar icon={<UserOutlined/>}/>
                </div>}>
                  <Menu.Item key="logout">
                    登出
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Header>

            {type && <div className={styles.breadcrumb}>
              <Link to={location.pathname}>
                {
                  // @ts-ignore
                  getMenuData().find(val => val.route === location.pathname).label
                }
              </Link>
              <span className={styles.breadSplit}>/</span>
              <span>{type === 'create' ? '新建' : '编辑'}</span>
            </div>}
            <Content
              className={styles['site-layout-background']}
              style={{
                // margin: '24px 16px',
                padding: '8px 16px',
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout></ConfigProvider>
    </div>;
  }
};

