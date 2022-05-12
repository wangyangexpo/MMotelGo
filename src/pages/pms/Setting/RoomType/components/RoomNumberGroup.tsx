import { useEffect } from 'react';
import { Input, Space, Form, Button, Badge } from 'antd';
import type { FormInstance } from '@ant-design/pro-form';
import { PlusOutlined, CloseCircleFilled } from '@ant-design/icons';

interface Props {
  form?: FormInstance;
  roomCount?: number;
  initialValue?: string[];
}

export default function RoomNumberGroup(props: Props) {
  const { initialValue, roomCount, form } = props;

  useEffect(() => {
    if (roomCount) {
      const roomCodeList = form?.getFieldValue(['roomCodeList']) || [];
      const newRoomCodes = roomCodeList.slice(0, roomCount);
      if (newRoomCodes.length >= roomCount) {
        // 房间减少
        form?.setFieldsValue({
          roomCodeList: newRoomCodes,
        });
      } else {
        // 房间增加
        const lastRoomCode = roomCodeList?.[roomCodeList.length - 1];
        const appendRooms = [...newRoomCodes];
        for (let i = 1; i <= roomCount - newRoomCodes.length; i++) {
          if (/^[0-9]+$/.test(lastRoomCode)) {
            appendRooms.push(String(+lastRoomCode + i));
          } else {
            appendRooms.push('');
          }
        }
        form?.setFieldsValue({
          roomCodeList: appendRooms,
        });
      }
    }
  }, [roomCount]);

  return (
    <Form.List name="roomCodeList" initialValue={initialValue}>
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
                          const roomCodeList =
                            form?.getFieldValue(['roomCodeList']) || [];
                          form?.setFieldsValue({
                            roomCount: roomCodeList.length - 1,
                          });
                          remove(index);
                        }}
                      />
                    }
                  >
                    <Form.Item {...field} noStyle>
                      <Input
                        style={{ width: '105px' }}
                        placeholder="如：101"
                        allowClear
                      />
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
                  const roomCodeList =
                    form?.getFieldValue(['roomCodeList']) || [];
                  const lastRoomCode = roomCodeList?.[roomCodeList.length - 1];
                  if (/^[0-9]+$/.test(lastRoomCode)) {
                    add(String(+lastRoomCode + 1));
                  } else {
                    add('');
                  }
                  form?.setFieldsValue({
                    roomCount: roomCodeList.length + 1,
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
