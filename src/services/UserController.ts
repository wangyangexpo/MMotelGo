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

/** 获取门店列表 */
export async function getPmsStoreList() {
  return request<API.Result>('/motel/store/getPmsStoreList', {
    method: 'GET',
  });
}

/** 添加门店 */
export async function newPmsStore(params?: {
  name: string; //⻔店名称
  code: string; //⻔店编号
  address: string; //⼀级地址
  detailAddress: string; //⼆级详细地址
  type: number; //⻔店类型 1-⺠宿 2-其他
  bossName: string; //负责⼈姓名
  emailAccount: string; //负责⼈邮箱账号
}) {
  return request<API.Result>('/motel/store/newStore', {
    method: 'POST',
    data: { ...params },
  });
}

/** 选择门店进入系统 */
export async function bindPmsStoreToken(params?: { id?: number }) {
  return request<API.Result>('/motel/store/getPmsStore', {
    method: 'GET',
    params,
  });
}
