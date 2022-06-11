import { Space, Card, Button } from 'antd';
import { useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

export default function StorePage() {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer
      ghost
      header={{
        title: '酒店列表',
      }}
      style={{ minHeight: '100vh' }}
    >
      <Space wrap size={[12, 12]}>
        {initialState?.storeList?.map((store) => {
          return (
            <Card title={store.storeName} key={store.storeId}>
              到期时间：{store.expirationTime}
            </Card>
          );
        })}
      </Space>
      <Button type="primary">添加酒店</Button>
    </PageContainer>
  );
}
