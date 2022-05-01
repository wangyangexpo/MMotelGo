import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, Alert, Space, Card, Typography } from 'antd';
import RoomCard from './components/RoomCard';
import services from '@/services';

const SettingRoomGroup: React.FC = () => {
  const [editable, setEditable] = useState(false);

  const columns: ProColumns<SETTING.RoomGroup>[] = [
    {
      title: '分组名称',
      width: 240,
      dataIndex: 'groupName',
    },
    {
      title: '房间号',
      dataIndex: 'rooms',
      render: (_, record) => {
        return (
          <Space wrap>
            {record?.rooms?.map((code) => {
              return <RoomCard name={code} draggable={editable} />;
            })}
          </Space>
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
      <ProTable
        bordered
        columns={columns}
        style={{ marginTop: 24 }}
        options={false}
        search={false}
        pagination={false}
        request={async () => {
          const { data } = await services.SettingController.getRoomGroupList();
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
        <Space wrap>
          {['1001', '1123', '1201'].map((code) => {
            return <RoomCard name={code} draggable={editable} />;
          })}
        </Space>
      </Card>
    </div>
  );
};

export default SettingRoomGroup;
