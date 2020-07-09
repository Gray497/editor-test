import React from 'react';
import { Table, Space, Button, Select, Modal } from 'antd';
import styles from './index.less';
import Detail from './detail';
import { connect, Link } from 'umi';
// @ts-ignore
import CommonTable from '@/components/CommonTable';
import { getGoToFilterURL } from '@/utils/help';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import _ from 'lodash';

const { Option } = Select;
const { confirm } = Modal;

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }}/>
));

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);
const DragableBodyRow = ({ index, className, style, ...restProps }) => (
  <SortableItem index={restProps['data-row-key']} {...restProps} />
);

// @ts-ignore
@connect((dispatch) => ({
  dispatch,
}))
export default class Index extends React.Component {

  state = {
    dataSource: [],
  };

  static getDerivedStateFromProps(nextProps, preState) {
    console.log(nextProps, preState);
    if (!_.isEqual(JSON.stringify(nextProps._model.dataSource), JSON.stringify(preState.dataSource))) {
      return {
        dataSource: nextProps._model.dataSource,
      };
    }
    return null;
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
      console.log('Sorted items: ', newData);
      this.setState({ dataSource: newData });
    }
  };

  render() {
    const { location: { query }, _model: { pagination }, history, dispatch, PATH } = this.props;
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
      {
        title: 'Sort',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
        render: () => <DragHandle/>,
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 30,
      },
      {
        title: '姓名',
        dataIndex: 'title',
        key: 'title',
        width: 100,
      },
      {
        title: '图片',
        dataIndex: 'cover',
        key: 'cover',
        width: '20%',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 60,
      },
      {
        title: '大致介绍',
        dataIndex: 'desc',
        key: 'desc',
        width: 100,
      },
      {
        title: '操作',
        key: 'op',
        render(value: string, record: object) {
          return <Space size="middle">
            <a href={`./www/articleDetail?id=${record.id}`} target='_blank'>预览</a>
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
      pagination,
      rowKey: (record: object) => JSON.stringify(record),
      components: {
        body: {
          wrapper: DraggableContainer,
          row: DragableBodyRow,
        },
      },
    };

    if (!!id || !!type) {
      return <Detail {...this.props}/>;
    }

    return (
      <div className={styles.wrap}>
        <div className={styles.top}>
          <div>
            状态：<Select defaultValue="all" style={{ width: 120 }} onChange={(value: String | number) => {
            // if ()
            console.log(history.push);
            if (value === 'all') {
              history.push(getGoToFilterURL({}, ['status']));
            } else {
              history.push(getGoToFilterURL({ status: value }));
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
