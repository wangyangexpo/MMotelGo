import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import Cookie from 'js-cookie';
import type { CSSProperties } from 'react';
import { useHistory } from 'umi';
import services from '@/services';

const { Link, Text } = Typography;

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

export default () => {
  const history = useHistory();
  return (
    <div
      style={{
        backgroundColor: '#fff',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="MotelGo"
        subTitle="Hotel Online Property Management Platform"
        onFinish={async (values) => {
          await services.UserController.accountLogin(values);
          Cookie.set('emailAddress', values?.emailAddress);
          history.push('/pms/store');
        }}
      >
        <ProFormText
          name="emailAddress"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          initialValue={Cookie.get('emailAddress')}
          placeholder={'请输入邮箱账号'}
          rules={[
            {
              required: true,
              message: '请输入邮箱账号!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入密码'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div
          style={{
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link
            onClick={() => {
              history.push('/user/regist');
            }}
          >
            注册账号
          </Link>
          <Text
            type="secondary"
            onClick={() => {
              history.push('/user/reset_password');
            }}
          >
            忘记密码
          </Text>
        </div>
      </LoginFormPage>
    </div>
  );
};
