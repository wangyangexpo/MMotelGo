import React, { useState, useEffect } from 'react';
import { Popover, Space, Typography } from 'antd';
import { useModel } from 'umi';
import { selectService } from '../service';
import moment from 'moment';
import './style.less';

const { Text } = Typography;

interface Props {
  record: ROOM_STATE.StateTableData;
  date: string;
}

const EmptyBox: React.FC<Props> = (props) => {
  const { record, date } = props;

  const { selectedRooms, setSelectedRooms } = useModel('state');

  const [selected, setSelected] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const subs = selectService.getSelectedInfo().subscribe((info: any) => {
      switch (info.type) {
        case 'SELECTED':
          if (info?.roomId === record.id && info.date === date) {
          } else {
            setVisible(false);
          }
          break;
        case 'CANCEL_SELECTED':
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
              setVisible(false);
              setSelectedRooms([]);
              selectService.sendCancelInfo();
            }}
          >
            取消
          </Text>
          <Text type="secondary" className="btn">
            关房
          </Text>
          <Text
            type="secondary"
            className="btn"
            onClick={selectService.sendAddOrder}
          >
            入住
          </Text>
        </Space>
      }
      overlayClassName="room-box-action-popover"
      placement="rightTop"
      visible={visible}
    >
      {!selected ? (
        <div
          className="room-empty-box"
          onClick={() => {
            const info = {
              date,
              roomId: record.id,
              roomCode: record.roomCode,
              roomTypeId: record.roomTypeId,
              roomTypeName: record.roomTypeName,
            };
            setVisible(true);
            setSelected(true);
            setSelectedRooms([...selectedRooms, info]);
            selectService.sendSelectedInfo(info);
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
            setSelectedRooms(
              selectedRooms.filter((item) => item.roomId !== record.id),
            );
            setSelected(false);
          }}
        ></div>
      )}
    </Popover>
  );
};

export default EmptyBox;
