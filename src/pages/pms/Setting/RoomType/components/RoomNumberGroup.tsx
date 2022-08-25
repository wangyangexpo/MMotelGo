import { useEffect } from 'react';
import { Input, Space, Form, Button, Badge } from 'antd';
import type { FormInstance } from '@ant-design/pro-form';
import { PlusOutlined, CloseCircleFilled } from '@ant-design/icons';

interface RoomValue {
  id?: number;
  code: string;
}

interface Props {
  form?: FormInstance;
  roomCount?: number;
  initialValue?: RoomValue[];
}

function RoomInput(props: {
  value?: RoomValue;
  onChange?: (value: RoomValue) => void;
}) {
  const { value, onChange } = props;
  return (
    <Input
      value={value?.code}
      style={{ width: '105px' }}
      placeholder="如：101"
      onChange={(e) => {
        onChange?.({
          id: value?.id,
          code: e.target.value || '',
        });
      }}
      allowClear
    />
  );
}

export default function RoomNumberGroup(props: Props) {
  const { initialValue, roomCount, form } = props;

  useEffect(() => {
    if (roomCount) {
      const roomList = form?.getFieldValue(['roomList']) || [];
      const newRooms = roomList.slice(0, roomCount);
      if (newRooms.length >= roomCount) {
        // 房间减少
        form?.setFieldsValue({
          roomList: newRooms,
        });
      } else {
        // 房间增加
        const lastRoomCode = roomList?.[roomList.length - 1];
        const appendRooms = [...newRooms];
        for (let i = 1; i <= roomCount - newRooms.length; i++) {
          if (/^[0-9]+$/.test(lastRoomCode)) {
            appendRooms.push({
              code: String(+lastRoomCode + i),
            });
          } else {
            appendRooms.push({});
          }
        }
        form?.setFieldsValue({
          roomList: appendRooms,
        });
      }
    }
  }, [roomCount]);

  return (
    <Form.List name="roomList" initialValue={initialValue}>
      {(fields, { add, remove }) => {
        return (
          <Space direction="vertical">
            <Space wrap>
              {fields.map((field, index) => {
                return (
                  <Badge
                    size="small"
                    key={field.key}
                    count={
                      <CloseCircleFilled
                        style={{
                          fontSize: 12,
                          color: '#f5222d',
                          cursor: 'pointer',
                          zIndex: 101,
                          display: fields.length > 1 ? 'block' : 'none',
                        }}
                        onClick={() => {
                          const roomList =
                            form?.getFieldValue(['roomList']) || [];
                          form?.setFieldsValue({
                            roomCount: roomList.length - 1,
                          });
                          remove(index);
                        }}
                      />
                    }
                  >
                    <Form.Item {...field} noStyle>
                      <RoomInput />
                    </Form.Item>
                  </Badge>
                );
              })}
            </Space>
            {fields.length < 99 ? (
              <Button
                icon={<PlusOutlined />}
                type="text"
                onClick={() => {
                  const roomList = form?.getFieldValue(['roomList']) || [];
                  const lastRoomCode = roomList?.[roomList.length - 1]?.code;
                  if (/^[0-9]+$/.test(lastRoomCode)) {
                    add({
                      code: String(+lastRoomCode + 1),
                    });
                  } else {
                    add({});
                  }
                  form?.setFieldsValue({
                    roomCount: roomList.length + 1,
                  });
                }}
              >
                新增房间
              </Button>
            ) : null}
          </Space>
        );
      }}
    </Form.List>
  );
}
