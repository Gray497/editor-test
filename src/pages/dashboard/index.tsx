import React from 'react';
import { connect } from 'umi';
import { Statistic, Row, Col } from 'antd';

function formatSeconds(value) {

  var theTime = parseInt(value);// 秒

  var theTime1 = 0;// 分

  var theTime2 = 0;// 小时

  if (theTime > 60) {

    theTime1 = parseInt(theTime / 60);

    theTime = parseInt(theTime % 60);

    if (theTime1 > 60) {

      theTime2 = parseInt(theTime1 / 60);

      theTime1 = parseInt(theTime1 % 60);

    }

  }

  var result = '' + parseInt(theTime) + '秒';

  if (theTime1 > 0) {

    result = '' + parseInt(theTime1) + '分' + result;

  }

  if (theTime2 > 0) {

    result = '' + parseInt(theTime2) + '小时' + result;

  }

  return result;

}

const PATH = 'admin/dashboard';
// @ts-ignore
@connect(({ [PATH]: _model }, dispatch) => ({
  // dispatch,
  _model,
}))
export default class Index extends React.Component {
  render() {

    const { _model: { status: { freemem, totalmem, uptime } } } = this.props;

    return <Row gutter={16}>
      <Col span={12}>
        <Statistic title="系统运行时间" value={formatSeconds(uptime)}/>
      </Col>
      <Col span={12}>
        <Statistic title="内存使用率" value={freemem && totalmem ? ((totalmem - freemem) / totalmem * 100).toFixed(2) : 0}
                   suffix="/ 100"/>
      </Col>
    </Row>;
  }
}
