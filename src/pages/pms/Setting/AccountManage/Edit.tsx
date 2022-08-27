import { ProFormText } from '@ant-design/pro-components';
import { Card, Skeleton, Form, Tabs, Space, Button } from 'antd';
import AuthorityCheckGroup from './components/AuthorityCheckGroup';
import { useRequest } from 'umi';
import services from '@/services';
// import './less.less';

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

export default () => {
  const [form] = Form.useForm();

  const { data, loading } = useRequest(() => {
    return services.AccountController.getAccountAuthorityList();
  });
  const { menuAuthorityList } = data || {};
  return (
    <Skeleton loading={loading}>
      <Form {...formLayout} form={form}>
        <Card
          title="基本设置"
          extra={
            <>
              <Button
                type="primary"
                onClick={() => {
                  const formData = form.getFieldsValue();
                  console.log(formData);
                }}
              >
                保存
              </Button>
            </>
          }
        >
          <ProFormText
            label="账号（邮箱）"
            name="email"
            fieldProps={{
              maxLength: 100,
            }}
            rules={[{ required: true, message: '请输入邮箱账号' }]}
            initialValue={null}
          />
          <ProFormText
            label="员工姓名"
            name="name"
            fieldProps={{
              maxLength: 100,
            }}
            rules={[{ required: true, message: '请输入员工姓名' }]}
            initialValue={null}
          />
        </Card>
        <Card title="权限设置" style={{ marginTop: 24 }}>
          <Tabs type="card">
            {menuAuthorityList?.map((module) => {
              const { mainMenuList, moduleName } = module || {};
              return (
                <Tabs.TabPane
                  key={moduleName}
                  tab={moduleName}
                  tabKey={moduleName}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {mainMenuList?.map((mainMenu) => {
                      const { subMenuList, mainMenuName, mainMenuId } =
                        mainMenu || {};
                      return (
                        <Card
                          size="small"
                          headStyle={{ background: '#f2f3f6' }}
                          title={mainMenuName}
                          key={mainMenuId}
                        >
                          {subMenuList?.map((subMenu) => {
                            return (
                              <AuthorityCheckGroup
                                menu={subMenu}
                                key={subMenu.menuId}
                                checkedValues={[]}
                                prefixName={mainMenuName}
                              />
                            );
                          })}
                        </Card>
                      );
                    })}
                  </Space>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </Card>
      </Form>
    </Skeleton>
  );
};
