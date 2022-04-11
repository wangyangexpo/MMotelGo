// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';
import { join } from 'path';
import { readFileSync } from 'fs';
import { PLUGIN_NAME } from './utils/constant';
import getWorkHappyProvider from './utils/getWorkHappyProvider';

import registerLoadingPlugin from './loading-plugin';
import registerWaterMarkPlugin from './water-mark-plugin';

export default (api: IApi) => {
  const { paths, utils } = api;

  // 定义 motelgo 配置参数
  api.describe({
    key: 'motelgo',
    config: {
      schema(joi) {
        return joi.object({
          // loading配置
          loading: joi.object({
            imgSrc: joi.string(),
          }),
          // waterMark配置
          waterMark: joi.object({
            width: joi.number(),
            height: joi.number(),
            fontSize: joi.number(),
          }),
        });
      },
    },
  });

  // 注册 loading 插件
  registerLoadingPlugin(api);
  // 注册 waterMark 插件
  registerWaterMarkPlugin(api);

  if (api.hasPlugins(['@umijs/plugin-initial-state', '@umijs/plugin-model'])) {
    // 生成workHappy运行时文件
    api.onGenerateFiles(() => {
      api.writeTmpFile({
        path: join(PLUGIN_NAME, 'Provider.ts'),
        content: getWorkHappyProvider(),
      });
      api.writeTmpFile({
        path: join(PLUGIN_NAME, 'runtime.ts'),
        content: readFileSync(join(__dirname, 'utils/runtime.ts.tpl'), 'utf-8'),
      });
      api.writeTmpFile({
        path: join(PLUGIN_NAME, 'exports.ts'),
        content: readFileSync(join(__dirname, 'utils/exports.ts.tpl'), 'utf-8'),
      });
    });

    // 类型导出
    api.addUmiExports(() => [
      {
        exportAll: true,
        source: utils.winPath(`../${PLUGIN_NAME}/exports`),
      },
    ]);

    // 注册运行时
    api.addRuntimePlugin({
      fn: () =>
        utils.winPath(join(paths.absTmpPath!, PLUGIN_NAME, 'runtime.ts')),
      before: ['@umijs/plugin-model', '@umijs/plugin-initial-state'],
    });

    api.addRuntimePluginKey(() => 'workHappy');
  }
};
