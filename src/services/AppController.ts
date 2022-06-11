import { request } from 'umi';

/** 获取登录信息接口 */
export async function login() {
  return request<API.Result_LoginInfo_>('/login', {
    method: 'POST',
  });
}
