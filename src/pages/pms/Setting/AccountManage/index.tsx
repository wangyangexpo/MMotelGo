import { Button, Typography, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import services from '@/services';

const { Link } = Typography;

type TableListItem = Partial<ACCOUNT.AccountData>;

export default () => {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '账号',
      width: 140,
      ellipsis: true,
      dataIndex: 'emailAddress',
      formItemProps: {
        name: 'searchParam',
      },
      fieldProps: {
        placeholder: '请输入账号、员工姓名',
      },
    },
    {
      title: '员工姓名',
      width: 140,
      ellipsis: true,
      dataIndex: 'nickName',
      search: false,
    },
    {
      title: '状态',
      width: 90,
      dataIndex: 'status',
      search: false,
      render: (_, record) => {
        return <Switch defaultChecked={record.status === 1} />;
      },
    },
    {
      title: '操作',
      fixed: 'right',
      width: 120,
      key: 'option',
      valueType: 'option',
      render: (_text, record, _, action) => {
        return [
          <Link key="edit" onClick={() => {}}>
            设置权限
          </Link>,
          <Link key="status" onClick={() => {}}>
            删除
          </Link>,
        ];
      },
    },
  ];

  return (
    <PageContainer
      ghost
      header={{
        title: '账户列表',
      }}
    >
      <ProTable<TableListItem>
        size="large"
        scroll={{ x: 'scroll' }}
        columns={columns}
        request={async (params) => {
          const { data } = await services.AccountController.getPmsAccountList(
            params,
          );
          const { list, total } = data || {};
          return {
            total,
            data: list || [],
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
