/** 系统配置 */
declare namespace SYSTEM {
  type InitialState =
    | {
        token?: string;
        storeList?: StoreInfo[];
      }
    | undefined;

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

  interface StoreInfo {
    storeId: number;
    storeName: string;
    expirationTime: string;
  }
}
