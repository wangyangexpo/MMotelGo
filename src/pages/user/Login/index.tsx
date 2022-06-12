import {
  LoginFormPage,
  ProFormText,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Cookie from 'js-cookie';
import type { CSSProperties } from 'react';
import { history } from 'umi';
import services from '@/services';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

export default () => {
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
        subTitle="全球最大酒店管理网站"
        onFinish={async (values) => {
          await services.UserController.accountLogin(values);
          if (values?.autoLogin) {
            Cookie.set('emailAddress', values?.emailAddress);
          } else {
            Cookie.remove('emailAddress');
          }
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
          placeholder={'邮箱'}
          rules={[
            {
              required: true,
              message: '请输入邮箱!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'密码'}
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
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin" initialValue={true}>
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
            onClick={() => {
              history.push('/user/regist');
            }}
          >
            注册账号
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};
