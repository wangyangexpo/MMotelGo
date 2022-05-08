import React from 'react';
import { Alert, Tabs } from 'antd';
import SortableRooms from './components/SortableRooms';

const { TabPane } = Tabs;

const RoomSortPage: React.FC = () => {
  return (
    <div>
      <Alert
        closable
        message="拖拽房型即可进行房型排序，选定排序方式之后，房态日历将按照下方顺序展示"
        type="info"
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="房型排序" key="1">
          <SortableRooms type={1} />
        </TabPane>
        <TabPane tab="房间排序" key="2">
          <SortableRooms type={2} />
        </TabPane>
        <TabPane tab="分组排序" key="3">
          <SortableRooms type={3} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default RoomSortPage;
