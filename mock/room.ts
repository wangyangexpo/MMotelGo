import mockjs from 'mockjs';
// import moment from 'moment';

export default {
  '/config/roomState/allStateRoom': mockjs.mock({
    success: true,
    errorMessage: '',
    data: {
      list: [
        {
          id: '1',
          roomTypeName: '大床房',
          roomTypeShortName: '大床房',
          defaultPriceType: 2,
          defaultPrice: 120,
          weekDayPrice: 120,
          weekEndPrice: 120,
          roomCount: 5,
          roomCodeList: [1, 2, 3, 4, 5],
        },
        {
          id: '2',
          roomTypeName: '亲子房',
          roomTypeShortName: '亲子房',
          defaultPriceType: 2,
          defaultPrice: 120,
          weekDayPrice: 120,
          weekEndPrice: 120,
          roomCount: 3,
          roomCodeList: [8001, 8002, 8003],
        },
        {
          id: '3',
          roomTypeName: '商务房',
          roomTypeShortName: '商务房',
          defaultPriceType: 2,
          defaultPrice: 120,
          weekDayPrice: 120,
          weekEndPrice: 120,
          roomCount: 6,
          roomCodeList: [6001, 6002, 6003, 6004, 6005, 6006],
        },
      ],
    },
  }),
};
