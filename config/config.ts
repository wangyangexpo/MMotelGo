import { defineConfig } from 'umi';
import routes from './routes';

const NODE_ENV = process.env.NODE_ENV;

export default defineConfig({
  dynamicImport: {
    loading: '@/components/Loading',
  },
  dva: false,
  publicPath: NODE_ENV === 'production' ? '/MMotelGo/' : '/',
  theme: {
    // '@primary-color': '#FF6F00',
  },
  // 最佳实践中内置了 Layout，你也可以配置为 false 关闭它
  layout: {
    name: 'PieTable',
    // logo: 'https://img.alicdn.com/imgextra/i3/O1CN01u0CsC61b0A6wBavkQ_!!6000000003402-2-tps-360-362.png',
    navTheme: 'light',
    layout: 'top',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    breadcrumbRender: false,
    title: 'PieTable',
    locale: true,
    pwa: false,
  },
  // favicon:
  //   'https://img.alicdn.com/imgextra/i2/O1CN01i1hPpT1aLrG439inm_!!6000000003314-2-tps-36-36.png',
  routes,
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
    baseNavigator: false,
  },
  nodeModulesTransform: { type: 'none' },
  history: { type: 'hash' },
  // 接口代理配置
  proxy: {
    '/api': {
      target: 'http://127.0.0.1',
    },
  },
  // 提速方案配置
  mfsu: {},
  fastRefresh: {},
  // 优化 moment 包大小
  // ignoreMomentLocale: true,
});
