import React, { useState } from 'react';
import { useSelector, useHistory, useLocation, useDispatch } from 'umi';
import CommonTable from '@/components/CommonTable';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Select, Modal, Form, Input, Space } from 'antd';
import styles from './index.less';
import { getGoToFilterURL } from '@/utils/help';
import { articleTypes } from '@/utils/constants';
import moment from 'moment';

const Option = Select.Option;
const { confirm } = Modal;
const PATH = 'group';

export default function Group() {

  const { pagination, dataSource } = useSelector(state => state[PATH]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editType, setEditType] = useState('create');
  const [editRecord, setEditRecord] = useState({});
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const tableProps = {
    dataSource: dataSource,
    columns: [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '分组名称',
        dataIndex: 'groupName',
        key: 'groupName',
      },
      {
        title: '分组类型',
        dataIndex: 'type',
        key: 'type',
        render(value, record): any {
          const group = articleTypes.find(val => val.type.toString() === value.toString());
          console.log(group)
          console.log(articleTypes)
          console.log(value)
          return (group || {}).label
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render(value, record): any {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        title: '操作',
        dataIndex: 'op',
        key: 'op',
        render(value, record) {
          return <Space size="middle">
            <a onClick={() => {
              setModalVisible(true);
              setEditType('update');
              setEditRecord(record);
            }}>编辑</a>
            <a style={{ color: 'red' }} onClick={() => {
              confirm({
                title: '删除记录？',
                icon: <ExclamationCircleOutlined/>,
                content: `确定删除【${record.groupName}】`,
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
    ],
    pagination: {
      ...pagination,
      showSizeChanger: true,
    },
    rowKey: (record: { id: any; }) => record.id,
  };

  return (<div>
    <div className={styles.top}>
      <div>
        分组类型：<Select defaultValue="all" style={{ width: 120 }} onChange={(value: String | number) => {
        // if ()
        console.log(history.push);
        if (value === 'all') {
          history.push(getGoToFilterURL({}, ['articleType', 'pageNum']));
        } else {
          history.push(getGoToFilterURL({ articleType: value }, ['articleType', 'pageNum']));
        }
      }}>
        <Option value={'all'}>全部</Option>
        {
          articleTypes.map(val => <Option key={val.type} value={val.type}>{val.label}</Option>)
        }
      </Select>
      </div>
      <Button type='primary' onClick={() => setModalVisible(true)}>新建</Button>
    </div>
    <CommonTable {...tableProps}/>
    <Modal
      title={editType === 'create' ? '新建分组' : '修改分组'}
      centered
      visible={modalVisible}
      onOk={() => {
        form.validateFields()
          .then(values => {
            console.log(values);
            console.log(editType);
            // const { coverUpload, ...restProps } = values;
            let id = editType === 'update' ? {id: editRecord.id} : {};
            dispatch({
              type: `${PATH}/${editType}`,
              payload: {
                ...values,
                ...id,
              },
              onBack: () => {
                console.log(123)
                setModalVisible(false)
              },
            });
          })
          .catch(errorInfo => {
            console.log(errorInfo);
          });
      }}
      onCancel={() => setModalVisible(false)}
    >
      <Form
        className={styles.wrap}
        form={form}
        initialValues={editType === 'update' ? editRecord : { }}
      >
        <Form.Item
          label="分组名称"
          name="groupName"
          hasFeedback
          rules={[{ required: true, message: '分组名称不能为空!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="分组类型"
          name="type"
          hasFeedback
          rules={[{ required: true, message: '分组类型不能为空!' }]}
        >
          <Select style={{ width: '100%' }}>
            {articleTypes.map(val => <Option key={val.type} value={val.type}>{val.label}</Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  </div>);
}
