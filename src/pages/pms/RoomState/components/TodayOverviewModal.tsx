import React, { useState } from 'react';
import { Button, Tabs } from 'antd';
import { useIntl } from 'umi';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, ModalForm } from '@ant-design/pro-components';
import services from '@/services';

const { TabPane } = Tabs;

type TableListItem = Partial<ROOM_STATE.RoomOverview>;

const columns: ProColumns<TableListItem>[] = [
  {
    title: '姓名',
    width: 120,
    ellipsis: true,
    dataIndex: 'reserveName',
  },
  {
    title: '邮箱账号',
    width: 140,
    dataIndex: 'emailAccount',
    ellipsis: true,
  },
  { title: '渠道', width: 100, dataIndex: 'channelName' },
  {
    title: '房间类型',
    width: 100,
    dataIndex: 'type',
    valueEnum: { 1: '全日房', 2: '钟点房' },
  },
  { title: '房型', width: 120, dataIndex: 'roomTypeName' },
  { title: '房间号', width: 120, dataIndex: 'roomCode' },
  {
    title: '入离时间',
    width: 180,
    dataIndex: 'startTime',
    valueType: 'dateTime',
  },
  {
    title: '金额',
    width: 120,
    dataIndex: 'roomPrice',
  },
];

interface Props {}

export default (props: Props) => {
  const intl = useIntl();
  const [status, setStatus] = useState('1');
  return (
    <ModalForm
      width={1000}
      layout="horizontal"
      modalProps={{
        maskClosable: false,
      }}
      title="今日概览"
      trigger={
        <Button type="primary">{intl.formatMessage({ id: '今日概览' })}</Button>
      }
      onFinish={async () => {
        return true;
      }}
    >
      <Tabs defaultActiveKey={status} onChange={(key) => setStatus(key)}>
        <TabPane tab="今日预抵" key="1"></TabPane>
        <TabPane tab="今日预离" key="2"></TabPane>
        <TabPane tab="今日在住" key="3"></TabPane>
        <TabPane tab="未排房" key="4"></TabPane>
      </Tabs>
      <ProTable<TableListItem, { status: string }>
        params={{ status }}
        scroll={{ x: 'scroll' }}
        form={{ component: false }}
        tableAlertRender={false}
        columns={columns}
        request={async (params) => {
          const { data } = await services.RoomStateController.getTodayOverview(
            params,
          );
          const { list, totalCount } = data;
          return {
            data: list,
            success: true,
            total: totalCount,
          };
        }}
        search={false}
        options={false}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
      />
    </ModalForm>
  );
};
