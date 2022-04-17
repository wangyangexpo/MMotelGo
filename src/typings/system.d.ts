/** 系统配置 */
declare namespace SYSTEM {
  interface InitialState extends UserInfo {
    base64?: string; // 后端水印base64
  }

  interface UserInfo {
    id?: string;
    name?: string;
    nickName?: string;
    code?: string;
    aliCode?: string;
    adminId?: string;
    gender?: '0' | '1';
    channelList?: string[];
    capacityLineId?: number;
    currentChannel?: string;
    corpId?: string;
    isSuper?: '0' | '1';
  }
}
