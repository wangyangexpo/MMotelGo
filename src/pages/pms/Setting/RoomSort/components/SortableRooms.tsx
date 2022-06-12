import React from 'react';
import SortableList from '@/components/SortableList';
import RoomCard from './RoomCard';
import { useRequest } from 'umi';
import { Skeleton, message } from 'antd';
import services from '@/services';

interface Props {
  type: number;
}

const SortableRooms: React.FC<Props> = (props) => {
  const { type } = props;

  const { data, loading } = useRequest(async () => {
    return services.SettingController.getRoomSort({
      type: type,
    });
  });
  return (
    <Skeleton loading={loading}>
      <SortableList
        dataSource={data || []}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
        onChange={async (list) => {
          await services.SettingController.updateRoomSort({
            type,
            list,
          });
          message.success('排序成功');
        }}
        renderItem={(item) => {
          return <RoomCard name={item.name} key={item.id} />;
        }}
      ></SortableList>
    </Skeleton>
  );
};

export default SortableRooms;
