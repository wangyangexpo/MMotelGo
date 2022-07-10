import React, { ReactNode, useState } from 'react';
import { useIntl, useRequest } from 'umi';
// import ProTable from '@ant-design/pro-table';
// import type { ProColumns } from '@ant-design/pro-table';
import { ColumnsType } from 'antd/lib/table';
import { Space, Typography, Table, DatePicker } from 'antd';
import { getWeekDay, getCalendarDate } from '@/utils';
import OrderDrawer from './components/OrderDrawer';
import EmptyDrawer from './components/EmptyDrawer';
import RoomCodeBox from './components/RoomCodeBox';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import TodayOverviewModal from './components/TodayOverviewModal';
import ChangeLogModal from './components/ChangeLogModal';
import RoomSituationModal from './components/RoomSituationModal';
import services from '@/services';
import moment from 'moment';
import './style.less';

type AlignType = 'left' | 'center' | 'right';

const RoomStatePage: React.FC = () => {
  const intl = useIntl();
  const [expand, setExpand] = useState(false);
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());

  // 生成30天的房态日历-columns
  const [calendarList, setCalendarList] = useState(() => {
    return getCalendarDate(30);
  });

  // 获取房态房间列表-rows
  const { data: rowData, loading: rowLoading } = useRequest(
    async () => {
      return services.RoomStateController.getAllRoomType({
        startTime: selectedDate.clone().format('YYYY-MM-DD'),
        endTime: selectedDate.clone().add(30, 'day').format('YYYY-MM-DD'),
        list: [],
      });
    },
    {
      refreshDeps: [selectedDate],
    },
  );

  // 获取房态剩余房间-rows
  const { data: stockData, loading: stockLoading } = useRequest(
    async () => {
      return services.RoomStateController.getRoomStateStock({
        startTime: selectedDate.clone().format('YYYY-MM-DD'),
        endTime: selectedDate.clone().add(30, 'day').format('YYYY-MM-DD'),
        list: [],
      });
    },
    {
      refreshDeps: [selectedDate],
    },
  );

  // 获取房间订单-渲染订单单元格
  const { data: orderData, loading: orderLoading } = useRequest(
    async () => {
      return services.RoomStateController.getAllRoomOrder({
        date: selectedDate.clone().format('YYYY-MM-DD'),
        days: 30,
      });
    },
    {
      refreshDeps: [selectedDate],
    },
  );

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

  function getLeftRoomCount(date: moment.Moment) {
    return stockData?.list?.find((s) => moment(s.date).isSame(date, 'day'))
      ?.roomCount;
  }

  function getCalendarColumns() {
    return (
      calendarList?.map?.((item) => {
        const d = moment(item.date);
        const isWeekend = [0, 6].includes(d.day());
        const dateText = d.isSame(moment(), 'day')
          ? intl.formatMessage({ id: '今天' })
          : d.format('MM-DD');
        const textType = isWeekend ? 'danger' : undefined;
        return {
          title: (
            <Space size={[10, 0]} style={{ padding: '10px 0' }}>
              <Typography.Text type={textType}>{dateText}</Typography.Text>
              <Typography.Text type={textType || 'secondary'}>
                {getWeekDay(d)}
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
                  {intl.formatMessage(
                    { id: 'ROOM_LEFT' },
                    { count: getLeftRoomCount(d) },
                  )}
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
                  } else if (d.isSame(calendarList?.[0]?.date, 'day')) {
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
                if (expand) {
                  return <div className="left-room-box">7间</div>;
                }
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
    if (expand) {
      return list;
    }
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

  const columns: ColumnsType<ROOM_STATE.StateTableData> = [
    {
      title: (
        <DatePicker
          value={selectedDate}
          onChange={(value) => {
            const selctDate = value || moment();
            setCalendarList(getCalendarDate(30, selctDate));
            setSelectedDate(selctDate);
          }}
          inputReadOnly
          autoFocus={false}
          allowClear={false}
        />
      ),
      children: [
        {
          title: intl.formatMessage({ id: '房型' }),
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
          title: (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {!expand ? (
                <Space>
                  <span>{intl.formatMessage({ id: '收起' })}</span>
                  <UpOutlined />
                </Space>
              ) : (
                <Space>
                  <span>{intl.formatMessage({ id: '展开' })}</span>
                  <DownOutlined />
                </Space>
              )}
            </div>
          ),
          width: 100,
          dataIndex: 'roomCode',
          fixed: 'left',
          align: 'center',
          render: (_, record) => {
            if (expand) {
              return '剩余';
            }
            return (
              <RoomCodeBox
                code={record.roomCode}
                isDirty={record.roomStatus === 1}
              />
            );
          },
        },
      ],
    },
    ...getCalendarColumns(),
  ];

  const dataSource = getCalendarRows(rowData?.list);

  return (
    <div className="roome-state-container">
      <Space className="roome-state-calendar-header">
        {/* <Button onClick={() => {}}>房价管理</Button> */}
        <TodayOverviewModal />
        <RoomSituationModal />
        <ChangeLogModal />
      </Space>

      <Table<ROOM_STATE.StateTableData>
        bordered
        size="small"
        sticky={{ offsetHeader: 48 }}
        loading={rowLoading || orderLoading || stockLoading}
        className="roome-state-calendar-table"
        rowClassName="state-table-row"
        scroll={{ x: 'scroll' }}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
};

export default RoomStatePage;
