import React, { ReactNode, useState } from 'react';
import { useRequest } from 'umi';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, Space, Typography } from 'antd';
import { getWeekDay } from '@/utils';
import moment from 'moment';
import OrderDrawer from './components/OrderDrawer';
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

  function getCalendarColumns(list?: SETTING.CalendarData[]) {
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
              render: (_: ReactNode, record: SETTING.RoomPriceListData) => {
                return (
                  <OrderDrawer record={record} date={item.date} priceType={1} />
                );
              },
            },
          ],
        };
      }) || []
    );
  }

  function getCalendarRows(list: SETTING.RoomType[] = []) {
    const result = [];
    for (let i = 0; i < list?.length; i++) {
      const rowOrigin = list[i];
      const roomCodeList = rowOrigin?.roomCodeList;
      if (roomCodeList) {
        for (let j = 0; j < roomCodeList.length; j++) {
          const code = roomCodeList[j];
          result.push({
            ...rowOrigin,
            roomCode: code,
            rowSpan: j === 0 ? roomCodeList.length : 0,
            id: rowOrigin.id + code,
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
          dataIndex: 'roomCode',
          fixed: 'left',
          align: 'center',
          render: (_, record) => {
            return <RoomCodeBox code={record.roomCode} />;
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
      loading={colLoading || rowLoading}
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
