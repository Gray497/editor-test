import React, { PureComponent, Fragment } from 'react'
import { connect, Redirect } from 'umi'
import { Button, Row, Input, Form } from 'antd'
// import { Trans, withI18n } from '@lingui/react'

import styles from './index.less'

const FormItem = Form.Item

// @ts-ignore
@connect(({ loading, dispatch }) => ({ loading, dispatch }))
class Login extends PureComponent {

  render() {
    // @ts-ignore
    const { dispatch, loading } = this.props;

    const handleOk = (values: any) => {
      dispatch({ type: 'login/login', payload: values })
    }

    return <Redirect to={'/index/dashboard'}/>

    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            {/*<img alt="logo" src={config.logoPath} />*/}
            <span>{'后台系统'}</span>
          </div>
          <Form
            onFinish={handleOk}
          >
            <FormItem name="account"
                      rules={[{ required: true }]} hasFeedback>
              <Input
                placeholder={'请输入账号名'}
              />
            </FormItem>
            <FormItem name="password"
                      rules={[{ required: true }]} hasFeedback>
              <Input
                type="password"
                placeholder={'请输入密码'}
              />
            </FormItem>
            <Row>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.effects['login/login']}
              >
                <span>登录</span>
              </Button>
            </Row>
          </Form>
        </div>
      </Fragment>
    )
  }
}

// Login.propTypes = {
//   form: PropTypes.object,
//   dispatch: PropTypes.func,
//   loading: PropTypes.object,
// }

export default Login
