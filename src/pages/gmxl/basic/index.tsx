import { Divider, Row, Col, Upload, message, Form, Input, Radio, Button } from 'antd';
import React from 'react';
import _ from 'lodash';
import styles from './style.less';
import Editor from '@/components/Editor';
import config from '@/utils/config';
const FormItem = Form.Item;

export default (props) => {

  const { location, history, imageUrl, dispatch, gmxl: { detail } } = props;
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
    accept: '.png,.jpg',
    onChange(info: { file: { name?: any; status?: any; }; fileList: any; }) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log(info);
        setCover(`${info.file.response.url}`);
        // message.success(`${info.file.name} file uploaded successfully.`);
        message.success(`${info.file.name} 上传成功.`);
      } else if (status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
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
      initialValues={type === 'update' ? detail : { status: 1 }}
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
                  type: `gmxl/${type}`,
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
            // name="coverUpload"
            // rules={[{ required: true, message: '请上传图片!' }]}
          >
            <Upload {...upLoadProps}>
              {!_.isEmpty(cover) ? <img src={`${config.API}${cover}`} alt="avatar" style={{ width: '100%' }}/> : <div>
                {/*{false ? <LoadingOutlined /> : <PlusOutlined />}*/}
                <div className="ant-upload-text">Upload</div>
              </div>}
              {/*<p className="ant-upload-drag-icon">*/}
              {/*  <InboxOutlined/>*/}
              {/*</p>*/}
              {/*<p className="ant-upload-text">点击或者拖动文件到此处上传</p>*/}
            </Upload>
          </Form.Item>
          <div className={styles.desc}>点击上方图标, 选择文件并上传新的图片</div>
        </Col>
        <Col push={4} span={10}>
          <Form.Item
            label="烈士姓名"
            name="title"
            hasFeedback
            rules={[{ required: true, message: '姓名不能为空!' }]}
          >
            <Input/>
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
