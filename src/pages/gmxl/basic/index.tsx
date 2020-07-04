import { Badge, Card, Descriptions, Divider, Table, Row, Col, Upload, message, Form, Input, Radio, Button } from 'antd';
import React, { Component } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './style.less';
import { InboxOutlined } from '@ant-design/icons';
import Editor from '@/components/Editor';

const { Dragger } = Upload;
const FormItem = Form.Item;

export default () => {

  // return <div>123</div>

  const [form] = Form.useForm();

  console.log(form)
  console.log(form.getFieldsValue())

  const props = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: { file: { name?: any; status?: any; }; fileList: any; }) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Form className={styles.wrap} form={form}>
      <div className={styles.editorWrap}>
        详细内容
        <Button onClick={() => {
          form.validateFields()
            .then(values => {
              /*
            values:
              {
                username: 'username',
                password: 'password',
              }
            */
            })
            .catch(errorInfo => {
              console.log(errorInfo)
              /*
              errorInfo:
                {
                  values: {
                    username: 'username',
                    password: 'password',
                  },
                  errorFields: [
                    { password: ['username'], errors: ['Please input your Password!'] },
                  ],
                  outOfDate: false,
                }
              */
            });
          // console.log(form.getFieldsValue())
        }}>提交</Button>
      </div>
      <Row>
        <Col span={10} className={styles.upload}>
          <Form.Item
            name="cover"
            rules={[{ required: true, message: '请上传图片!' }]}
            hasFeedback
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined/>
              </p>
              <p className="ant-upload-text">点击或者拖动文件到此处上传</p>
            </Dragger>
          </Form.Item>
          <div className={styles.desc}>点击上方图标, 选择文件并上传新的图片</div>
        </Col>
        <Col push={4} span={10}>
          <Form.Item
            label="姓名"
            name="title"
            hasFeedback
            rules={[{ required: true, message: '姓名不能为空!' }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="显示"
            name="status"
            hasFeedback
            rules={[{ required: true,}]}
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
        name="html"
        rules={[{ required: false}]}
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
