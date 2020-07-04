import React from 'react';
import { Table, Space } from 'antd';
import styles from './index.less';
import Detail from './detail';
import { connect, Link } from 'umi';

// @ts-ignore
@connect(({ dispatch }) => ({ dispatch }))
export default class SiderDemo extends React.Component {
  render() {
    const { location } = this.props;
    const { query: { id } } = location;
    const dataSource = [
      {
        id: '1',
        title: '胡彦斌',
        cover: 32,
        status: '西湖区湖底公园1号',
        introduce: '12321',
      },
    ];

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
        dataIndex: 'introduce',
        key: 'introduce',
      },
      {
        title: '操作',
        key: 'op',
        render(value: string, record: object) {
          console.log(record);
          return <Space size="middle">
            <Link to={`./gmxl?id=${record.id}`}>编辑</Link>
            <a>删除</a>
          </Space>;
        },
      },
    ];

    const tableProps = {
      dataSource: dataSource,
      columns: columns,
      rowKey: (record: object) => JSON.stringify(record),
    };

    if (!!id){
      return <Detail />
    }

    return (
      <div className={styles.wrap}>
        <Table {...tableProps}/>
      </div>
    );
  }
}
