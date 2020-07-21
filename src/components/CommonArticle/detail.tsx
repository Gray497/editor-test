import { Divider, Row, Col, Upload, message, Form, Input, Radio, Button, Select } from 'antd';
import React from 'react';
import _ from 'lodash';
import styles from './index.less';
import Editor from '@/components/Editor';
// import Editor from '@/components/MediaExample/index';
import config from '@/utils/config';
import { history } from 'umi';
const FormItem = Form.Item;

export default (props) => {

  const { location, history, imageUrl, dispatch, _model: { detail, groups }, PATH } = props;
  const { type } = location.query;
  const [cover, setCover] = React.useState('');
  const [form] = Form.useForm();

  const upLoadProps = {
    listType: 'picture-card',
    name: 'avatar',
    multiple: false,
    action: `${config.API}/upload`,
    headers: {
      'authorization': localStorage.getItem('authorization'),
    },
    accept: 'image/*',
    onChange(info: { file: { name?: any; status?: any; }; fileList: any; }) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        if (info.file.error && info.file.error.status === 401){
          history.push('/login');
          return
        }
      }
      if (status === 'done') {
        setCover(`${info.file.response.url}`);
        message.success(`${info.file.name} 上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败.`);
      }
    },
  };

  if (!_.isEmpty(detail) && _.isEmpty(form.getFieldsValue().title)){
    const {cover} = detail;
    form.setFieldsValue(detail);
    setCover(cover);
  }

  return (
    <Form
      className={styles.wrap}
      form={form}
      initialValues={type === 'update' ? detail : { status: 1, groupName: 0 }}
    >
      <div className={styles.editorWrap}>
        基本信息
        <div>
          <Button type='dashed' style={{ marginRight: 10 }} onClick={() => {
            history.push(location.pathname);
          }}>
            取消
          </Button>
          <Button type='primary' onClick={() => {
            form.validateFields()
              .then(values => {
                console.log(values);
                // const { coverUpload, ...restProps } = values;
                let id = type === 'update' ? {id: detail.id} : {};
                dispatch({
                  type: `${PATH}/${type}`,
                  payload: {
                    cover,
                    ...values,
                    ...id,
                  },
                });
              })
              .catch(errorInfo => {
                console.log(errorInfo);
              });
          }}>提交</Button>
        </div>

      </div>
      <Row>
        <Col span={10} className={styles.upload}>
          <Form.Item
          >
            <Upload {...upLoadProps}>
              {!_.isEmpty(cover) ? <img src={`${config.API}${cover}`} alt="avatar" style={{ width: '100%' }}/> : <div>
                <div className="ant-upload-text">Upload</div>
              </div>}
            </Upload>
          </Form.Item>
          <div className={styles.desc}>点击上方图标, 选择文件并上传新的图片</div>
        </Col>
        <Col push={4} span={10}>
          <Form.Item
            label="标题"
            name="title"
            hasFeedback
            rules={[{ required: true, message: '姓名不能为空!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="所在分组"
            name="groupId"
            hasFeedback
            rules={[{ required: false, message: '所在分组不能为空!' }]}
          >
            <Select>
              {groups.map(val => {
                return <Select.Option key={val.id} value={val.id}>{val.groupName}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="显示状态"
            name="status"
            hasFeedback
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={0}>隐藏</Radio>
              <Radio value={1}>显示</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="大致介绍"
            name="desc"
            hasFeedback
            rules={[{ required: true, message: '大致介绍不能为空!' }]}
          >
            <Input.TextArea rows={6}/>
          </Form.Item>
        </Col>
      </Row>
      <Divider style={{ marginTop: 64, marginBottom: 32 }}/>
      <div className={styles.editorWrap}>
        详细内容
      </div>

      <Form.Item
        name="content"
        rules={[{ required: false }]}
      >
        <Editor/>
      </Form.Item>
    </Form>
  );
};

// export default connect(
//   ({
//   }: {
//   }) => ({
//   }),
// )(Basic);
