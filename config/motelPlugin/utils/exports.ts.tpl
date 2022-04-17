import { Models } from '../plugin-model/useModel';

export type WorkHappyConfig = (
  initData: Models<'@@initialState'>,
) => {
  userName?: string;
  userCode?: string;
  nickName?: string;
  base64?: string;
  env?: 'prod' | 'test';
} | void;
