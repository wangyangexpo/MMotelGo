import React, { useState, useEffect } from 'react';
import { Space, Input, Popconfirm, message } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { editingService } from './service';
import services from '@/services';
import Cookie from 'js-cookie';
import './card.less';

export enum NoteTypeEnum {
  INCOME = 0,
  EXPAND = 1,
}

interface Props {
  noteName?: string;
  noteId?: number;
  type: NoteTypeEnum;
}

const NoteItem: React.FC<Props> = (props) => {
  const { noteName, noteId, type } = props;
  const [editing, setEditing] = useState(() => noteId === -1);
  const [value, setValue] = useState(() => noteName);

  useEffect(() => {
    const subs = editingService.getEditingInfo().subscribe((info: any) => {
      switch (info.type) {
        case 'IS_EDITING':
          if (info.editingId !== noteId) {
            setValue(noteName);
            setEditing(false);
          }
          break;
        default:
          break;
      }
    });

    return () => {
      subs.unsubscribe();
    };
  }, []);

  return (
    <div className="financial-note-card">
      {!editing ? (
        <>
          <span className="text">{noteName}</span>
          <Space className="action">
            <EditOutlined
              className="pointer"
              onClick={(e) => {
                e.stopPropagation();
                editingService.sendEditing(noteId);
                setEditing(true);
              }}
            />
            <Popconfirm
              title="确定要删除吗？"
              placement="bottom"
              okText="是"
              cancelText="否"
              onConfirm={async () => {
                await services.SettingController.deleteMakeNote({
                  id: noteId,
                });
                editingService.sendEditingDone();
              }}
            >
              <DeleteOutlined className="pointer" />
            </Popconfirm>
          </Space>
        </>
      ) : (
        <>
          <Input
            className="text-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Space className="action">
            <CheckOutlined
              className="pointer"
              style={{ color: 'green' }}
              onClick={async () => {
                if (!value) {
                  return message.error('名称不能为空');
                }
                if (noteId === -1) {
                  await services.SettingController.addMakeNote({
                    name: value,
                    type,
                  });
                } else {
                  await services.SettingController.updateMakeNote({
                    name: value,
                    id: noteId,
                  });
                }
                editingService.sendEditingDone();
              }}
            />
            <CloseOutlined
              className="pointer"
              style={{ color: 'red' }}
              onClick={(e) => {
                e.stopPropagation();
                editingService.sendCancelEdit({
                  id: noteId,
                  type,
                });
                setValue(noteName);
                setEditing(false);
              }}
            />
          </Space>
        </>
      )}
    </div>
  );
};

export default NoteItem;
