import { ProFormText } from '@ant-design/pro-components';
import { Card, Skeleton, Form, Tabs, Space, Button, message } from 'antd';
import AuthorityCheckGroup, {
  AuthorityTypeEnum,
} from './components/AuthorityCheckGroup';
import { flatten, values } from 'lodash-es';
import { useRequest, useParams, useHistory } from 'umi';
import services from '@/services';
// import './less.less';

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

export default () => {
  const [form] = Form.useForm();
  const params = useParams<{ accountId: string }>();
  const history = useHistory();

  const isUpdate = !!params?.accountId;

  const { data: account, loading: detailLoading } = useRequest(() => {
    if (params.accountId) {
      return services.AccountController.getAccountDetail({
        accountId: params.accountId,
      });
    }
    return Promise.resolve({ data: null });
  });

  // 已选中的菜单权限
  const menuChecked = account?.menuAuthorityList || [];
  // 已选中的全局权限
  // const globalChecked = account?.overAllAuthorityList || [];

  const { data: authority, loading: authorityLoading } = useRequest(() => {
    return services.AccountController.getAccountAuthorityList();
  });
  const { menuAuthorityList } = authority || {};
  return (
    <Skeleton loading={authorityLoading || detailLoading}>
      <Form {...formLayout} form={form}>
        <Card
          title="基本设置"
          extra={
            <>
              <Button
                type="primary"
                onClick={async () => {
                  try {
                    const formData = await form.validateFields();
                    const menuAuthorityList =
                      flatten(values(formData?.menuAuthorityList)) || [];
                    // const overAllAuthorityList =
                    //   flatten(values(formData?.overAllAuthorityList)) || [];
                    await services.AccountController.addPmsAccount(
                      {
                        ...formData,
                        accountId: params.accountId,
                        menuAuthorityList,
                      },
                      isUpdate ? 'update' : 'add',
                    );
                    message.success(isUpdate ? '保存成功' : '添加成功');
                    history.goBack();
                  } catch (error) {}
                }}
              >
                保存
              </Button>
            </>
          }
        >
          <ProFormText
            label="账号（邮箱）"
            name="emailAddress"
            fieldProps={{
              maxLength: 100,
            }}
            rules={[{ required: true, message: '请输入邮箱账号' }]}
            initialValue={account?.emailAddress}
          />
          <ProFormText
            label="员工姓名"
            name="nickName"
            fieldProps={{
              maxLength: 100,
            }}
            rules={[{ required: true, message: '请输入员工姓名' }]}
            initialValue={account?.nickName}
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
                                checkedValues={menuChecked}
                                prefixName={mainMenuName}
                                type={AuthorityTypeEnum.MENU}
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
