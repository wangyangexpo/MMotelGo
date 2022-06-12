import React from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import services from '@/services';

const columns: ProColumns<SETTING.PriceLog>[] = [
  { title: '本地房型', width: 120, dataIndex: 'roomTypeName', ellipsis: true },
  { title: '价格渠道', width: 120, dataIndex: '1', ellipsis: true },
  { title: '渠道房型', width: 120, dataIndex: '1', ellipsis: true },
  { title: '价格日期', width: 120, dataIndex: '1', ellipsis: true },
  { title: '修改前价格', width: 120, dataIndex: '1', ellipsis: true },
  { title: '修改后价格', width: 120, dataIndex: '1', ellipsis: true },
  { title: '操作人', width: 100, dataIndex: '1', ellipsis: true },
  { title: '改价状态', width: 100, dataIndex: '1', ellipsis: true },
  { title: '操作时间', width: 140, dataIndex: '1' },
];

const SettingPriceChangeLog: React.FC = () => {
  return (
    <ProTable
      scroll={{ x: 'scroll' }}
      columns={columns}
      options={false}
      search={false}
      request={async (params) => {
        const { data } = await services.SettingController.getPriceChangeLog(
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
        <Button type="primary" onClick={() => {}}>
          导出
        </Button>,
      ]}
    ></ProTable>
  );
};

export default SettingPriceChangeLog;
