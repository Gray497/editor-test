import React from 'react';
import styles from './index.less';
import { connect } from 'umi';
import wwwLogo from '@/pages/www/assets/logo.png';
import { articleTypes } from '@/utils/constants';
import { pathToRegexp } from 'path-to-regexp';
import _ from 'lodash';

const articlesPath = '/www/articles';
const groupsPath = '/www/groups';
const articleDetailPath = '/www/articleDetail';

var timer;

@connect(({'app': _model}, dispatch) => ({
  // dispatch,
  _model
}))
export default class BasicLayout extends React.Component {

  state = {
    picShow: false,
  };

  render() {

    const { children, location, _model } = this.props;
    const { pathname, query: { articleType } } = location;
    const {picShow} = this.state;
    const {group = {}} = _model;
    // const [picShow, setPicShow] = React.useState(true);

    const _this = this;
    if (!document.onclick){
      document.onclick = function(){
        if (!!timer){
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          _this.setState({
            picShow: true,
          })
        }, 6 * 60 * 1000)
      }
    }

    if (!timer){
      timer = setTimeout(() => {
        _this.setState({
          picShow: true,
        })
      }, 6 * 60 * 1000)
    }

    if (picShow) {
      return <div className={styles.screenBg}>
        <div className={styles.screenTitle}>清远市清新区退役军人事务局</div>
        <div className={styles.screenSecondTitle}>欢迎您</div>
        <div className={styles.btn} onClick={() => {
          _this.setState({
            picShow: false,
          })
        }}>点击查看更多》
        </div>
      </div>;
    }

    function getType(pathname, path) {
      const match = pathToRegexp(`${path}/:id`).exec(pathname);
      if (match && match[1]) {
        return match[1];
      }
      return false;
    }

    function getTitle() {
      if (pathname.startsWith(articlesPath)) {
        const type = getType(pathname, articlesPath);
        if (type) {
          //没有分组的文章列表
          return (_.find(articleTypes, val => val.type === type) || {}).label;
        } else {
          //有分组的文章列表
          return (_.find(articleTypes, val => val.type === articleType) || {}).label + '-' + _.get(group, 'groupName');
        }
      } else if (pathname.startsWith(groupsPath)) {
        // 分组
        return (_.find(articleTypes, val => val.type === getType(pathname, groupsPath)) || {}).label;
      } else if (pathname.startsWith(articleDetailPath)) {
        return (_.find(articleTypes, val => val.type === articleType) || {}).label;
      }
      return '清远市清新区退役军人事务局';
    }


    return <div className={styles.wwwWrap}>
      <div className={styles.top}>
        <img src={wwwLogo} style={{ width: 126, height: 76, marginRight: 20 }} alt=""/>
        {/*<div style={{ width: 126, height: 76, marginRight: 20, background: '#aaaaaa' }}></div>*/}
        <div className={styles.title}>
          <div>
            {getTitle()}
          </div>
          {location.pathname !== '/www/dashboard' && <div className={styles.back} onClick={() => {
            history.go(-1);
          }}>
            返回上级
          </div>}
        </div>
      </div>
      <div className={styles.wwwContent}>
        {children}
      </div>
    </div>;

  }
}
