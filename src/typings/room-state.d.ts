/** 配置 */
declare namespace ROOM_STATE {
  interface CalendarData {
    date: string;
    type?: number;
  }

  interface Room {
    roomId?: string;
    roomNumber?: string;
    roomStatus?: 0 | 1;
  }

  interface RoomType {
    id?: number;
    roomTypeName?: string;
    roomTypeShortName?: string;
    defaultPriceType?: 1 | 2; // 1-不区分；2-区分
    defaultPrice?: number;
    weekDayPrice?: number;
    weekEndPrice?: number;
    roomCount?: number;
    roomList?: Room[];
  }

  interface StateTableData extends Room {
    id?: React.Key;
    roomTypeId?: number;
    roomTypeName?: string;
    rowSpan?: number;
    colSpan?: number;
    dateList?: {
      date?: string;
      price?: number;
      defaultPrice?: number;
      remainCount?: number;
    }[];
  }

  interface SelectTableData {
    date?: string;
    roomId?: string;
    roomNumber?: string;
  }
}
