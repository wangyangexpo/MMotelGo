import { Space, Card, Button, Row, Col } from 'antd';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { ModalForm, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import Cookie from 'js-cookie';
import { useHistory } from 'umi';
import services from '@/services';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function StorePage() {
  const history = useHistory();

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
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Space wrap size={[12, 12]}>
            {data?.list?.map((store) => {
              return (
                <Card
                  key={store.storeId}
                  hoverable
                  style={{ width: 240 }}
                  onClick={async () => {
                    Cookie.set('storeId', store.storeId);
                    await services.UserController.bindPmsStoreToken();
                    history.push('/');
                  }}
                >
                  <Card.Meta
                    title={store.storeName}
                    description={<>到期时间：{store.expirationTime}</>}
                  />
                </Card>
              );
            })}
          </Space>
        </Col>
        <Col>
          <ModalForm<Partial<SYSTEM.ShopDetail>>
            title="添加门店"
            trigger={<Button type="primary">添加门店</Button>}
            autoFocusFirstInput
            modalProps={{
              width: 600,
              destroyOnClose: true,
            }}
            onFinish={async (values) => {
              await services.UserController.newPmsStore(values);
              run();
              return true;
            }}
            layout="horizontal"
            preserve={false}
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
            <ProFormText name="detailAddress" label="详细地址" />
            <ProFormText
              name="bossName"
              label="负责人姓名"
              rules={[{ required: true }]}
            />
            <ProFormText
              name="bossEmail"
              label="负责人邮箱"
              initialValue={Cookie.get('emailAddress')}
              rules={[
                {
                  type: 'email',
                  message: '邮箱格式不正确',
                },
              ]}
              hidden
            />
            <ProFormText name="bossPhoneNo" label="门店座机" />
            <ProFormText
              name="activationCode"
              label="激活码"
              rules={[{ required: true }]}
            />
          </ModalForm>
        </Col>
      </Row>
    </PageContainer>
  );
}
