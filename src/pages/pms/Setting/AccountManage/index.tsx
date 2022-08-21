import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';

const { Link } = Typography;

type TableListItem = Partial<{}>;

export default () => {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '名称',
      width: 180,
      ellipsis: true,
      dataIndex: 'name',
      formItemProps: {
        name: 'searchParam',
      },
      fieldProps: {
        placeholder: '请输入名称',
      },
    },
    {
      title: '操作',
      fixed: 'right',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (_text, record, _, action) => {
        return [
          <Link key="edit" onClick={() => {}}>
            编辑
          </Link>,
          <Link key="status" onClick={() => {}}>
            启用
          </Link>,
        ];
      },
    },
  ];

  return (
    <PageContainer
      ghost
      header={{
        title: '标题',
      }}
    >
      <ProTable<TableListItem>
        size="large"
        scroll={{ x: 'scroll' }}
        columns={columns}
        request={async (params) => {
          return {
            success: true,
          };
        }}
        options={false}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={(action) => [
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {}}>
            添加
          </Button>,
        ]}
      />
    </PageContainer>
  );
};
