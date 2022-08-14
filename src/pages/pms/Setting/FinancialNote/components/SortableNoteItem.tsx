import React from 'react';
import SortableList from '@/components/SortableList';
import NoteItem from './NoteItem';
import { useRequest } from 'umi';
import { Skeleton, message } from 'antd';
import services from '@/services';

interface Props {
  type?: number;
  disabled?: boolean;
}

const SortableNoteItem: React.FC<Props> = (props) => {
  const { type, disabled } = props;

  const { data, loading } = useRequest(async () => {
    return services.SettingController.getRoomSort({
      type: type,
    });
  });

  return (
    <Skeleton loading={loading}>
      <SortableList
        dataSource={data || []}
        disabled={disabled}
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
          return (
            <NoteItem noteName={item.name} noteId={item.id} key={item.id} />
          );
        }}
      ></SortableList>
    </Skeleton>
  );
};

export default SortableNoteItem;
