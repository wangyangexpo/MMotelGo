interface EnvConfig {
  ENV?: 'prod' | 'test';
  APP_BASE_URL?: string;
}

function getConfigByEnv(env = 'local'): EnvConfig {
  switch (env) {
    case 'local':
    case 'dev':
    case 'test':
      return {
        ENV: 'test',
        APP_BASE_URL: 'http://dev.lamshan.com',
      };
    case 'ppe':
      return {
        ENV: 'prod',
        APP_BASE_URL: 'http://47.110.159.83:38885',
      };
    case 'production':
      return {
        ENV: 'prod',
        APP_BASE_URL: 'http://47.110.159.83:38885',
      };
    default:
      return {};
  }
}

export default getConfigByEnv();
