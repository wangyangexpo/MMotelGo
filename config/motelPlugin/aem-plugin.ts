/**
 * aem监控插件
 */
import { join } from 'path';
import { IApi } from '@umijs/types';
import { PLUGIN_NAME } from './utils/constant';

interface AemOpts {
  pid?: string;
  userType?: string;
  requiredFields?: string[];
}

export default (api: IApi) => {
  const { paths, userConfig } = api;
  const opts: AemOpts = userConfig?.iic?.aem;
  if (opts?.pid) {
    api.addHTMLHeadScripts(() => {
      return [
        {
          content: `window.addEventListener("error",e=>{if(!(e instanceof ErrorEvent)){let r=e.target,t=r.src||r.href;if(!t)return;window.AES_QUEUE||(AES_QUEUE=[]),AES_QUEUE.push({action:"log",arguments:["resource_error",{p1:t.substring(0,1e3),p2:r.tagName.toLowerCase(),ts:(new Date).getTime()}]})}},!0);`,
        },
      ];
    });
    api.addHTMLScripts(() => {
      return [
        {
          src: '//g.alicdn.com/alilog/mlog/aplus_v2.js',
          id: 'beacon-aplus',
        },
        {
          content: `
            window.AES_CONFIG = window.AES_CONFIG || {};
            window.AES_CONFIG.pid = ${JSON.stringify(opts?.pid || '')};
            window.AES_CONFIG.user_type = ${JSON.stringify(
              opts?.userType || '14',
            )};
            window.AES_CONFIG.requiredFields = ${JSON.stringify(
              opts.requiredFields || ['pid', 'user_type', 'uid', 'username'],
            )};
            // 配置必须在aem-sdk加载之前，否则无效。
            window.AES_CONFIG.plugin_jserror = {
              disable_unhandled_rejection: true,
            };
            window.AES_CONFIG.plugin_api = {
              parseResponse: function (response, status) {
                if (status === 200) {
                  if (response.hasOwnProperty('success')) {
                    // 新接口规范返回格式
                    return {
                      success: response.success,
                      code: response.errorCode,
                      msg: response.errorMessage,
                    };
                  } else if (response.hasOwnProperty('code')) {
                    // 只有response带code属性的接口才上报（后端服务接口）
                    return {
                      success: response.code === 0 || response.code === 200,
                      code: response.code,
                      msg: response.message,
                    };
                  } else {
                    // 没有code参数，说明不是后端接口，排除干扰项
                    return {
                      success: true,
                    };
                  }
                }
                if (status <= 0) {
                  // 表示断网情况下的异常
                  return {
                    success: true,
                  };
                }
                return {
                  success: false,
                };
              },
            };
          `,
        },
        {
          src: '//g.alicdn.com/aes/??tracker/1.0.34/index.js,tracker-plugin-jserror/1.0.13/index.js,tracker-plugin-api/1.1.12/index.js,tracker-plugin-perf/1.1.6/index.js,tracker-plugin-longtask/1.0.1/index.js,tracker-plugin-tsl/1.0.1/index.js,tracker-plugin-pv/2.4.2/index.js,tracker-plugin-event/1.2.5/index.js,tracker-plugin-autolog/1.0.19/index.js',
        },
      ];
    });
  }

  // 生成临时文件
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(PLUGIN_NAME, 'aem/aemConfig.ts'),
      content: `\
import { AES } from '../exports';

interface AemConfig {
  userName?: string;
  userCode?: string;
  [k: string]: any;
}

export default function setAemConfig(params: AemConfig) {
  const { userName, userCode, ...restProps } = params || {};
  AES?.setConfig({
    uid: userCode,
    username: userName,
    ...restProps,
  });
}
      `,
    });
  });
};
