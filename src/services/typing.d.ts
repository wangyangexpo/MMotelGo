/* 发送异步请求，返回结果的类型 */
declare namespace API {
  interface Result<T = null> {
    success: boolean;
    errorCode: number;
    errorMessage: string;
    data: T;
  }

  interface Result_List_<T = null> {
    success: boolean;
    errorCode: number;
    errorMessage: string;
    data: {
      list?: T[];
      pageNum?: number;
      pageSize?: number;
      totalCount?: number;
    };
  }

  // 全局-菜单，枚举，用户信息
  type Result_String_ = Result<string>;
  type Result_Number_ = Result<number>;
  type Result_String_Array_ = Result<string[]>;
  type Result_Number_Array_ = Result<number[]>;

  type Result_Setting_RoomTypeDetail_ = Result<SETTING.RoomType>;
  type Result_Setting_RoomTypeList_ = Result_List_<SETTING.RoomType>;
  type Result_Setting_HourRoomDetail_ = Result<SETTING.HourRoom>;
  type Result_Setting_HourRoomList_ = Result_List_<SETTING.HourRoom>;
  type Result_Setting_RoomGroupList_ = Result_List_<SETTING.RoomGroup>;
  type Result_Setting_IntervalNight_ = Result<{
    intervalNight: number;
  }>;

  type Result_Setting_RoomSortList_ = Result_List_<SETTING.RoomSort>;
  type Result_Setting_RoomPriceList_ = Result_List_<SETTING.RoomPriceListData>;
  type Result_Setting_PriceCalendarList_ = Result_List_<SETTING.CalendarData>;
  type Result_Setting_PriceLogList_ = Result_List_<SETTING.PriceLog>;

  type Result_RoomState_OrderList_ = Result_List_<ORDER.OrderData>;
  type Result_RoomState_RoomTypeList_ = Result_List_<ROOM_STATE.RoomType>;
  type Result_RoomState_CalendarList_ = Result_List_<ROOM_STATE.CalendarData>;

  // 用户注册，登录，修改密码相关
  type Result_LoginInfo_ = Result<{
    token: string;
    storeList?: SYSTEM.StoreListInfo[];
  }>;
  type Result_PmsStoreList_ = Result_List_<SYSTEM.StoreListInfo>;
  type Result_PmsShopDetail_ = Result<SYSTEM.ShopDetail>;
}
