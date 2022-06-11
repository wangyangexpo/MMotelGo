import { request } from 'umi';

/** 获取登录信息接口 */
export async function accountRegister(params?: {
  nickName?: string;
  emailAddress?: string;
  password?: string;
}) {
  return request<API.Result>('/motel/user/registry', {
    method: 'POST',
    data: { ...params },
  });
}

/** 登录接口 */
export async function accountLogin(params?: {
  emailAddress?: string;
  password?: string;
}) {
  return request<API.Result_LoginInfo_>('/motel/user/login', {
    method: 'POST',
    data: { ...params },
  });
}
