import { Button, Typography, Switch, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import Cookie from 'js-cookie';
import services from '@/services';

const { Link } = Typography;

type TableListItem = Partial<SETTING.ConsumerItem>;

export default () => {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '分类',
      ellipsis: true,
      dataIndex: 'classifyName',
    },
    {
      title: '消费项名称',
      ellipsis: true,
      dataIndex: 'name',
    },
    {
      title: '价格',
      width: 120,
      dataIndex: 'price',
    },
    {
      title: '状态',
      dataIndex: 'status',
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
          <Link key="edit" onClick={() => {}}>
            编辑
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
        const { data } = await services.SettingController.getConsumerItemList({
          storeId: Cookie.get('storeId'),
          ...params,
        });
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
      search={false}
      toolBarRender={() => [
        <Button type="primary" icon={<PlusOutlined />} onClick={() => {}}>
          添加消费项
        </Button>,
      ]}
    />
  );
};
