import React from 'react';
import SortableList from '@/components/SortableList';
import { NoteTypeEnum } from './NoteItem';
import services from '@/services';
import NoteItem from './NoteItem';
import { message } from 'antd';

interface Props {
  type: NoteTypeEnum;
  disabled?: boolean;
  dataSource?: SETTING.MakeNote[];
}

const SortableNoteItem: React.FC<Props> = (props) => {
  const { type, disabled, dataSource } = props;

  return (
    <SortableList
      dataSource={dataSource || []}
      disabled={disabled}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
      onChange={async (list) => {
        await services.SettingController.sortMakeNote({
          idList: list.map((item) => item.id as number) || [],
        });
      }}
      renderItem={(item) => {
        return (
          <NoteItem
            noteName={item.name}
            noteId={item.id}
            key={item.id}
            type={type}
          />
        );
      }}
    ></SortableList>
  );
};

export default SortableNoteItem;
