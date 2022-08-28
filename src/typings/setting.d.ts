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
    roomList?: {
      id: number;
      code: string;
    }[];
  }

  interface HourRoom {
    id?: number;
    roomTypeId?: number;
    roomTypeName?: string;
    lengthOfStay?: number;
    price?: number;
  }

  interface RoomGroup {
    groupId?: number;
    groupType?: number; // 1-未分组，2-已分组
    groupName?: string;
    rooms?: {
      id: number;
      roomCode?: string;
    }[];
  }

  interface RoomSort {
    id: number;
    name?: string;
    sort?: number;
  }

  interface RoomPriceListData {
    id?: React.Key;
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

  interface PriceLog {
    id?: React.Key;
    roomTypeId?: number;
    roomTypeName?: string;
    startTime?: string;
    endTime?: string;
    statue?: 0 | 1;
    priceType?: number;
    operator?: string;
    beforePrice?: string;
    afterPrice?: string;
    createTime?: string;
  }

  interface MakeNote {
    id?: number;
    name?: string;
    sort?: number;
    type?: 0 | 1;
    storeId?: number;
  }

  interface ConsumerItem extends BasicExtraProps {
    id?: number;
    name?: string;
    storeId?: number;
    classifyName?: string;
    price?: number;
    status?: 0 | 1;
  }
}
