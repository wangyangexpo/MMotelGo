import { Typography } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import moment from 'moment';
import './style.less';

const Text = Typography.Text;

interface Props {
  record: ROOM_STATE.StateTableData;
  date: string;
}

const EmptyBox: React.FC<Props> = (props) => {
  const { record, date } = props;

  const [selected, setSelected] = useState(false);

  const { state, setState } = useModel('state');

  const price = record?.dateList?.find((d) =>
    moment(d.date).isSame(date, 'day'),
  )?.price;

  return !selected ? (
    <div
      className="room-empty-box"
      onClick={() => {
        setSelected(true);
        // setState([
        //   ...state,
        //   {
        //     date,
        //     roomId: record.roomId,
        //     roomNumber: record.roomNumber,
        //   },
        // ]);
      }}
    >
      <Text type="secondary" className="hiden">
        {record?.roomTypeName}
      </Text>
      <Text type="secondary" className="hiden">
        {record?.roomCode}
      </Text>
      <Text type="secondary" className="hiden">
        ￥{price}
      </Text>
    </div>
  ) : (
    <div
      className="room-empty-box-checked"
      onClick={() => {
        setSelected(false);
        // setState(
        //   state.filter((s) => s.roomId !== record.roomId || s.date !== date),
        // );
      }}
    ></div>
  );
};

export default EmptyBox;
