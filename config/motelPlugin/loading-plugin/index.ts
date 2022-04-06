/**
 * bigfish自动生成白屏loading
 */
import { IApi } from '@umijs/types';
import rewriteInitialState from './utils/rewriteInitialState';
import getGenLoadingContent from './utils/getGenLoadingContent';
import { RELATIVE_MODEL_PATH, DEFAULT_LOADING_GIF } from './contants';

interface LoadingOpts {
  imgSrc?: string;
}

export default (api: IApi) => {
  const { userConfig } = api;
  const opts: LoadingOpts = userConfig?.iic?.loading;
  const _loadingSrc = opts?.imgSrc || DEFAULT_LOADING_GIF;
  if (opts) {
    const loadContent = getGenLoadingContent(_loadingSrc);
    api.addRuntimePluginKey(() => 'getInitialStateWithLoading');
    api.addHTMLScripts(() => {
      return [
        {
          content: loadContent,
        },
      ];
    });
    api.onGenerateFiles(() => {
      api.writeTmpFile({
        path: RELATIVE_MODEL_PATH,
        content: rewriteInitialState(loadContent),
      });
    });
  }
};
