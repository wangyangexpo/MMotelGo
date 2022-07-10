import React, { useState } from 'react';
import {
  Card,
  Typography,
  Skeleton,
  Space,
  Row,
  Col,
  DatePicker,
  Select,
} from 'antd';
import { useRequest } from 'umi';
import services from '@/services';
import SingleDayBox from './components/SingleDayBox';
import moment from 'moment';
import './single.less';

const { Text } = Typography;
const { Option } = Select;

const SingleDay: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [sortType, setSortType] = useState(1);
  const { data, loading, run } = useRequest(
    () => {
      return services.RoomStateController.getSingleDayRoomState({
        stateDate: selectedDate.format('YYYY-MM-DD'),
        roomTypeId: 0,
        sortType,
        statusList: [1, 2, 3, 4],
      });
    },
    {
      refreshDeps: [selectedDate, sortType],
    },
  );
  return (
    <div className="single-day-container">
      <Row gutter={24}>
        <Col span={18}>
          <Skeleton loading={loading}>
            {data?.list?.map((item) => {
              return (
                <div className="single-day-card" key={item.roomTypeId}>
                  <Space>
                    <Text className="title">{item.roomTypeName}</Text>
                    <Text type="secondary">
                      (共{item?.roomList?.length || 0}间)
                    </Text>
                  </Space>
                  <Space wrap size={[12, 12]} className="box-wrap">
                    {item?.roomList?.map((room) => {
                      return (
                        <SingleDayBox
                          key={room.roomCode}
                          code={room.roomCode}
                          isDirty={room.status === 1}
                        />
                      );
                    })}
                  </Space>
                </div>
              );
            })}
          </Skeleton>
        </Col>
        <Col span={6}>
          <Card size="small" bordered={false} title="日期筛选">
            <DatePicker
              inputReadOnly
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date || moment());
              }}
              disabledDate={(d) => d.isBefore(moment())}
              allowClear={false}
              style={{ width: '100%' }}
            />
          </Card>
          <Card size="small" bordered={false} title="房型筛选">
            <Select value={sortType} onChange={(type) => setSortType(type)}>
              <Option value={1}>按房型排序</Option>
              <Option value={2}>按房间排序</Option>
              <Option value={3}>按房间分组排序</Option>
            </Select>
          </Card>
          <Card size="small" bordered={false} title="房态筛选">
            1
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SingleDay;
