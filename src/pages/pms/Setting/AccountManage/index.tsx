import { Button, Typography, Switch, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useHistory } from 'umi';
import services from '@/services';

const { Link } = Typography;

type TableListItem = Partial<ACCOUNT.AccountData>;

export default () => {
  const history = useHistory();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '账号',
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
      ellipsis: true,
      dataIndex: 'nickName',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      search: false,
      render: (_, record) => {
        return (
          <Switch
            defaultChecked={record.status === 1}
            onChange={async (checked) => {
              try {
                await services.AccountController.setPmsAccountStatus({
                  accountId: record.id,
                  status: checked ? 1 : 0,
                });
                message.success('操作成功');
              } catch (error) {
                message.error('操作失败');
              }
            }}
          />
        );
      },
    },
    {
      title: '操作',
      fixed: 'right',
      width: 140,
      key: 'option',
      valueType: 'option',
      render: (_text, record, _, action) => {
        const deleteAccount = async () => {
          try {
            await services.AccountController.deletePmsAccount({
              accountId: record.id,
            });
            message.success('删除成功！');
            action?.reload();
          } catch (error) {}
        };
        return [
          <Link
            key="edit"
            onClick={() => {
              history.push(
                '/pms/setting/account-list/add-or-edit/' + record.id,
              );
            }}
          >
            设置权限
          </Link>,
          <Popconfirm
            key="status"
            placement="topRight"
            title="此操作将永久删除, 是否继续？"
            onConfirm={deleteAccount}
          >
            <Link>删除</Link>
          </Popconfirm>,
        ];
      },
    },
  ];

  return (
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
      toolBarRender={() => [
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            history.push('/pms/setting/account-list/add-or-edit');
          }}
        >
          添加
        </Button>,
      ]}
    />
  );
};
