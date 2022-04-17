export default () => {
  return `\
import { plugin, ApplyPluginsType } from 'umi';
import setWaterMarker from './water-mark/waterMark';
import setAemConfig from './aem/aemConfig';
import { useModel } from '../plugin-model/useModel';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  const { initialState } = useModel('@@initialState') || {};
  const workHappyConfig =
    plugin.applyPlugins({
      key: 'workHappy',
      type: ApplyPluginsType.modify,
      initialValue: { initialState },
    }) || {};
  const {
    userName,
    userCode,
    nickName,
    base64,
    env = 'prod',
  } = workHappyConfig;
  setWaterMarker({ userName, userCode, nickName, base64 });
  return props.children;
};
  `;
};
