import envConfig from '@/utils/env';

const { APP_BASE_URL } = envConfig;

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
      },
    },
  };
};
