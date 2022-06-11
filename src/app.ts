// 运行时配置
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import rightContentRender from '@/components/Layout/RightContentRender';
import {
  commonRequestInterceptor,
  notLoginResponseInterceptor,
} from '@/utils/plugins';
import services from '@/services';
import Cookie from 'js-cookie';
import { history } from 'umi';
import { isLoginPath } from '@/utils';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
export async function getInitialState(): Promise<SYSTEM.InitialState> {
  if (!isLoginPath()) {
    const autoLogin = Cookie.get('autoLogin');
    const token = sessionStorage.getItem('token');
    if (token || autoLogin) {
      const { data } = await services.AppController.autoLogin();
      sessionStorage.setItem('token', data?.token);
      await services.UserController.bindPmsStoreToken();
      return data;
    } else {
      history.replace('/user/login');
    }
  }
}

export const request: RequestConfig = {
  // credentials: 'include',
  requestInterceptors: [commonRequestInterceptor],
  responseInterceptors: [notLoginResponseInterceptor],
};

/**
 * layout 的 runtime 配置
 * @description 这里支持导入文件和 ProLayout 的几乎所有配置
 */
export const layout: RunTimeLayoutConfig = ({}) => {
  return {
    // 登录账号信息，包括所选管理员渠道
    rightContentRender,
  };
};
