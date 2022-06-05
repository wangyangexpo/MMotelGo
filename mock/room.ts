import mockjs from 'mockjs';
import moment from 'moment';

export default {
  '/api/config/roomState/getStateRoomCalendar': mockjs.mock({
    success: true,
    errorMessage: '',
    data: {
      empty: false,
      list: () => {
        const result = [];
        for (let i = 0; i < 30; i++) {
          result.push({
            date: moment().add(i, 'd').format('yyyy-MM-DD'),
            type: -2,
          });
        }
        return result;
      },
    },
  }),
  '/api/config/roomState/allStateRoom': mockjs.mock({
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
          roomList: [
            { roomId: '100001', roomNumber: '1', roomStatus: 0 },
            { roomId: '100002', roomNumber: '2', roomStatus: 0 },
            { roomId: '100003', roomNumber: '3', roomStatus: 0 },
            { roomId: '100004', roomNumber: '4', roomStatus: 0 },
            { roomId: '100005', roomNumber: '5', roomStatus: 1 },
          ],
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
          roomList: [
            { roomId: '200001', roomNumber: '8001', roomStatus: 0 },
            { roomId: '200002', roomNumber: '8002', roomStatus: 0 },
            { roomId: '200003', roomNumber: '8003', roomStatus: 0 },
          ],
        },
        {
          id: '3',
          roomTypeName: '商务房',
          roomTypeShortName: '商务房',
          defaultPriceType: 2,
          defaultPrice: 120,
          weekDayPrice: 120,
          weekEndPrice: 120,
          roomCount: 5,
          roomList: [
            { roomId: '300001', roomNumber: '6001', roomStatus: 0 },
            { roomId: '300002', roomNumber: '6002', roomStatus: 0 },
            { roomId: '300003', roomNumber: '6003', roomStatus: 0 },
            { roomId: '300004', roomNumber: '6004', roomStatus: 0 },
            { roomId: '300005', roomNumber: '6005', roomStatus: 0 },
          ],
        },
      ],
    },
  }),

  '/api/config/roomState/allStateRoomOrder': mockjs.mock({
    success: true,
    errorMessage: '',
    data: {
      list: [
        {
          checkinTime: '2022-05-16',
          checkinType: 1,
          checkoutTime: '2022-05-18',
          customer: '美美',
          needPayAmount: 300,
          orderId: '900900731',
          origin: '携程',
          originColor: '#FFCC00',
          paidAmount: 0,
          phone: '16877778888',
          remark: null,
          roomId: '100001',
          serviceId: '901017443',
          status: 40,
          totalAmount: 300,
        },
        {
          checkinTime: '2022-05-16',
          checkinType: 1,
          checkoutTime: '2022-05-17',
          customer: '老大哥',
          needPayAmount: 300,
          orderId: '900900731',
          origin: '携程',
          originColor: '#FFCC00',
          paidAmount: 0,
          phone: '16877778888',
          remark: null,
          roomId: '100004',
          serviceId: '901017443',
          status: 40,
          totalAmount: 300,
        },
        {
          checkinTime: '2022-06-05',
          checkinType: 1,
          checkoutTime: '2022-06-07',
          customer: '钱美美',
          needPayAmount: 1300,
          orderId: '900900734',
          origin: '飞猪',
          originColor: '#FFCC00',
          paidAmount: 0,
          phone: '16877778888',
          remark: null,
          roomId: '100002',
          serviceId: '901017443',
          status: 40,
          totalAmount: 300,
        },
      ],
    },
  }),
};
