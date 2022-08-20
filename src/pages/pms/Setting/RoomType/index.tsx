import React from 'react';
import ProTable from '@ant-design/pro-table';
import { useIntl } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, Popconfirm, message, Space } from 'antd';
import useAddRoomType from './components/AddRoomTypeModal';
import services from '@/services';

const SettingRoomsPage: React.FC = () => {
  const intl = useIntl();
  const { addRoomTypeModal, openAddRoomTypeModal } = useAddRoomType();

  const columns: ProColumns<SETTING.RoomType>[] = [
    {
      title: intl.formatMessage({ id: '房型名称' }),
      width: 120,
      dataIndex: 'roomTypeName',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: '简称' }),
      width: 120,
      dataIndex: 'roomTypeShortName',
    },
    {
      title: intl.formatMessage({ id: '默认门市价' }),
      width: 100,
      dataIndex: 'defaultPrice',
      render: (_, record) => {
        if (record.defaultPriceType === 1) {
          return record?.defaultPrice ? '¥' + record.defaultPrice : '-';
        }
        return (
          <Space direction="vertical">
            <div>
              <span>平日：</span>
              <span>
                {record?.weekDayPrice ? '¥' + record.weekDayPrice : '-'}
              </span>
            </div>
            <div>
              <span>周末：</span>
              <span>
                {record?.weekEndPrice ? '¥' + record.weekEndPrice : '-'}
              </span>
            </div>
          </Space>
        );
      },
    },
    {
      title: intl.formatMessage({ id: '房间数' }),
      width: 80,
      dataIndex: 'roomCount',
    },
    {
      title: intl.formatMessage({ id: '房间号' }),
      width: 180,
      dataIndex: 'roomCodeList',
      ellipsis: true,
      render: (_, record) => {
        return record?.roomCodeList?.join('，');
      },
    },
    {
      title: intl.formatMessage({ id: '操作' }),
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
            {intl.formatMessage({ id: '编辑' })}
          </a>,
          <Popconfirm
            key="2"
            placement="topLeft"
            title="确定要删除该房型房间？"
            onConfirm={async () => {
              try {
                await services.SettingController.deleteRoomType({
                  id: record.id,
                });
                message.success('删除成功');
                action?.reload();
              } catch (error) {}
            }}
          >
            <a>{intl.formatMessage({ id: '删除' })}</a>
          </Popconfirm>,
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
          const { list, totalCount } = data || {};
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
