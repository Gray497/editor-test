import React from 'react';
import { Table } from 'antd';
import { isFunction } from 'lodash';
import './index.less';
import classnames from 'classnames';
// import TableLabel from '../TableLabel';
import { getGoToFilterURL } from 'utils/help';
// import StatusLabel from 'components/StatusLabel';
import { useHistory } from 'umi';

export default (props) => {
  const history = useHistory();

  const onPageChange = (_pagination, filters, sorter) => {
    const { onPageChange } = props;
    if (onPageChange) {
      onPageChange(_pagination);
    } else {
      let params = {
        pageNum: _pagination.current,
        pageSize: _pagination.pageSize,
      };
      if (sorter) {
        params.order = sorter.order;
      }
      history.push(getGoToFilterURL(params, false))
    }
    if (sorter) {
      // console.error('排序变了', sorter)
    }
  };


  let { loading, dataSource, pagination, columns, rowSelection, rowKey, wrapClassName, rowClassName, expandedRowRender } = props;

  // 暂时不需要用到
  let _columns = [];
  columns.map((val) => {
    let {
      key, title, dataIndex = key, render, type, ceilStyle = {}, width, children, sorter,
      sortOrder, renderDom,
    } = val;
    let _render = render;
    switch (type) {
      default:
        if (!isFunction(_render)) {
          _render = (text, item, index) => {
            // let tableLabelProps = {
            //   ...ceilStyle,
            //   textAlign: ceilStyle.align || 'left',
            // };
            return renderDom ? renderDom(text, item, index) : text;
          };
        }
        _columns.push({
          dataIndex,
          width,
          key,
          ceilStyle,
          align: (ceilStyle && ceilStyle.align) ? ceilStyle.align : 'left',
          title,
          children,
          sorter,
          sortOrder,
          render: _render,
        });
        break;
    }
    return null;
  });


  return (
    <Table
      className={classnames(wrapClassName)}
      columns={_columns}
      rowClassName={rowClassName}
      rowSelection={rowSelection ? rowSelection : null}
      pagination={pagination}
      onChange={onPageChange}
      dataSource={dataSource}
      expandedRowRender={expandedRowRender}
      loading={loading}
      rowKey={rowKey ? rowKey : (item, index) => index}
    />
  );
}

