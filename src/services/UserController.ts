import { request } from 'umi';
import Cookie from 'js-cookie';
import { history } from 'umi';

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
  if (!params?.emailAddress || !params?.password) {
    history.replace('/user/login');
    return Promise.reject();
  }
  return request<API.Result_LoginInfo_>('/motel/user/login', {
    method: 'POST',
    data: params,
  }).then(({ data }) => {
    Cookie.set('token', data?.token);
  });
}

/** 获取门店列表 */
export async function getPmsStoreList() {
  return request<API.Result_PmsStoreList_>('/motel/store/getPmsStoreList', {
    method: 'GET',
  });
}

/** 添加门店 */
export async function newPmsStore(params?: Partial<SYSTEM.ShopDetail>) {
  return request<API.Result>('/motel/store/newStore', {
    method: 'POST',
    data: { ...params },
  });
}

/** 选择门店进入系统 */
export async function bindPmsStoreToken() {
  const storeId = Cookie.get('storeId');
  if (!storeId) {
    history.replace('/user/login');
    return Promise.reject();
  }
  return request<API.Result>('/motel/store/getPmsStore', {
    method: 'GET',
    params: {
      storeId: Cookie.get('storeId'),
    },
  });
}
