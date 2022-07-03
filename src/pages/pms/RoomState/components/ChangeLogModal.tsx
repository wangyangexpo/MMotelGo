import React, { useState } from 'react';
import { Button } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, ModalForm } from '@ant-design/pro-components';
import services from '@/services';

type TableListItem = Partial<ROOM_STATE.StateChangeLog>;

const columns: ProColumns<TableListItem>[] = [
  { title: '房型名称', width: 120, dataIndex: 'roomTypeName' },
  { title: '房间号', width: 120, dataIndex: 'roomCode' },
  {
    title: '操作内容',
    width: 80,
    dataIndex: 'operationDesc',
  },
  {
    title: '开始/结束时间',
    width: 180,
    dataIndex: 'startTime',
    valueType: 'dateTime',
  },
  {
    title: '备注',
    width: 120,
    ellipsis: true,
    dataIndex: 'remark',
  },
  {
    title: '操作人',
    width: 100,
    dataIndex: 'operator',
  },
  {
    title: '操作时间',
    width: 180,
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },
];

interface Props {}

export default (props: Props) => {
  return (
    <ModalForm
      width={1000}
      layout="horizontal"
      modalProps={{
        maskClosable: false,
      }}
      title="操作日志"
      trigger={<Button>操作日志</Button>}
      onFinish={async () => {
        return true;
      }}
    >
      <ProTable<TableListItem>
        scroll={{ x: 'scroll' }}
        form={{ component: false }}
        tableAlertRender={false}
        columns={columns}
        request={async (params) => {
          const { data } =
            await services.RoomStateController.getRoomStateChangeLog(params);
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
