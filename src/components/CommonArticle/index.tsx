import React from 'react';
import { Table, Space, Button, Select, Modal } from 'antd';
import styles from './index.less';
import Detail from './detail';
import { connect, Link } from 'umi';
// @ts-ignore
import CommonTable from '@/components/CommonTable';
import { getGoToFilterURL } from '@/utils/help';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { confirm } = Modal;


// const PATH = 'gmxl'

// @ts-ignore
@connect((dispatch) => ({
  dispatch,
}))
export default class SiderDemo extends React.Component {
  render() {
    const { location:{ query}, _model:{dataSource, pagination}, history, dispatch, PATH } = this.props;
    const { id, type } = query;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '图片',
        dataIndex: 'cover',
        key: 'cover',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '大致介绍',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '操作',
        key: 'op',
        render(value: string, record: object) {
          return <Space size="middle">
            <Link to={`./${PATH}?id=${record.id}&type=update`}>编辑</Link>
            <a style={{color: 'red'}} onClick={() => {
              confirm({
                title: '删除记录？',
                icon: <ExclamationCircleOutlined />,
                content: `确定删除【${record.title}】`,
                okText: '确定',
                cancelText: '取消',
                onOk() {
                  dispatch({
                    type: `${PATH}/remove`,
                    payload:{
                      id: record.id,
                    }
                  })
                },
                onCancel() {},
              });
            }}>删除</a>
          </Space>;
        },
      },
    ];

    const tableProps = {
      dataSource: dataSource,
      columns: columns,
      pagination,
      rowKey: (record: object) => JSON.stringify(record),
    };

    if (!!id || !!type){
      return <Detail {...this.props}/>
    }

    return (
      <div className={styles.wrap}>
        <div className={styles.top}>
          <div>
            状态：<Select defaultValue="all" style={{ width: 120 }} onChange={(value: String|number) => {
            // if ()
            console.log(history.push)
            if (value === 'all'){
              history.push(getGoToFilterURL({},['status']));
            } else {
              history.push(getGoToFilterURL({status: value}));
            }
          }}>
            <Option value={'all'}>全部</Option>
            <Option value={0}>隐藏</Option>
            <Option value={1}>显示</Option>
          </Select>
          </div>
          <Button type='primary'><Link to={`./${PATH}?type=create`}>新建</Link></Button>
        </div>
        <CommonTable {...tableProps}/>
      </div>
    );
  }
}
