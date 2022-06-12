// 运行时配置
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import rightContentRender from '@/components/Layout/RightContentRender';
import {
  commonRequestInterceptor,
  notLoginResponseInterceptor,
} from '@/utils/plugins';

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
