import React, { ReactNode, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import { Switch, Space, Typography, DatePicker, Select } from 'antd';
import { getWeekDay, getCalendarDate } from '@/utils';
import moment from 'moment';
import PriceEditDrawer from './components/PriceEditDrawer';
import services from '@/services';
import { useRequest } from 'umi';
import './style.less';

const SettingPriceCalendar: React.FC = () => {
  const [showRemain, setShowRemain] = useState(false);
  const [fromDate, setFromDate] = useState(() => moment());
  const [roomTypeId, setRoomTypeId] = useState(0);

  // 获取房态房间列表
  const { data } = useRequest(async () => {
    return services.SettingController.getRoomTypeList();
  });

  const roomTypeOptions = [{ label: '全部房型', value: 0 }].concat(
    data?.list?.map((item) => {
      return {
        label: item.roomTypeName!,
        value: item.id!,
      };
    }) || [],
  );

  function getCalendarColumns() {
    const calendarList = getCalendarDate(30, fromDate);

    return (
      calendarList?.map?.((item) => {
        const d = moment(item.date);
        const isWeekend = [0, 6].includes(d.day());
        const textType = isWeekend ? 'danger' : undefined;
        return {
          title: (
            <Space direction="vertical" size={[0, 0]}>
              <Space>
                <Typography.Text type={textType}>
                  {d.format('MM-DD')}
                </Typography.Text>
                {/* <span className="price-calendar-rest"></span> */}
                {/* <span className="price-calendar-work"></span> */}
              </Space>
              <Typography.Text type={textType}>{getWeekDay(d)}</Typography.Text>
            </Space>
          ),
          width: 140,
          align: 'center' as 'left' | 'center' | 'right',
          render: (
            _: ReactNode,
            record: SETTING.RoomPriceListData,
            _i: number,
            action?: ProCoreActionType,
          ) => {
            return (
              <PriceEditDrawer
                record={record}
                date={item.date}
                showRemain={showRemain}
                priceType={1}
                action={action}
              />
            );
          },
        };
      }) || []
    );
  }

  const columns: ProColumns<SETTING.RoomPriceListData>[] = [
    {
      title: '本地房型',
      width: 180,
      dataIndex: 'roomTypeName',
      ellipsis: true,
      fixed: 'left',
    },
    ...getCalendarColumns(),
  ];

  return (
    <ProTable
      bordered
      size="small"
      scroll={{ x: 'scroll' }}
      columns={columns}
      params={{ fromDate, roomTypeId }}
      options={false}
      search={false}
      request={async () => {
        const { data } = await services.SettingController.getRoomPriceList({
          priceType: 1,
          roomTypeId,
          startTime: fromDate.format('YYYY-MM-DD'),
        });
        const { list, totalCount } = data || {};
        return {
          data: list,
          total: totalCount,
        };
      }}
      rowKey="roomTypeId"
      headerTitle={
        <Space>
          <DatePicker
            value={fromDate}
            onChange={(date) => setFromDate(date!)}
            style={{ width: 140 }}
          />
          <Select
            style={{ width: 140 }}
            value={roomTypeId}
            onChange={setRoomTypeId}
            options={roomTypeOptions}
          />
        </Space>
      }
      toolBarRender={() => [
        <Space>
          <Switch
            checked={showRemain}
            onChange={(checked) => setShowRemain(checked)}
          />
          {showRemain ? '显示库存' : '隐藏库存'}
        </Space>,
      ]}
    ></ProTable>
  );
};

export default SettingPriceCalendar;
