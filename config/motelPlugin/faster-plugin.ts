/**
 * faster平台发布生成index.html.ftpl的插件
 */
import fs from 'fs';
import { join } from 'path';
import { IApi } from '@umijs/types';

interface FasterOpts {
  cdn?: boolean;
  envParams?: { key: string; origin?: string }[];
}

export default (api: IApi) => {
  const { env, paths, userConfig } = api;
  const opts: FasterOpts = userConfig?.iic?.faster;

  if (opts) {
    api.onBuildComplete(() => {
      fs.copyFile(
        join(paths?.absOutputPath!, 'index.html'),
        join(paths?.absOutputPath!, 'index.html.ftpl'),
        (err) => {
          if (err) {
            throw err;
          }
        },
      );
      fs.rename(
        join(paths?.absOutputPath!, 'index.html'),
        join(paths?.absOutputPath!, '200.html.ftpl'),
        (err) => {
          if (err) {
            throw err;
          }
        },
      );
    });
  }
  if (opts?.cdn) {
    api.modifyConfig((config) => {
      if (env === 'production') {
        config.publicPath = '/__FAAS_CDN__/';
      }
      return config;
    });
  }
  if (opts?.envParams) {
    const configObj = {};
    opts?.envParams?.forEach?.((param) => {
      const { key, origin } = param;
      configObj[key] = env === 'production' ? `{{_ .${key} }}` : origin;
    });
    api.addHTMLScripts(() => {
      return [{ content: `window.CONFIG = ${JSON.stringify(configObj)}` }];
    });
  }
};
