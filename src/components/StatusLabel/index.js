import React, { Component } from 'react';
import styles from './index.less';
import classnames from 'classnames';

class StatusLabel extends Component {

  render() {

    let {status, text, color} = this.props;
    if (!text) {
      text = status ? '在线' : '离线'
    }
    if (!color) {
      color = status ? '#3ecdc8' : '#e7658a'
    }

    return (
      <div className={styles.status}>
        <div className={classnames(styles.dot, status ? styles.success : styles.error)} style={{backgroundColor: color}}></div>
        <div>{text}</div>
      </div>
    );
  }
}

export default StatusLabel;

// StatusLabel.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.node,
//   ]),
//   wrapStyle: PropTypes.object,
// };

// StatusLabel.defaultProps = {
//   wrapStyle: {
//     maxWidth: 200,
//   }
// };
