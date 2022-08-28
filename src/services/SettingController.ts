import { request } from 'umi';
import Cookie from 'js-cookie';

/** 新增修改房型房间 */
export async function addRoomType(
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
export async function addHourRoom(
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
    method: 'POST',
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
export async function updateRoomSort(params?: {
  type?: number;
  list?: SETTING.RoomSort[];
}) {
  return request<API.Result>('/motel/config/sort/updateSortByType', {
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
      method: 'POST',
      data: params,
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

/** 查询门店信息 */
export async function getShopDetail(params?: { emailAccount?: string }) {
  return request<API.Result_PmsShopDetail_>(
    '/motel/config/store/queryStoreByEmail',
    {
      method: 'GET',
      params,
    },
  );
}

/** 修改门店信息 */
export async function setShopDetail(params?: {
  id: Key;
  name?: string;
  address?: string;
  detailAddress?: string;
}) {
  return request<API.Result>('/motel/config/store/updateStore', {
    method: 'PUT',
    data: params,
  });
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
      method: 'POST',
      data: {
        ...params,
        pageNum: params?.current,
      },
    },
  );
}

/** 记一笔列表 */
export async function getMakeNoteList() {
  return request<API.Result_Setting_MakeNoteList_>(
    '/motel/config/makeNote/list',
    {
      method: 'POST',
      data: {
        storeId: Cookie.get('storeId'),
      },
    },
  );
}

/** 记一笔新增 */
export async function addMakeNote(params?: { name: string; type: 0 | 1 }) {
  return request<API.Result>('/motel/config/makeNote/save', {
    method: 'POST',
    data: {
      ...params,
      storeId: Cookie.get('storeId'),
    },
  });
}

/** 记一笔更新 */
export async function updateMakeNote(params?: { id?: number; name: string }) {
  return request<API.Result>('/motel/config/makeNote/update', {
    method: 'POST',
    data: params,
  });
}

/** 记一笔删除 */
export async function deleteMakeNote(params?: { id?: number }) {
  return request<API.Result>('/motel/config/makeNote/delete', {
    method: 'POST',
    data: params,
  });
}

/** 记一笔排序 */
export async function sortMakeNote(params?: { idList?: number[] }) {
  return request<API.Result>('/motel/config/makeNote/sort', {
    method: 'POST',
    data: params,
  });
}

/** 消费项列表 */
export async function getConsumerItemList(params?: {
  storeId?: number;
  current?: number;
  pageSize?: number;
}) {
  return request<API.Result_Setting_ConsumerItemList_>(
    '/motel/config/consumptionItem/list',
    {
      method: 'POST',
      data: {
        ...params,
        pageNum: params?.current,
        storeId: Cookie.get('storeId'),
      },
    },
  );
}

/** 消费项新增 | 修改 */
export async function addConsumerItem(
  params?: {
    id?: number;
    name: string;
    classiftyName: string;
    price: number;
  },
  action?: 'add' | 'update',
) {
  if (action === 'add') {
    return request<API.Result>('/motel/config/consumptionItem/save', {
      method: 'POST',
      data: {
        ...params,
        storeId: Cookie.get('storeId'),
      },
    });
  }
  return request<API.Result>('/motel/config/consumptionItem/update', {
    method: 'POST',
    data: params,
  });
}

/** 消费项删除 */
export async function deleteConsumerItem(params?: { id?: number }) {
  return request<API.Result>('/motel/config/consumptionItem/delete', {
    method: 'POST',
    data: params,
  });
}

/** 启用 / 禁用消费项 */
export async function setConsumerItemStatus(params: {
  id?: number;
  status?: 0 | 1;
}) {
  return request<API.Result>('/motel/config/consumptionItem/updateStatus', {
    method: 'POST',
    data: params,
  });
}
