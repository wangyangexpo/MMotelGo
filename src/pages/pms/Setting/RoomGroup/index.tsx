import React, { useState, useEffect } from 'react';
import { useRequest } from 'umi';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import SortableList from '@/components/SortableList';
import {
  Button,
  Alert,
  Card,
  Typography,
  Form,
  Input,
  Space,
  message,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import RoomCard from './components/RoomCard';
import services from '@/services';

const FormItem = Form.Item;
let uuid = -1;

const SettingRoomGroup: React.FC = () => {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState(false);
  const [groupData, setGroupData] = useState<SETTING.RoomGroup[]>([]);

  const { data, run } = useRequest(() => {
    return services.SettingController.getRoomGroupList();
  });

  useEffect(() => {
    setGroupData(data?.list || []);
  }, [data]);

  const hasGroup = groupData?.filter?.((g) => g.groupId) || [];
  const noneGroupRooms =
    groupData?.filter?.((g) => !g.groupId)?.[0]?.rooms || [];

  const columns: ProColumns<SETTING.RoomGroup>[] = [
    {
      title: '分组名称',
      width: 240,
      dataIndex: 'groupName',
      render: (_, record, index) => {
        if (editable) {
          return (
            <Space>
              <FormItem
                hidden
                name={['list', index, 'groupId']}
                initialValue={record.groupId}
              >
                <Input />
              </FormItem>
              <FormItem
                hidden
                name={['list', index, 'groupType']}
                initialValue={1}
              >
                <Input />
              </FormItem>
              <FormItem
                noStyle
                name={['list', index, 'groupName']}
                initialValue={record.groupName}
                preserve={false}
                rules={[{ required: true, message: '请填写分组名' }]}
              >
                <Input></Input>
              </FormItem>
              <DeleteOutlined
                onClick={() => {
                  const ngRooms =
                    groupData?.filter?.((g) => !g.groupId)?.[0]?.rooms || [];
                  const gList = groupData?.filter?.((g) => g.groupId) || [];
                  const newGroupList = (
                    gList?.filter((g) => g.groupId !== record.groupId) || []
                  ).concat([
                    {
                      rooms: ngRooms.concat(record?.rooms || []),
                    },
                  ]);
                  form.setFieldsValue({
                    noneGroup: ngRooms,
                  });
                  setGroupData(newGroupList);
                }}
              />
            </Space>
          );
        }
        return record.groupName;
      },
    },
    {
      title: '房间号',
      dataIndex: 'rooms',
      render: (_, record, index) => {
        if (editable) {
          return (
            <FormItem
              noStyle
              name={['list', index, 'rooms']}
              initialValue={record?.rooms || []}
            >
              <SortableList
                groupName="roomGroup"
                dataSource={record?.rooms || []}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
                renderItem={(item) => {
                  return (
                    <RoomCard name={item?.roomCode} key={item.id} draggable />
                  );
                }}
              ></SortableList>
            </FormItem>
          );
        }
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {record?.rooms?.filter(Boolean)?.map((item) => {
              return (
                <RoomCard
                  name={item?.roomCode}
                  key={item.id}
                  draggable={editable}
                />
              );
            })}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Alert
        closable
        message="设置分组后，可在日历房态页面按照分组进行筛选。例：可设置【杭州西湖区】分组，将所有位于西湖区的房间分配在该分组下"
        type="info"
      />
      <Form form={form} preserve={false}>
        <ProTable
          bordered
          columns={columns}
          style={{ marginTop: 24 }}
          options={false}
          search={false}
          pagination={false}
          dataSource={hasGroup}
          footer={() => {
            return editable ? (
              <Button
                type="primary"
                ghost
                onClick={() => {
                  setGroupData([...groupData, { groupId: uuid--, rooms: [] }]);
                }}
              >
                新增分组
              </Button>
            ) : (
              false
            );
          }}
          rowKey="groupId"
          toolBarRender={() => [
            editable ? (
              <Space>
                <Button
                  onClick={() => {
                    run();
                    setEditable(false);
                  }}
                >
                  取消
                </Button>
                <Button
                  type="primary"
                  onClick={async () => {
                    try {
                      const data = await form.validateFields();
                      const groupList = data?.list || [];
                      groupList.push({
                        groupType: 0,
                        groupName: '',
                        groupId: null,
                        rooms: data?.noneGroup,
                      });
                      await services.SettingController.updateRoomGroup({
                        groupList,
                      });
                      run();
                      setEditable(false);
                    } catch (error: any) {
                      if (error?.errorFields) {
                        message.error('请输入分组名称');
                      }
                    }
                  }}
                >
                  保存
                </Button>
              </Space>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  setEditable(true);
                }}
              >
                编辑
              </Button>
            ),
          ]}
        ></ProTable>
        <Card
          title={
            <div>
              未分组房间
              <Typography.Text
                type="secondary"
                style={{ fontSize: 12, marginLeft: 12 }}
              >
                点击编辑才可拖拽房间至分组
              </Typography.Text>
            </div>
          }
          style={{ marginTop: 24 }}
        >
          {editable ? (
            <FormItem noStyle name="noneGroup" initialValue={noneGroupRooms}>
              <SortableList
                groupName="roomGroup"
                dataSource={noneGroupRooms}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
                renderItem={(item) => {
                  return (
                    <RoomCard name={item.roomCode} key={item.id} draggable />
                  );
                }}
              ></SortableList>
            </FormItem>
          ) : (
            noneGroupRooms.map((item) => {
              return (
                <RoomCard
                  name={item.roomCode}
                  key={item.id}
                  draggable={editable}
                />
              );
            })
          )}
        </Card>
      </Form>
    </div>
  );
};

export default SettingRoomGroup;
