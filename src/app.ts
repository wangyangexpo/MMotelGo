// 运行时配置
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import rightContentRender from '@/components/Layout/RightContentRender';
import services from '@/services';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
export async function getInitialState(): Promise<SYSTEM.InitialState> {
  const data = await services.AppController.login();
  return {
    ...data,
    base64: '',
  };
}

export const request: RequestConfig = {
  credentials: 'include',
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
