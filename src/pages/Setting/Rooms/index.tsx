import React from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';

const SettingRoomsPage: React.FC = () => {
  const columns: ProColumns[] = [
    {
      title: '角色名',
      width: 180,
      dataIndex: 'roleName',
      ellipsis: true,
      fieldProps: {
        placeholder: '搜索角色名称',
      },
    },
    { title: '创建人', width: 100, dataIndex: 'creator', search: false },
    { title: '修改人', width: 100, dataIndex: 'operator', search: false },
    {
      title: '最后修改时间',
      width: 180,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      width: 120,
      key: 'option',
      valueType: 'option',
      render: (_text, record, _, action) => {
        return [
          <a key="1" onClick={() => {}}>
            编辑
          </a>,
        ];
      },
    },
  ];

  return (
    <ProTable
      columns={columns}
      options={false}
      search={{
        defaultCollapsed: false,
      }}
      toolBarRender={(action) => [
        <Button type="primary" onClick={() => {}}>
          添加房型
        </Button>,
      ]}
    ></ProTable>
  );
};

export default SettingRoomsPage;
