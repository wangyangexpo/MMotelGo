/** 配置 */
declare namespace ROOM_STATE {
  interface StateTableData {
    id?: React.Key;
    roomTypeId?: number;
    roomTypeName?: string;
    roomCode?: string;
    rowSpan?: number;
    colSpan?: number;
    dateList?: {
      date?: string;
      price?: number;
      defaultPrice?: number;
      remainCount?: number;
    }[];
  }
}
