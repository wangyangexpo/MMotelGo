import { request } from 'umi';
import Cookie from 'js-cookie';

/** 获取登录信息接口 */
export async function autoLogin() {
  return request<API.Result_LoginInfo_>('/motel/user/login', {
    method: 'POST',
    data: {
      emailAddress: Cookie.get('emailAddress'),
      password: Cookie.get('password'),
    },
  });
}
