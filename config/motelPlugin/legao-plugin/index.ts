import { join } from 'path';
import childProcess from 'child_process';
import { IApi } from '@umijs/types';
import { readFileSync } from 'fs';
import getLegaoCompProvider from './utils/getLegaoCompProvider';
import exportLegaoContent from './utils/exportLegaoContent';
import {
  RELATIVE_MODEL_PROVIDER_PATH,
  DIR_NAME,
  RELATIVE_MODEL_EXPORT_PATH,
} from './constants';

export interface LegaoOpts {
  resourceConfig: {
    configList: {
      appKey: string;
      version: string;
      env?: string;
    }[];
    enableRichText: boolean;
    enableChart: boolean;
  };
  reactVersion?: string;
  youshuUrlPrefix?: string;
}

export default (api: IApi) => {
  const { userConfig, paths, utils } = api;
  const opts: LegaoOpts = userConfig?.iic?.legao;
  if (!opts) {
    return;
  }
  const { reactVersion = '16.14.0', youshuUrlPrefix = '' } = opts;
  api.addHTMLHeadScripts(() => {
    // 拆分一下，添加crossOrigin，增加报错兜底能力，alicdn都支持crossOrigin
    return [
      {
        content: `
          window.__youshuGateWayUrlPrefix__ = ${JSON.stringify(youshuUrlPrefix)}
        `,
      },
      {
        src: `//g.alicdn.com/code/lib/react/${reactVersion}/umd/react.production.min.js`,
        id: '__react__',
        crossOrigin: 'anonymous',
      },
      {
        src: `//g.alicdn.com/code/lib/react-dom/${reactVersion}/umd/react-dom.production.min.js`,
        id: '__react-dom__',
        crossOrigin: 'anonymous',
      },
      {
        src: `//g.alicdn.com/??platform/c/react15-polyfill/0.0.1/dist/index.js,platform/c/lie/3.0.2/dist/lie.polyfill.min.js`,
        id: '__react-polyfill__',
      },
      {
        src: 'https://gw.alipayobjects.com/os/lib/moment.js/2.22.2/moment.min.js',
        id: '__moment__',
      },
    ];
  });
  api.chainWebpack((config) => {
    const externals = config.get('externals') || {};
    // 统一使用window上的React和ReactDOM及moment，如果要使用乐高，这块必须这样玩，不然有数和iic组件的渲染会出问题
    const newExternals = {
      ...externals,
      moment: 'window.moment',
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
      '@alipay/bigfish/react': 'window.React',
      '@alipay/bigfish/react-dom': 'window.ReactDOM',
    };
    config.externals(newExternals);
    return config;
  });

  const { resourceConfig } = opts || {};

  function hasLegaoCompDependency() {
    const { dependencies, devDependencies } = api.pkg;
    return (
      dependencies?.['@ali/alsc-legao-componentV2'] ||
      devDependencies?.['@ali/alsc-legao-componentV2']
    );
  }
  // 安装依赖@ali/alsc-legao-componentV2
  if (!hasLegaoCompDependency()) {
    childProcess.execSync(
      `cd ${paths.cwd} && tnpm i @ali/alsc-legao-componentV2 -S`,
      {
        stdio: [0, 1, 2],
      },
    );
  }
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: RELATIVE_MODEL_PROVIDER_PATH,
      content: getLegaoCompProvider(JSON.stringify(resourceConfig || {})),
    });
    api.writeTmpFile({
      path: RELATIVE_MODEL_EXPORT_PATH,
      content: exportLegaoContent(),
    });
    api.writeTmpFile({
      path: join(DIR_NAME, 'runtime.tsx'),
      content: readFileSync(join(__dirname, 'runtime.tsx.tpl'), 'utf-8'),
    });
  });
  api.addRuntimePlugin({
    fn: () => utils.winPath(join(paths.absTmpPath!, DIR_NAME, 'runtime.tsx')),
    before: ['@umijs/plugin-model', '@umijs/plugin-initial-state'],
  });
  api.addUmiExports(() => [
    {
      exportAll: true,
      source: utils.winPath(`../${DIR_NAME}/legaoCompExport`),
    },
  ]);
};
