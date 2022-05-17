import { request } from 'umi';

/** 查询房态日历 */
export async function getRoomStateCalendar(params?: { startDate?: number }) {
  return request<API.Result_RoomState_CalendarList_>(
    '/config/roomState/getStateRoomCalendar',
    {
      method: 'GET',
      params,
    },
  );
}

/** 查询房型房间列表 */
export async function getAllRoomType() {
  return request<API.Result_RoomState_RoomTypeList_>(
    '/config/roomState/allStateRoom',
    {
      method: 'GET',
    },
  );
}

/** 查询房间订单 */
export async function getAllRoomOrder(params: { date: string; days: number }) {
  return request<API.Result_RoomState_OrderList_>(
    '/config/roomState/allStateRoomOrder',
    {
      method: 'GET',
      params,
    },
  );
}
