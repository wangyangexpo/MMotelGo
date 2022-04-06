import { IApi } from 'umi';
import { join } from 'path';
import childProcess from 'child_process';
import getWorkerMarkerContent from './utils/getWorkerMarkerContent';
import { DIR_NAME, WATER_MARK_PKG_NAME } from './constants';

// 预留配置项
export interface WaterMarkOpts {
  width?: number;
  height?: number;
  fontSize?: number;
}

export default (api: IApi) => {
  const { paths, userConfig, pkg } = api;
  const opts: WaterMarkOpts = userConfig?.iic?.waterMark;

  function hasWaterMarkDependency() {
    const { dependencies, devDependencies } = pkg;
    return !!(
      dependencies?.[WATER_MARK_PKG_NAME] ||
      devDependencies?.[WATER_MARK_PKG_NAME]
    );
  }
  // 生成临时文件
  api.onGenerateFiles(() => {
    // 水印依赖安装，有配置项才安装
    const hasDependency = hasWaterMarkDependency();
    if (!hasDependency && opts) {
      childProcess.execSync(
        `cd ${paths.cwd} && tnpm i ${WATER_MARK_PKG_NAME} -S`,
        {
          stdio: [0, 1, 2],
        },
      );
    }
    api.writeTmpFile({
      path: join(DIR_NAME, 'waterMark.ts'),
      content: getWorkerMarkerContent({
        options: opts,
      }),
    });
  });
};
