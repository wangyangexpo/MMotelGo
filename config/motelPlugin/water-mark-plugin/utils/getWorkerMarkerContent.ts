import { WaterMarkOpts } from '../index';

export default (props: { options?: WaterMarkOpts }) => {
  const { options } = props;
  if (!options) {
    return `\
export default function getWaterMark() {}
`;
  }
  return `\
import _WaterMark from '@alife/waterMark';

interface WaterMarkParamsType {
  userName?: string;
  userCode?: string;
  nickName?: string;
  base64?: string;
}

const waterMark = new _WaterMark({
  a: {
    show: true,
    width: ${options?.width || 250},
    height: ${options?.height || 250},
    font: '${
      options?.fontSize || 14
    }px PingFangSC-Light,Microsoft YaHei,Helvetica Neue,Helvetica,Roboto,Tahoma,Arial',
  },
  s: {
    disable: false,
    rightMenu: false,
    f12: false,
    hotKey: false,
    copy: false,
    cut: false,
    selectStart: false,
  },
});

export default async function getWaterMark(params: WaterMarkParamsType) {
  const { userName, userCode, nickName, base64 } = params || {};
  if (base64) {
    waterMark.b(base64);
  } else if (userName && userCode) {
    waterMark.a(
      nickName
        ? userName + '(' + nickName + ')' + userCode
        : userName + userCode,
    );
  }
}
  `;
};
