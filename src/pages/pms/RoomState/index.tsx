import React, { ReactNode } from 'react';
import { useRequest } from 'umi';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, Space, Typography } from 'antd';
import { getWeekDay } from '@/utils';
import moment from 'moment';
import OrderDrawer from './components/OrderDrawer';
import EmptyDrawer from './components/EmptyDrawer';
import RoomCodeBox from './components/RoomCodeBox';
import services from '@/services';
import './style.less';

type AlignType = 'left' | 'center' | 'right';

const RoomStatePage: React.FC = () => {
  // 获取房态日历-columns
  const { data: colData, loading: colLoading } = useRequest(async () => {
    return services.RoomStateController.getRoomStateCalendar({
      startDate: Date.now(),
    });
  });

  // 获取房态房间列表-rows
  const { data: rowData, loading: rowLoading } = useRequest(async () => {
    return services.RoomStateController.getAllRoomType();
  });

  // 获取房间订单-渲染订单单元格
  const { data: orderData, loading: orderLoading } = useRequest(async () => {
    return services.RoomStateController.getAllRoomOrder({
      date: '2022-05-14',
      days: 30,
    });
  });

  function findOrderByRecord(record: ROOM_STATE.StateTableData, date?: string) {
    const recDate = moment(date);
    return orderData?.list?.find((o) => {
      if (o.roomId !== record.roomId || !o.checkinTime || !o.checkoutTime) {
        return false;
      }
      const checkinTime = moment(o.checkinTime);
      const checkoutTime = moment(o.checkoutTime);
      if (recDate.isBetween(checkinTime, checkoutTime, null, '[]')) {
        return true;
      }
      return false;
    });
  }

  function getCalendarColumns(list?: ROOM_STATE.CalendarData[]) {
    return (
      list?.map?.((item) => {
        const d = moment(item.date);
        const isWeekend = [0, 6].includes(d.day());
        const textType = isWeekend ? 'danger' : undefined;
        return {
          title: (
            <Space size={[10, 0]} style={{ padding: '10px 0' }}>
              <Typography.Text type={textType}>
                {d.format('MM-DD')}
              </Typography.Text>
              <Typography.Text type={textType || 'secondary'}>
                {getWeekDay(d, true)}
              </Typography.Text>
            </Space>
          ),
          align: 'center' as AlignType,
          children: [
            {
              align: 'center' as AlignType,
              width: 120,
              title: (
                <Typography.Text
                  type="secondary"
                  style={{ fontSize: 12, padding: '6px 0', display: 'block' }}
                >
                  剩 2 间
                </Typography.Text>
              ),
              onCell: (record: ROOM_STATE.StateTableData) => {
                const order = findOrderByRecord(record, item.date);
                if (order) {
                  const checkinTime = moment(order.checkinTime);
                  const checkoutTime = moment(order.checkoutTime);

                  if (checkinTime.isSame(d)) {
                    const days = checkoutTime.diff(checkinTime, 'days');
                    return {
                      colSpan: Math.abs(days) + 1,
                    };
                  } else if (d.isSame(colData?.list?.[0]?.date, 'day')) {
                    const days = checkoutTime.diff(d, 'days');
                    return {
                      colSpan: Math.abs(days) + 1,
                    };
                  } else {
                    return {
                      colSpan: 0,
                    };
                  }
                }
                return {
                  colSpan: 1,
                };
              },
              render: (_: ReactNode, record: ROOM_STATE.StateTableData) => {
                const order = findOrderByRecord(record, item.date);
                if (order) {
                  return <OrderDrawer record={record} order={order} />;
                }
                return <EmptyDrawer record={record} date={item.date} />;
              },
            },
          ],
        };
      }) || []
    );
  }

  function getCalendarRows(list: ROOM_STATE.RoomType[] = []) {
    const result = [];
    for (let i = 0; i < list?.length; i++) {
      const rowOrigin = list[i];
      const roomList = rowOrigin?.roomList;
      if (roomList) {
        for (let j = 0; j < roomList.length; j++) {
          const roomData = roomList[j];
          result.push({
            ...rowOrigin,
            ...roomData,
            rowSpan: j === 0 ? roomList.length : 0,
            id: roomData.roomId,
          });
        }
      }
    }
    return result;
  }

  const columns: ProColumns<ROOM_STATE.StateTableData>[] = [
    {
      title: '本地房型',
      children: [
        {
          title: '房型',
          width: 100,
          dataIndex: 'roomTypeName',
          fixed: 'left',
          align: 'center',
          onCell: (record) => {
            return {
              rowSpan: record.rowSpan,
            };
          },
        },
        {
          title: '房间号',
          width: 100,
          dataIndex: 'roomNumber',
          fixed: 'left',
          align: 'center',
          render: (_, record) => {
            return (
              <RoomCodeBox
                code={record.roomNumber}
                isDirty={record.roomStatus === 1}
              />
            );
          },
        },
      ],
    },
    ...getCalendarColumns(colData?.list),
  ];

  const dataSource = getCalendarRows(rowData?.list);

  return (
    <ProTable
      sticky={{ offsetHeader: 48 }}
      bordered
      size="small"
      loading={colLoading || rowLoading || orderLoading}
      className="roome-state-calendar-table"
      rowClassName="state-table-row"
      scroll={{ x: 'scroll' }}
      columns={columns}
      options={false}
      search={false}
      dataSource={dataSource}
      pagination={false}
      rowKey="id"
      toolBarRender={(action) => [<Button>房价管理</Button>]}
    ></ProTable>
  );
};

export default RoomStatePage;
