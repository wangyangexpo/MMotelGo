import React, { useState } from 'react';
import { message, Space, Form } from 'antd';
import { DrawerForm } from '@ant-design/pro-form';
import OrderBox from './OrderBox';
import services from '@/services';

const FormItem = Form.Item;

interface Props {
  record?: ROOM_STATE.StateTableData;
  order?: ORDER.OrderData;
}

const OrderDrawer: React.FC<Props> = (props) => {
  const { order, record } = props;

  return (
    <DrawerForm
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      width={480}
      trigger={
        <div>
          <OrderBox order={order} record={record} />
        </div>
      }
      drawerProps={{
        closable: false,
        maskClosable: false,
      }}
      layout="horizontal"
      title="订单详情"
      onFinish={async (values) => {
        try {
          await services.SettingController.updateRoomPrice({
            ...values,
            startTime: values?.dateRange?.[0],
            endTime: values?.dateRange?.[1],
          });
          message.success('设置成功！');
        } catch (error) {}
        return true;
      }}
    >
      {order?.checkinTime}
    </DrawerForm>
  );
};

export default OrderDrawer;
