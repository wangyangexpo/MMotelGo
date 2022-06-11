import { history } from 'umi';
import envConfig from '@/utils/env';
import Cookie from 'js-cookie';
import { isLoginPath } from '@/utils';

const { APP_BASE_URL } = envConfig;

export const notLoginResponseInterceptor = (response: Response) => {
  response
    .clone()
    .json()
    .then((result) => {
      // 用户未登录
      if (result.errorCode === '9999') {
        if (isLoginPath()) {
          return;
        }
        history.push(
          `/user/login?redirectTo=${encodeURIComponent(window.location.href)}`,
        );
      }
    });
  return response;
};

export const commonRequestInterceptor = (
  url: string,
  options: Record<string, any>,
) => {
  if (url.indexOf('/api') > -1) {
    /**
     * 如果是/api开头（约定），走本地mock/api.ts；
     * 不修改options配置，否则会影响proxy；
     */
    return {};
  }
  return {
    url: `${APP_BASE_URL}${url}`,
    options: {
      ...options,
      headers: {
        ...(options?.headers || null),
        'x-auth': String(Cookie.get('token')),
      },
    },
  };
};
