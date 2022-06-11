import {
  LoginFormPage,
  ProFormText,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { message, Divider, Tabs, Space, Button } from 'antd';
import Cookie from 'js-cookie';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { history, useModel } from 'umi';
import services from '@/services';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

export default () => {
  const { setInitialState } = useModel('@@initialState');
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
          const { data } = await services.UserController.accountLogin(values);
          Cookie.set('token', data?.token);
          if (values?.autoLogin) {
            Cookie.set('emailAddress', values?.emailAddress);
            Cookie.set('password', values?.password);
            setInitialState(data);
          } else {
            Cookie.remove('emailAddress');
            Cookie.remove('password');
          }
          history.push('/pms/home');
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
          initialValue={Cookie.get('password')}
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
          <ProFormCheckbox noStyle name="autoLogin">
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
