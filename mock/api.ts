import mockjs from 'mockjs';

export default {
  // 支持值为 Object 和 Array
  'GET /api/client/login': {
    success: true,
    errorMessage: 'if login fail, this message will show!',
    data: {
      name: '王x',
      age: 12,
    },
  },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req: any, res: any) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },

  '/config/room/allTypeAndRoom': mockjs.mock({
    success: true,
    errorMessage: '',
    data: {
      totalCount: 100,
      'list|10': [
        {
          id: '@id',
          roomTypeName: '@ctitle(3, 4)',
          roomTypeShortName: '@ctitle(0, 2)',
          defaultPriceType: 1 | 2,
          defaultPrice: '@integer(0, 100)',
          weekDayPrice: '@integer(0, 100)',
          weekEndPrice: '@integer(0, 100)',
          roomCount: '@integer(0, 10)',
          'roomCodeList|0-10': ['@integer(0, 9999)'],
        },
      ],
    },
  }),

  '/config/room/queryTypeAndRoomById': mockjs.mock({
    success: true,
    errorMessage: '',
    data: {
      id: 10,
      roomTypeName: '大床房',
      roomTypeShortName: '大床房',
      defaultPriceType: 2,
      defaultPrice: 100,
      weekDayPrice: 100,
      weekEndPrice: 200,
      roomCount: 5,
      roomCodeList: ['101', '102', '103', '104', '1005'],
    },
  }),

  '/config/room/allHourRoom': mockjs.mock({
    success: true,
    errorMessage: '',
    data: {
      // totalCount: 100,
      'list|6': [
        {
          id: '@id',
          roomTypeName: '@ctitle(3, 4)',
          roomTypeId: '@id',
          price: '@integer(0, 100)',
          lengthOfStay: '@integer(0, 4)',
        },
      ],
    },
  }),

  '/config/sort/querySortByType': mockjs.mock({
    success: true,
    errorMessage: '',
    data: {
      // totalCount: 100,
      'list|8': [
        {
          id: '@id',
          name: '@integer(1000, 9999)',
        },
      ],
    },
  }),

  '/config/group/allRoomGroup': mockjs.mock({
    success: true,
    errorMessage: '',
    data: {
      // totalCount: 100,
      'list|2-8': [
        {
          id: '@id',
          groupType: '@pick([1, 2])',
          groupName: '@ctitle(4, 8)',
          'rooms|1-4': ['@integer(1000, 9999)'],
        },
      ],
    },
  }),

  '/config/price/getPriceCalendar': mockjs.mock({
    success: true,
    errorMessage: '',
    data: {
      empty: false,
      'list|21': [
        {
          date: '@date',
          festivalTypeList: null,
          type: -2,
        },
      ],
    },
  }),

  '/config/price/allRoomTypePrice': mockjs.mock({
    success: true,
    errorMessage: '',
    data: {
      empty: false,
      'list|5': [
        {
          id: '@id',
          roomTypeId: '@guid',
          roomTypeName: '@ctitle(4)',
          'dateList|21': [
            {
              date: '@date',
              price: '@integer(100,900)',
              defaultPrice: '@integer(100,900)',
              remainCount: '@integer(1,9)',
            },
          ],
        },
      ],
    },
  }),
};
