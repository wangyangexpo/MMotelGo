import { request } from 'umi';

/** 获取门店列表 */
export async function getPmsAccountList(params: {
  searchParam?: string;
  current?: number;
  pageSize?: number;
  status?: 0 | 1;
}) {
  return request<API.Result_PmsAccountList_>(
    '/motel/account/selectAccountList',
    {
      method: 'POST',
      data: {
        pageNum: params?.current,
        ...params,
      },
    },
  );
}

/** 添加账号 */
export async function addPmsAccount(
  params: {
    accountId?: string;
    nickName?: string;
    emailAddress?: string;
    menuAuthorityList?: number[];
    overAllAuthorityList?: number[];
  },
  action?: 'add' | 'update',
) {
  if (action === 'update') {
    return request<API.Result>('/motel/account/updateAccount', {
      method: 'POST',
      data: params,
    });
  }
  return request<API.Result>('/motel/account/addAccount', {
    method: 'POST',
    data: params,
  });
}

/** 启用 / 禁用账号 */
export async function setPmsAccountStatus(params: {
  accountId?: number;
  status?: 0 | 1;
}) {
  return request<API.Result>('/motel/account/updateAccountStatus', {
    method: 'POST',
    data: params,
  });
}

/** 删除账号 */
export async function deletePmsAccount(params: { accountId?: number }) {
  return request<API.Result>('/motel/account/deleteAccount', {
    method: 'POST',
    data: params,
  });
}

/** 查询当前登录账号可配置的权限列表 */
export async function getAccountAuthorityList() {
  return request<API.Result_PmsAccountAuthorityList_>(
    '/motel/account/getAccountAuthorityList',
    {
      method: 'GET',
    },
  );
}

/** 查询当前登录账号权限详情 */
export async function getAccountDetail(params: { accountId: string }) {
  return request<API.Result_PmsAccountDetail_>(
    '/motel/account/getAccountDetail',
    {
      method: 'GET',
      params,
    },
  );
}
