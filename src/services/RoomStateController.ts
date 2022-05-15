import { request } from 'umi';

/** 查询房态日历 */
export async function getRoomStateCalendar(params?: { startDate?: number }) {
  return request<API.Result_Setting_PriceCalendarList_>(
    '/config/price/getPriceCalendar',
    {
      method: 'GET',
      params,
    },
  );
}

/** 查询房型房间列表 */
export async function getAllRoomType() {
  return request<API.Result_Setting_RoomTypeList_>(
    '/config/roomState/allStateRoom',
    {
      method: 'GET',
    },
  );
}
