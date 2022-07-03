/** 配置 */
declare namespace ROOM_STATE {
  interface CalendarData {
    date: string;
    type?: number;
  }

  interface Room {
    roomId?: string;
    roomCode?: string;
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
    roomCode?: string;
  }

  interface RoomCondition {
    roomTypeId: number; //房型id
    roomTypeName: string; //房型名称
    roomCount: number; //房间总数量
    canSaleCount: number; //房间可售数量
    occupyCount: number; //房间占⽤数量
    disableCount: number; //房间不可售数量
  }

  interface RoomOverview {
    orderId: number; //订单id
    reserveName: string; //预定⼈姓名
    emailAccount: string; //预定⼈邮箱账号
    channelName: string; //订单来源渠道
    type: 1 | 2; //房间类型 1-全⽇房 2-钟点房
    roomTypeName: string; //房型名称 如亲⼦房 商务房
    roomCode: string; //房间号
    startTime: string; //⼊住开始时间
    endTime: string; //⼊住结束时间
    roomPrice: number; //⼊住房价
  }

  interface StateChangeLog {
    id: number; //⽇志id
    roomTypeName: string; //房型名称 如亲⼦房 商务房
    roomCode: string; //房间号
    operationType: number; //操作类型1-保留 2-维修 3-停⽤ 4-脏房 5-净房 6-关房
    operationDesc: string; //操作类型1-保留 2-维修 3-停⽤ 4-脏房 5-净房 6-关房
    startTime: string; //操作开始时间
    endTime: string; //操作结束时间
    remark: string; //备注
    operator: string; //操作⼈姓名
    createTime: string; //⽇志创建时间
  }
}
