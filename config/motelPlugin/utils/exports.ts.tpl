import { Models } from '../plugin-model/useModel';

export type WorkHappyConfig = (
  initData: Models<'@@initialState'>,
) => {
  userName?: string;
  userCode?: string;
  nickName?: string;
  base64?: string;
  env?: 'prod' | 'test';
  aemExtraProps?: {
    [k: string]: any;
  };
} | void;

interface AES {
  setConfig: (params: {
    pid?: string;
    uid?: string;
    username?: string;
    user_type?: string;
    page_id?: string;
    [k: string]: any;
  }) => void;
}

type AESPluginEvent = (
  logkey: string,
  params?: {
    ext?: string;
    c1?: any;
    c2?: any;
    c3?: any;
    c4?: any;
    c5?: any;
    c6?: any;
  },
) => void;

export const AES: AES = window.AES;

export const AESPluginEvent: AESPluginEvent = window.AESPluginEvent;
