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
export async function getInitialState() {
  if (!isLoginPath()) {
    const autoLogin = Cookie.get('autoLogin');
    const token = sessionStorage.getItem('token');
    if (token) {
      // 有token说明登录着
    } else if (autoLogin) {
      await services.UserController.accountLogin();
      await services.UserController.bindPmsStoreToken();
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
