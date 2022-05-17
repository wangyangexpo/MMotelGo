import { Typography } from 'antd';
import React, { useState } from 'react';
import './order.less';

const Text = Typography.Text;

interface Props {
  record?: ROOM_STATE.StateTableData;
  order?: ORDER.OrderData;
  onOrder?: () => void;
}

const OrderBox: React.FC<Props> = (props) => {
  const { order, record } = props;

  if (!order) {
    return (
      <div className="room-empty-box">
        <Text type="secondary" className="hiden">
          {record?.roomTypeName}
        </Text>
        <Text type="secondary" className="hiden">
          {record?.roomNumber}
        </Text>
        <Text type="secondary" className="hiden">
          {record?.roomNumber}
        </Text>
      </div>
    );
  }

  let className = 'room-order-box status-1';

  return (
    <div className={className}>
      <Text>{order?.customer}</Text>
      <Text className="orgin-source">{order?.origin}</Text>
    </div>
  );
};

export default OrderBox;
