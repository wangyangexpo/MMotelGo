import { Typography } from 'antd';
import React, { useState } from 'react';
import './style.less';

const Text = Typography.Text;

interface Props {
  record?: ROOM_STATE.StateTableData;
  onOrder?: () => void;
}

const EmptyBox: React.FC<Props> = (props) => {
  const { record } = props;

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
};

export default EmptyBox;
