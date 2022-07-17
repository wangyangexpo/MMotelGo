import React, { useState, useEffect } from 'react';
import { Popover, Space, Typography } from 'antd';
import moment from 'moment';
import { selectService } from '../service';
import './style.less';

const { Text, Link } = Typography;

interface Props {
  record: ROOM_STATE.StateTableData;
  date: string;
}

const EmptyBox: React.FC<Props> = (props) => {
  const { record, date } = props;

  const [selected, setSelected] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const subs = selectService.getSelectedInfo().subscribe((info: any) => {
      switch (info.type) {
        case 'SELECTED':
          if (info?.id === record.id && info.date === date) {
            setVisible(true);
          } else {
            setVisible(false);
          }
          break;
        case 'CANCEL_SELECTED':
          setVisible(false);
          setSelected(false);
        default:
          break;
      }
    });

    return () => {
      subs.unsubscribe();
    };
  }, []);

  const price = record?.dateList?.find((d) =>
    moment(d.date).isSame(date, 'day'),
  )?.price;

  return (
    <Popover
      content={
        <Space direction="vertical" size={12}>
          <Text
            type="secondary"
            className="btn"
            onClick={() => {
              selectService.sendCancelInfo();
            }}
          >
            取消
          </Text>
          <Text type="secondary" className="btn">
            关房
          </Text>
          <Text type="secondary" className="btn">
            入住
          </Text>
        </Space>
      }
      overlayClassName="room-box-action-popover"
      placement="leftTop"
      visible={visible}
    >
      {!selected ? (
        <div
          className="room-empty-box"
          onClick={() => {
            setSelected(true);
            selectService.sendSelectedInfo({
              id: record.id,
              date: date,
            });
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
      )}
    </Popover>
  );
};

export default EmptyBox;
