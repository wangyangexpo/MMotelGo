import { Space, Card, Button } from 'antd';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { ModalForm, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import services from '@/services';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function StorePage() {
  const { data, run } = useRequest(() => {
    return services.UserController.getPmsStoreList();
  });

  return (
    <PageContainer
      ghost
      header={{
        title: '门店列表',
      }}
      style={{ minHeight: '100vh' }}
    >
      <Space wrap size={[12, 12]}>
        {data?.list?.map((store) => {
          return (
            <Card title={store.storeName} key={store.storeId}>
              到期时间：{store.expirationTime}
            </Card>
          );
        })}
      </Space>
      <ModalForm<Partial<SYSTEM.ShopDetail>>
        title="添加门店"
        trigger={<Button type="primary">添加门店</Button>}
        autoFocusFirstInput
        modalProps={{
          width: 600,
        }}
        onFinish={async (values) => {
          await services.UserController.newPmsStore(values);
          run();
          return true;
        }}
        layout="horizontal"
        {...formItemLayout}
      >
        <ProFormText
          name="name"
          label="门店名称"
          fieldProps={{
            maxLength: 20,
          }}
          rules={[{ required: true }]}
        />
        <ProFormText
          name="code"
          label="门店编号"
          rules={[{ required: true }]}
        />
        <ProFormRadio.Group
          label="门店类型"
          name="type"
          initialValue={1}
          options={[
            { label: '⺠宿', value: 1 },
            { label: '其他', value: 2 },
          ]}
        />
        <ProFormText
          name="address"
          label="一级地址"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="detailAddress"
          label="详细地址"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="bossName"
          label="负责人姓名"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="emailAccount"
          label="负责人邮箱"
          rules={[{ required: true }]}
        />
      </ModalForm>
    </PageContainer>
  );
}
