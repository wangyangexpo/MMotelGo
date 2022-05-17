import { Typography } from 'antd';
import React, { useState } from 'react';
import './style.less';

const Text = Typography.Text;

interface Props {
  record?: ROOM_STATE.StateTableData;
  order?: ORDER.OrderData;
  onOrder?: () => void;
}

const OrderBox: React.FC<Props> = (props) => {
  const { order } = props;

  let className = 'room-order-box status-1';

  return (
    <div className={className}>
      <Text>{order?.customer}</Text>
      <Text className="orgin-source">{order?.origin}</Text>
    </div>
  );
};

export default OrderBox;
