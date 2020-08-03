import React  from 'react';
import styles from './index.less';
import { Layout, Menu, Avatar, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { connect, Link, Redirect } from 'umi';
import { articleTypes } from '@/utils/constants';


const { SubMenu } = Menu;


const getMenuData = () => [
  { Icon: UserOutlined, label: '首页', route: '/dashboard', },
  ...articleTypes,
  { Icon: VideoCameraOutlined, label: '分组类型', route: '/groups', },
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
    picShow: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {




    // @ts-ignore
    const { children, location, dispatch }  = this.props;
    const { type } = location.query;
    // const {setState} = this;

    if (location.pathname === '/'){
      return <Redirect to={'/dashboard'}/>;
    }

    if (location.pathname === '/login') {
      return <Redirect to={'/dashboard'}/>;
    }

    if (location.pathname.startsWith('/www')) {
      // return <div className={styles.wwwWrap}>
      //   <div className={styles.top}>
      //     <img src={wwwLogo} style={{ width: 126, height: 76, marginRight: 20}} alt=""/>
      //     {/*<div style={{ width: 126, height: 76, marginRight: 20, background: '#aaaaaa' }}></div>*/}
      //     <div className={styles.title}>
      //       <div>
      //         { (getMenuData().find(val => {
      //           // console.log(val)
      //           return val.type.toString() === wwwType
      //         }) || {}).label || '清远市清新区退役军人事务局'}
      //         {!!groupId && `-${group.groupName}`}
      //       </div>
      //       {location.pathname !== '/www' && <div className={styles.back} onClick={() => {
      //         history.go(-1);
      //       }}>
      //         返回上级
      //       </div>}
      //     </div>
      //   </div>
      //   <div className={styles.wwwContent}>
      //     {children}
      //   </div>
      // </div>;
    }

    return <div>
      <ConfigProvider locale={zhCN}>
        <Layout className={styles.container}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className={styles.logo}/>
            {location.pathname}
            <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
              {getMenuData().map(({ Icon, label, route, type }, index) =>
              {
                const _route = `/admin${route}${type ? `/${type}` : ''}`
                return <Menu.Item key={_route} icon={<Icon />}>
                  <Link to={_route} key={index}>{label}-管理</Link>
                </Menu.Item>
              }
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
                  {/*<Menu.Item key="logout">*/}
                  {/*  登出*/}
                  {/*</Menu.Item>*/}
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

