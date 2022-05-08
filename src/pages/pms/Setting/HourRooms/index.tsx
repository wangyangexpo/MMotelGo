import React from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import useAddHourRoom from './components/AddHourRoomModal';
import { Button } from 'antd';
import services from '@/services';

const SettingRoomsPage: React.FC = () => {
  const { addHourRoomModal, openAddHourRoomModal } = useAddHourRoom();
  const columns: ProColumns<SETTING.HourRoom>[] = [
    {
      title: '房型名称',
      width: 180,
      dataIndex: 'roomTypeName',
      ellipsis: true,
    },
    { title: '入住时长', width: 180, dataIndex: 'lengthOfStay' },
    {
      title: '价格',
      width: 140,
      dataIndex: 'price',
      render: (_, record) => {
        return record?.price ? '¥' + record.price : '-';
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
          <a key="1" onClick={() => {}}>
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
        columns={columns}
        scroll={{ x: 'scroll' }}
        options={false}
        search={false}
        request={async (params) => {
          const { data } = await services.SettingController.getHourRoomList(
            params,
          );
          const { list, totalCount } = data;
          return {
            data: list,
            total: totalCount,
          };
        }}
        rowKey="id"
        toolBarRender={(action) => [
          <Button
            type="primary"
            onClick={() => {
              openAddHourRoomModal(action);
            }}
          >
            新增钟点房
          </Button>,
        ]}
      ></ProTable>
      {addHourRoomModal}
    </>
  );
};

export default SettingRoomsPage;
