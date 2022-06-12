/** 系统配置 */
declare namespace SYSTEM {
  type InitialState =
    | {
        token?: string;
        storeList?: StoreListInfo[];
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

  interface StoreListInfo {
    storeId: number;
    storeName: string;
    expirationTime: string;
  }

  interface ShopDetail {
    id: Key;
    name: string; //⻔店名称
    code: string; //⻔店编号
    address: string; //⼀级地址
    detailAddress: string; //⼆级详细地址
    type: number; //⻔店类型 1-⺠宿 2-其他
    bossName: string; //负责⼈姓名
    bossPhoneNo: string; //负责⼈手机号
    bossEmail: string; //负责⼈邮箱账号
    activationCode?: string; // 激活码
    createTime?: string;
  }
}
