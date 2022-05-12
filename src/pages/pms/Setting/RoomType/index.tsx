import React from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import useAddRoomType from './components/AddRoomTypeModal';
import services from '@/services';

const SettingRoomsPage: React.FC = () => {
  const { addRoomTypeModal, openAddRoomTypeModal } = useAddRoomType();

  const columns: ProColumns<SETTING.RoomType>[] = [
    {
      title: '房型名称',
      width: 120,
      dataIndex: 'roomTypeName',
      ellipsis: true,
    },
    { title: '简称', width: 120, dataIndex: 'roomTypeShortName' },
    {
      title: '默认门市价',
      width: 100,
      dataIndex: 'defaultPrice',
      render: (_, record) => {
        return record?.defaultPrice ? '¥' + record.defaultPrice : '-';
      },
    },
    {
      title: '房间数',
      width: 80,
      dataIndex: 'roomCount',
    },
    {
      title: '房间号',
      width: 180,
      dataIndex: 'roomCodeList',
      ellipsis: true,
      render: (_, record) => {
        return record?.roomCodeList?.join('，');
      },
    },
    {
      title: '操作',
      width: 120,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_text, record, _, action) => {
        return [
          <a
            key="1"
            onClick={() => {
              openAddRoomTypeModal(action, record?.id);
            }}
          >
            编辑
          </a>,
          <a key="2" onClick={() => {}}>
            删除
          </a>,
        ];
      },
    },
  ];

  return (
    <>
      <ProTable
        scroll={{ x: 'scroll' }}
        columns={columns}
        options={false}
        search={false}
        request={async (params) => {
          const { data } = await services.SettingController.getRoomTypeList(
            params,
          );
          const { list, totalCount } = data;
          return {
            data: list,
            total: totalCount,
          };
        }}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        toolBarRender={(action) => [
          <Button
            type="primary"
            onClick={() => {
              openAddRoomTypeModal(action);
            }}
          >
            新增房型
          </Button>,
        ]}
      ></ProTable>
      {addRoomTypeModal}
    </>
  );
};

export default SettingRoomsPage;
