import React, { ReactNode, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { useRequest } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import { Switch, Space, Typography } from 'antd';
import { getWeekDay } from '@/utils';
import moment from 'moment';
import PriceEditDrawer from './components/PriceEditDrawer';
import services from '@/services';
import './style.less';

const SettingPriceCalendar: React.FC = () => {
  const [showRemain, setShowRemain] = useState(false);

  const { data } = useRequest(async () => {
    return services.SettingController.getRoomPriceCalendar({
      startDate: Date.now(),
    });
  });

  function getCalendarColumns(list?: SETTING.CalendarData[]) {
    return (
      list?.map?.((item) => {
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
          render: (_: ReactNode, record: SETTING.RoomPriceListData) => {
            return (
              <PriceEditDrawer
                record={record}
                date={item.date}
                showRemain={showRemain}
                priceType={1}
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
    ...getCalendarColumns(data?.list),
  ];

  return (
    <ProTable
      bordered
      size="small"
      scroll={{ x: 'scroll' }}
      columns={columns}
      options={false}
      search={false}
      request={async () => {
        const { data } = await services.SettingController.getRoomPriceList();
        const { list, totalCount } = data;
        return {
          data: list,
          total: totalCount,
        };
      }}
      rowKey="id"
      toolBarRender={(action) => [
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
