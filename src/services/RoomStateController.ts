import { request } from 'umi';

/** 查询房态日历 */
export async function getRoomStateStock(params?: {
  startTime?: string; //房态看板起始时间
  endTime?: string; //房态看板结束时间
  list?: number[]; //房型房间
}) {
  return request<API.Result_RoomState_StockList_>(
    '/motel/roomState/calendar/allStateRoomStock',
    {
      method: 'POST',
      data: params,
    },
  );
}

/** 查询房型房间列表 */
export async function getAllRoomType(params: {
  startTime?: string; //房态看板起始时间
  endTime?: string; //房态看板结束时间
  list?: number[]; //房型房间
}) {
  return request<API.Result_RoomState_RoomTypeList_>(
    '/motel/roomState/calendar/allState',
    {
      method: 'POST',
      data: params,
    },
  );
}

/** 查询房间订单 */
export async function getAllRoomOrder(params: { date: string; days: number }) {
  return request<API.Result_RoomState_OrderList_>(
    '/api/config/roomState/allStateRoomOrder',
    {
      method: 'GET',
      params,
    },
  );
}

/** 查询房情表 */
export async function getRoomSituation(params: {
  startTime?: string;
  current?: number;
  pageSize?: number;
}) {
  return request<API.Result_RoomState_RoomConditionList_>(
    '/motel/roomState/condition/allCondition',
    {
      method: 'GET',
      params: {
        ...params,
        pageNum: params.current,
      },
    },
  );
}

/** 查询今日概览 */
export async function getTodayOverview(params: {
  status?: string; // 1-今日预抵；2-今日预离；3-当前在住；4-未排房
  current?: number;
  pageSize?: number;
}) {
  return request<API.Result_RoomState_RoomOverviewList_>(
    '/motel/roomState/currentOverview/allState',
    {
      method: 'GET',
      params: {
        ...params,
        pageNum: params.current,
      },
    },
  );
}

/** 查询房态操作日志 */
export async function getRoomStateChangeLog(params: {
  status?: number;
  current?: number;
  pageSize?: number;
  roomCode?: string; //房间号
  startTime?: string; //房态操作开始时间
  endTime?: string; //房态操作结束时间
}) {
  return request<API.Result_RoomState_ChangeLogList_>(
    '/motel/roomState/log/allLog',
    {
      method: 'POST',
      data: {
        ...params,
        pageNum: params.current,
      },
    },
  );
}
