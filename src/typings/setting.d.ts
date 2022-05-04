/** 配置 */
declare namespace SETTING {
  interface RoomType {
    id?: number;
    roomTypeName?: string;
    roomTypeShortName?: string;
    defaultPriceType?: 1 | 2; // 1-不区分；2-区分
    defaultPrice?: number;
    weekDayPrice?: number;
    weekEndPrice?: number;
    roomCount?: number;
    roomCodeList?: string[];
  }

  interface HourRoom {
    id?: number;
    roomTypeId?: number;
    roomTypeName?: string;
    lengthOfStay?: number;
    price?: number;
  }

  interface RoomGroup {
    id?: number;
    groupType?: number; // 1-未分组，2-已分组
    groupName?: string;
    rooms?: string[];
  }

  interface RoomSort {
    id?: number;
    name?: string;
    sort?: number;
  }

  interface RoomPriceListData {
    id?: number;
    roomTypeId?: number;
    roomTypeName?: string;
    dateList?: {
      date?: string;
      price?: number;
      defaultPrice?: number;
      remainCount?: number;
    }[];
  }

  interface CalendarData {
    date?: string;
    festivalTypeList?: number[];
    type?: number;
  }
}
