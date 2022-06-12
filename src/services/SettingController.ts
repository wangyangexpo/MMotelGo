import { request } from 'umi';

/** 新增修改房型房间 */
export async function AddRoomType(
  params?: SETTING.RoomType,
  action?: 'add' | 'update',
) {
  if (action === 'add') {
    return request<API.Result>('/motel/config/room/newTypeAndRoom', {
      method: 'POST',
      data: params,
    });
  }
  return request<API.Result>('/motel/config/room/updateTypeAndRoom', {
    method: 'PUT',
    data: params,
  });
}

/** 获取单个房型房间详情信息 */
export async function getRoomTypeDetail(params?: { id?: number }) {
  return request<API.Result_Setting_RoomTypeDetail_>(
    '/motel/config/room/queryTypeAndRoomById',
    {
      method: 'GET',
      params,
    },
  );
}

/** 查询房型房间列表 */
export async function getRoomTypeList(params?: {
  current?: number;
  pageSize?: number;
}) {
  return request<API.Result_Setting_RoomTypeList_>(
    '/motel/config/room/allTypeAndRoom',
    {
      method: 'POST',
      data: {
        ...params,
        pageNum: params?.current,
      },
    },
  );
}

/** 删除房型房间 */
export async function deleteRoomType(params?: { id?: number }) {
  return request<API.Result>('/motel/config/room/deleteTypeAndRoom', {
    method: 'POST',
    data: params,
  });
}

/** 新增修改钟点房 */
export async function AddHourRoom(
  params?: SETTING.HourRoom,
  action?: 'add' | 'update',
) {
  if (action === 'add') {
    return request<API.Result>('/motel/config/room/newHourRoom', {
      method: 'POST',
      data: params,
    });
  }
  return request<API.Result>('/motel/config/room/updateHourRoom', {
    method: 'PUT',
    data: params,
  });
}

/** 获取钟点房详情信息 */
export async function getHourRoomDetail(params?: { id?: number }) {
  return request<API.Result_Setting_HourRoomDetail_>(
    '/motel/config/room/queryHourRoomById',
    {
      method: 'GET',
      params,
    },
  );
}

/** 查询钟点房列表 */
export async function getHourRoomList(params?: {
  pageNum?: number;
  pageSize?: number;
}) {
  return request<API.Result_Setting_RoomTypeList_>(
    '/motel/config/room/allHourRoom',
    {
      method: 'GET',
      params,
    },
  );
}

/** 删除钟点房 */
export async function deleteHourRoom(params?: { id?: number }) {
  return request<API.Result>('/motel/config/room/deleteHourRoom', {
    method: 'POST',
    data: params,
  });
}

/** 获取钟点房间夜量 */
export async function getHourRoomIntervalNight() {
  return request<API.Result_Setting_IntervalNight_>(
    '/motel/config/room/getHourRoomIntervalNight',
    {
      method: 'GET',
    },
  );
}

/** 设置钟点房间夜量 */
export async function setHourRoomIntervalNight(params?: {
  intervalNight?: number;
}) {
  return request<API.Result>('/motel/config/room/hourRoomIntervalNight', {
    method: 'POST',
    data: params,
  });
}

/** 查询房间分组列表 */
export async function getRoomGroupList() {
  return request<API.Result_Setting_RoomGroupList_>(
    '/motel/config/group/allRoomGroup',
    {
      method: 'GET',
    },
  );
}

/** 编辑房间分组 */
export async function updateRoomGroup(params?: {
  groupList?: SETTING.RoomGroup[];
}) {
  return request<API.Result>('/motel/config/group/updateRoomGroup', {
    method: 'PUT',
    data: params,
  });
}

/** 查询房间排序 */
export async function getRoomSort(params?: {
  type?: number; // 1-房型，2-房间，3-分组
}) {
  return request<API.Result_Setting_RoomSortList_>(
    '/motel/config/sort/querySortByType',
    {
      method: 'GET',
      params,
    },
  );
}

/** 修改房间排序 */
export async function updateRoomSort(params?: { list?: SETTING.RoomSort[] }) {
  return request<API.Result>('/motel/config/group/updateSortByType', {
    method: 'PUT',
    data: params,
  });
}

/** 查询房价日历 */
export async function getRoomPriceCalendar(params?: { startDate?: number }) {
  return request<API.Result_Setting_PriceCalendarList_>(
    '/motel/config/price/getPriceCalendar',
    {
      method: 'GET',
      params,
    },
  );
}

/** 查询房价管理列表 */
export async function getRoomPriceList(params?: {
  roomTypeId?: number; // 0-所有房型
  priceType?: number; // 1-门市价，2-渠道价，3-假日价，4-临时价
  startTime?: string;
}) {
  return request<API.Result_Setting_RoomPriceList_>(
    '/motel/config/price/allRoomTypePrice',
    {
      method: 'GET',
      params,
    },
  );
}

/** 修改房价 */
export async function updateRoomPrice(params?: {
  roomTypeId?: number;
  priceType?: number;
  startTime?: string;
  endTime?: string;
  price?: number;
}) {
  return request<API.Result>('/motel/config/price/updateRoomTypePrice', {
    method: 'PUT',
    data: params,
  });
}

/** 查询房价管理列表 */
export async function getShopDetail(params?: { emailAccount?: string }) {
  return request<API.Result_PmsShopDetail_>(
    '/motel/config/store/queryStoreByEmail',
    {
      method: 'GET',
      params,
    },
  );
}

/** 查询房价管理列表 */
export async function getPriceChangeLog(params?: {
  current?: number;
  pageSize?: number;
  logStartTime?: string;
  logEndTime?: string;
  startTime?: string;
  endTime?: string;
  statue?: 0 | 1;
  priceType?: number;
  roomTypeId?: number;
  operator?: string;
}) {
  return request<API.Result_Setting_PriceLogList_>(
    '/motel/config/price/allPriceLog',
    {
      method: 'GET',
      params,
    },
  );
}
