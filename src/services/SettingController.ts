import { request } from 'umi';

/** 新增修改房型房间 */
export async function AddRoomType(
  params?: SETTING.RoomType,
  action: API.ACTION = API.ACTION.ADD,
) {
  if (action === API.ACTION.ADD) {
    return request<API.Result>('/config/room/newTypeAndRoom', {
      method: 'POST',
      data: params,
    });
  }
  return request<API.Result>('/config/room/updateTypeAndRoom', {
    method: 'PUT',
    data: params,
  });
}

/** 获取单个房型房间详情信息 */
export async function getRoomTypeDetail(params?: { id?: number }) {
  return request<API.Result_Setting_RoomTypeDetail_>(
    '/config/room/queryTypeAndRoomById',
    {
      method: 'GET',
      data: params,
    },
  );
}

/** 查询房型房间列表 */
export async function getRoomTypeList(params?: {
  pageNum?: number;
  pageSize?: number;
}) {
  return request<API.Result_Setting_RoomTypeList_>(
    '/config/room/allTypeAndRoom',
    {
      method: 'GET',
      data: params,
    },
  );
}

/** 删除房型房间 */
export async function deleteRoomType(params?: { id?: number }) {
  return request<API.Result>('/config/room/deleteTypeAndRoom', {
    method: 'POST',
    data: params,
  });
}

/** 新增修改钟点房 */
export async function AddHourRoom(
  params?: SETTING.HourRoom,
  action: API.ACTION = API.ACTION.ADD,
) {
  if (action === API.ACTION.ADD) {
    return request<API.Result>('/config/room/newHourRoom', {
      method: 'POST',
      data: params,
    });
  }
  return request<API.Result>('/config/room/updateHourRoom', {
    method: 'PUT',
    data: params,
  });
}

/** 获取钟点房详情信息 */
export async function getHourRoomDetail(params?: { id?: number }) {
  return request<API.Result_Setting_HourRoomDetail_>(
    '/config/room/queryHourRoomById',
    {
      method: 'GET',
      data: params,
    },
  );
}

/** 查询钟点房列表 */
export async function getHourRoomList(params?: {
  pageNum?: number;
  pageSize?: number;
}) {
  return request<API.Result_Setting_RoomTypeList_>('/config/room/allHourRoom', {
    method: 'GET',
    data: params,
  });
}

/** 删除钟点房 */
export async function deleteHourRoom(params?: { id?: number }) {
  return request<API.Result>('/config/room/deleteHourRoom', {
    method: 'POST',
    data: params,
  });
}

/** 设置钟点房间夜量 */
export async function setHourRoomIntervalNight(params?: {
  intervalNight?: number;
}) {
  return request<API.Result>('/config/room/hourRoomIntervalNight', {
    method: 'POST',
    data: params,
  });
}

/** 查询房间分组列表 */
export async function getRoomGroupList() {
  return request<API.Result_Setting_RoomGroupList_>(
    '/config/group/allRoomGroup',
    {
      method: 'GET',
    },
  );
}

/** 编辑房间分组 */
export async function updateRoomGroup(params?: {
  groupList?: SETTING.RoomGroup[];
}) {
  return request<API.Result>('/config/group/updateRoomGroup', {
    method: 'PUT',
    data: params,
  });
}

/** 查询房间排序 */
export async function getRoomSort(params?: {
  type?: number; // 1-房型，2-房间，3-分组
}) {
  return request<API.Result_Setting_RoomSortList_>(
    '/config/sort/querySortByType',
    {
      method: 'GET',
      params,
    },
  );
}

/** 修改房间排序 */
export async function updateRoomSort(params?: { list?: SETTING.RoomSort[] }) {
  return request<API.Result>('/config/group/updateSortByType', {
    method: 'PUT',
    data: params,
  });
}

/** 查询房价管理列表 */
export async function getRoomPriceList(params?: {
  roomTypeId?: number; // 0-所有房型
  priceType?: number; // 1-门市价，2-渠道价，3-假日价，4-临时价
  startTime?: string;
}) {
  return request<API.Result_Setting_RoomPriceList_>(
    '/config/price/allRoomTypePrice',
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
  return request<API.Result>('/config/price/updateRoomTypePrice', {
    method: 'PUT',
    data: params,
  });
}
