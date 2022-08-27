import { MailOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Form, Button } from 'antd';
import { emailPattern } from '@/constants';
import services from '@/services';
import { useHistory } from 'umi';

export default () => {
  const [form] = Form.useForm();
  const history = useHistory();
  return (
    <div style={{ backgroundColor: 'white' }}>
      <LoginForm
        form={form}
        size="large"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="MotelGo"
        subTitle="账号注册"
        submitter={{
          render: () => {
            return (
              <Button
                type="primary"
                block
                onClick={async () => {
                  const values = await form.validateFields();
                  await services.UserController.accountRegister(values);
                  history.push('/user/login');
                }}
              >
                注册
              </Button>
            );
          },
        }}
      >
        <ProFormText
          fieldProps={{
            prefix: <UserOutlined />,
          }}
          name="nickName"
          placeholder={'请输入用户昵称'}
          rules={[
            {
              required: true,
              message: '请输入用户昵称',
            },
          ]}
        />
        <ProFormText
          fieldProps={{
            prefix: <MailOutlined />,
          }}
          name="emailAddress"
          placeholder={'请输入邮箱账号'}
          rules={[
            {
              required: true,
              message: '请输入邮箱账号',
            },
            {
              pattern: emailPattern,
              message: '邮箱账号格式不正确',
            },
          ]}
        />
        <ProFormText
          name="password"
          fieldProps={{
            type: 'password',
            prefix: <KeyOutlined />,
          }}
          rules={[
            {
              required: true,
              message: '请输入用户密码',
            },
          ]}
          placeholder="请输入用户密码"
        />
        {/* <ProFormText
          name="confirmPassword"
          fieldProps={{
            type: 'password',
            prefix: <KeyOutlined />,
          }}
          rules={[
            {
              required: true,
              message: '请确认用户密码',
            },
          ]}
          placeholder="请确认用户密码"
        /> */}
      </LoginForm>
    </div>
  );
};
