import { request } from 'umi';

/** 获取登录信息接口 */
export async function login(params?: Record<string, any>) {
  return request<API.Result_LoginInfo_>('/api/client/login', {
    method: 'GET',
    params: { ...params },
  });
}
