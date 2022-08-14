import React, { useState, useEffect } from 'react';
import { Space, Input, Popconfirm } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { editingService } from './service';

import './card.less';

interface Props {
  noteName?: string;
  noteId: Key;
}

const NoteItem: React.FC<Props> = (props) => {
  const { noteName, noteId } = props;
  const [editing, setEditing] = useState(false);
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
              onVisibleChange={() => {
                editingService.sendEditing(-1);
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
            <CheckOutlined className="pointer" style={{ color: 'green' }} />
            <CloseOutlined
              className="pointer"
              style={{ color: 'red' }}
              onClick={(e) => {
                e.stopPropagation();
                editingService.sendCancelEdit();
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
