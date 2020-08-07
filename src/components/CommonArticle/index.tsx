import React from 'react';
import { Table, Space, Button, Select, Modal, Tooltip, Input } from 'antd';
import styles from './index.less';
import Detail from './detail';
import { connect, Link } from 'umi';
import classnames from 'classnames';
// @ts-ignore
import CommonTable from '@/components/CommonTable';
import { getGoToFilterURL } from '@/utils/help';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import _ from 'lodash';
import config from '@/utils/config';
import moment from 'moment';

const { Option } = Select;
const { confirm } = Modal;
const { Search } = Input;

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }}/>
));

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);
const DragableBodyRow = ({ index, className, style, ...restProps }) => {
  // console.log(restProps, restProps['data-row-key'] || 'gray497')
  return <SortableItem index={restProps['data-row-key'] || 999999} {...restProps} />;
};

// @ts-ignore
@connect(({ app }, dispatch) => ({
  dispatch,
  app,
}))
export default class Index extends React.Component {

  state = {
    dataSource: [],
  };

  static getDerivedStateFromProps(nextProps, preState) {
    // console.log(nextProps, preState);
    if (!_.isEqual(JSON.stringify(nextProps._model.dataSource), JSON.stringify(preState.dataSource))) {
      return {
        dataSource: nextProps._model.dataSource,
      };
    }
    return null;
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    // 这里的index是rowkey
    const { dataSource } = this.state;
    console.log(oldIndex, newIndex);
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
      console.log('Sorted items: ', newData);
      this.setState({ dataSource: newData });
    }
  };

  render() {
    const { location: { query }, _model: { pagination, articleType }, history, dispatch, PATH, app: { groups } } = this.props;
    // console.log(app)
    const { dataSource } = this.state;
    const { id, type } = query;

    const DraggableContainer = props => (
      <SortableContainer
        useDragHandle
        helperClass="row-dragging"
        onSortEnd={this.onSortEnd}
        {...props}
      />
    );

    const columns = [
      // {
      //   title: 'Sort',
      //   dataIndex: 'sort',
      //   width: 30,
      //   className: 'drag-visible',
      //   render: () => <DragHandle/>,
      // },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        // width: 30,
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        // width: 100,
      },
      {
        title: '图片',
        dataIndex: 'cover',
        key: 'cover',
        render(value) {
          return <Tooltip title={<img style={{ height: 200 }} src={`${config.API}${value}`} alt=""/>}>
            <img style={{ height: 50 }} src={`${config.API}${value}`} alt=""/>
          </Tooltip>;
        },
        // width: '20%',
      },
      {
        title: '分组名称',
        dataIndex: 'groupName',
        key: 'groupName',
        render(value, record) {
          const group = groups.find(val => {
            // console.log(val.id, record.groupId)
            return val.id === record.groupId;
          });
          return group && group.groupName;
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        // width: 60,
        render(value) {

          let text, status, color;
          if (value === 1) {
            text = '显示';
            color = '#3ecdc8';
          } else {
            text = '隐藏';
            color = '#e7658a';
          }

          return (
            <div className={styles.status}>
              <div className={classnames(styles.dot, status ? styles.success : styles.error)}
                   style={{ backgroundColor: color }}></div>
              <div>{text}</div>
            </div>
          );
        },
      },
      // {
      //   title: '大致介绍',
      //   dataIndex: 'desc',
      //   key: 'desc',
      //   width: 100,
      // },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render(value) {
          return moment(value).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      {
        title: '操作',
        key: 'op',
        render(value: string, record: object) {
          return <Space size="middle">
          {/* <a href={`./www/articleDetail?id=${record.id}`} target='_blank'>预览</a> */}
            <a href={`/www/articleDetail?id=${record.id}&articleType=${articleType}`} target='_blank'>预览</a>
            <a onClick={() => {
              // console.log()
              dispatch({
                type: `${PATH}/setTop`,
                payload: {
                  id: record.id,
                  top: record.top === 1 ? 0 : 1,
                },
              });
            }}>{record.top === 1 ? '取消置顶' : '置顶'}</a>
            <Link to={`./${PATH}?id=${record.id}&type=update`}>编辑</Link>
            <a style={{ color: 'red' }} onClick={() => {
              confirm({
                title: '删除记录？',
                icon: <ExclamationCircleOutlined/>,
                content: `确定删除【${record.title}】`,
                okText: '确定',
                cancelText: '取消',
                onOk() {
                  dispatch({
                    type: `${PATH}/remove`,
                    payload: {
                      id: record.id,
                    },
                  });
                },
                onCancel() {
                },
              });
            }}>删除</a>
          </Space>;
        },
      },
    ];

    const tableProps = {
      dataSource: dataSource,
      columns: columns,
      pagination: {
        ...pagination,
        showSizeChanger: true,
      },
      //
      rowKey: (record: { id: any; }) => record.id,
      // components: {
      //   body: {
      //     wrapper: DraggableContainer,
      //     row: DragableBodyRow,
      //   },
      // },
    };

    if (!!id || !!type) {
      return <Detail {...this.props}/>;
    }

    return (
      <div className={styles.wrap}>
        <div className={styles.top}>
          <div>
            <div>
              状态搜索：<Select defaultValue="all" style={{ width: 120 }} onChange={(value: String | number) => {
              // if ()
              // console.log(history.push);
              if (value === 'all') {
                history.push(getGoToFilterURL({}, ['status']));
              } else {
                history.push(getGoToFilterURL({ status: value }, ['pageNum']));
              }
            }}>
              <Option value={'all'}>全部</Option>
              <Option value={0}>隐藏</Option>
              <Option value={1}>显示</Option>
            </Select>
            </div>
            <div style={{marginTop: 10, display: 'flex' }}>
              <span style={{minWidth: 70}}>标题搜索：</span>
              <Search placeholder="输入标题关键字搜索" onSearch={value => {
                if (value){
                  history.push(getGoToFilterURL({title: value}, ['pageNum']));
                } else {
                  history.push(getGoToFilterURL({}, ['title', 'pageNum']));
                }
              }} enterButton/>
            </div>
          </div>
          <Button type='primary'><Link to={getGoToFilterURL({type: `create`})}>新建</Link></Button>
        </div>
        <CommonTable {...tableProps}/>
      </div>
    );
  }
}
