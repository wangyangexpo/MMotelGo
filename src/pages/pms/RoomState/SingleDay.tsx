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
  Checkbox,
} from 'antd';
import { useRequest } from 'umi';
import services from '@/services';
import SingleDayBox from './components/SingleDayBox';
import moment from 'moment';
import './single.less';

const CheckboxGroup = Checkbox.Group;

const { Text } = Typography;
const { Option } = Select;

const SingleDay: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [sortType, setSortType] = useState(1);
  const [statusList, setStatusList] = useState<number[]>([]);

  const { data: enumData, loading: enumLoading } = useRequest(() => {
    return services.RoomStateController.getRoomStatusEnum();
  });

  const { data, loading, run } = useRequest(
    () => {
      return services.RoomStateController.getSingleDayRoomState({
        stateDate: selectedDate.format('YYYY-MM-DD'),
        roomTypeId: 0,
        sortType,
        statusList,
      });
    },
    {
      refreshDeps: [selectedDate, sortType, statusList],
    },
  );

  return (
    <div className="single-day-container">
      <Row gutter={24}>
        <Col span={18}>
          <Skeleton loading={enumLoading || loading}>
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
            <Select
              style={{ width: '100%' }}
              value={sortType}
              onChange={(type) => setSortType(type)}
            >
              <Option value={1}>按房型排序</Option>
              <Option value={2}>按房间排序</Option>
              <Option value={3}>按房间分组排序</Option>
            </Select>
          </Card>
          <Card size="small" bordered={false} title="房态筛选">
            <Row gutter={[0, 8]}>
              <Col span={24}>
                <Checkbox>全部</Checkbox>
              </Col>
              <CheckboxGroup
                onChange={(l) => {
                  setStatusList(l as number[]);
                }}
                value={statusList}
              >
                <Row gutter={[16, 8]}>
                  {enumData?.list?.map((item) => (
                    <Col span={8}>
                      <Checkbox value={item.code}>{item.desc}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </CheckboxGroup>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SingleDay;
