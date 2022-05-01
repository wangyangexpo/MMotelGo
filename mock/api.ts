import { jaJPIntl } from '@ant-design/pro-table';
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
};
