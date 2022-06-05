import {
  MailOutlined,
  UserOutlined,
  KeyOutlined,
  TagOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Form, Button } from 'antd';
import { emailPattern } from '@/constants';
// import { useState } from 'react';

export default () => {
  const [form] = Form.useForm();
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
                  console.log(values);
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
          name="userName"
          placeholder={'请输入用户昵称'}
          rules={[
            {
              required: true,
              message: '请输入用户昵称！',
            },
          ]}
        />
        <ProFormCaptcha
          fieldProps={{
            prefix: <MailOutlined />,
          }}
          captchaProps={{
            type: 'primary',
          }}
          placeholder={'请输入邮箱账号'}
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${'获取验证码'}`;
            }
            return '验证邮箱';
          }}
          name="email"
          phoneName="email"
          rules={[
            {
              required: true,
              message: '请输入邮箱账号',
            },
            {
              pattern: emailPattern,
              message: '邮箱账号格式不正确',
              validateTrigger: 'blur',
            },
          ]}
          onGetCaptcha={async (value) => {
            if (!emailPattern.test(value)) {
              return Promise.reject('邮箱账号格式不正确');
            }
            message.success('邮箱验证码发送成功！');
            return Promise.resolve();
          }}
        />
        <ProFormText
          name="validCode"
          fieldProps={{
            prefix: <TagOutlined />,
          }}
          rules={[
            {
              required: true,
              message: '请输入邮箱验证码',
            },
          ]}
          placeholder="请输入邮箱验证码"
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
        <ProFormText
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
        />
      </LoginForm>
    </div>
  );
};
