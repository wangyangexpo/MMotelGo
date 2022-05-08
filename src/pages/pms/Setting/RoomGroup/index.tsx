import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import SortableList from '@/components/SortableList';
import { Button, Alert, Card, Typography, Form, Input } from 'antd';
import RoomCard from './components/RoomCard';
import services from '@/services';

const FormItem = Form.Item;

const SettingRoomGroup: React.FC = () => {
  const [editable, setEditable] = useState(false);
  const [form] = Form.useForm();

  const columns: ProColumns<SETTING.RoomGroup>[] = [
    {
      title: '分组名称',
      width: 240,
      dataIndex: 'groupName',
      render: (_, record, index) => {
        if (editable) {
          return (
            <FormItem
              noStyle
              name={['list', index, 'groupName']}
              initialValue={record.groupName}
            >
              <Input></Input>
            </FormItem>
          );
        }
        return record.groupName;
      },
    },
    {
      title: '房间号',
      dataIndex: 'rooms',
      render: (_, record) => {
        if (editable) {
          return (
            <SortableList
              groupName="roomGroup"
              dataSource={
                record?.rooms?.map((name) => ({
                  name,
                })) || []
              }
              style={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
              renderItem={(item) => {
                return <RoomCard name={item.name} draggable />;
              }}
            ></SortableList>
          );
        }
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {record?.rooms?.map((code) => {
              return <RoomCard name={code} key={code} draggable={editable} />;
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
      <Form form={form}>
        <ProTable
          bordered
          columns={columns}
          style={{ marginTop: 24 }}
          options={false}
          search={false}
          pagination={false}
          request={async () => {
            const { data } =
              await services.SettingController.getRoomGroupList();
            const { list } = data;
            return {
              data: list,
            };
          }}
          rowKey="id"
          toolBarRender={(action) => [
            <Button
              type="primary"
              onClick={() => {
                setEditable(!editable);
              }}
            >
              编辑
            </Button>,
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
            <SortableList
              groupName="roomGroup"
              dataSource={
                ['1001', '1123', '1201'].map((name) => ({
                  name,
                })) || []
              }
              style={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
              renderItem={(item) => {
                return <RoomCard name={item.name} draggable />;
              }}
            ></SortableList>
          ) : (
            ['1001', '1123', '1201'].map((code) => {
              return <RoomCard name={code} key={code} draggable={editable} />;
            })
          )}
        </Card>
      </Form>
    </div>
  );
};

export default SettingRoomGroup;
