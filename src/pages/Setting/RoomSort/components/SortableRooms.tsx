import React from 'react';
import SortableList from '@/components/SortableList';
import RoomCard from './RoomCard';
import { useRequest } from 'umi';
import { Skeleton } from 'antd';
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
        dataSource={data?.list || []}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
        renderItem={(item) => {
          return <RoomCard name={item.name} key={item.id} />;
        }}
      ></SortableList>
    </Skeleton>
  );
};

export default SortableRooms;
