import { Typography } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import './style.less';

const Text = Typography.Text;

interface Props {
  record: ROOM_STATE.StateTableData;
  date: string;
}

const EmptyBox: React.FC<Props> = (props) => {
  const { record, date } = props;

  const { state, setState } = useModel('state');

  const finded = state.find(
    (s) => s.roomId === record.roomId && s.date === date,
  );

  return !finded ? (
    <div
      className="room-empty-box"
      onClick={() => {
        setState([
          ...state,
          {
            date,
            roomId: record.roomId,
            roomNumber: record.roomNumber,
          },
        ]);
      }}
    >
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
  ) : (
    <div
      className="room-empty-box-checked"
      onClick={() => {
        setState(state.filter((s) => s !== finded));
      }}
    ></div>
  );
};

export default EmptyBox;
