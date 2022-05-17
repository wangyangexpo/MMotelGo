import React, { useState } from 'react';
import { message, Space, Form } from 'antd';
import { DrawerForm } from '@ant-design/pro-form';
import EmptyBox from './EmptyBox';
import services from '@/services';

const FormItem = Form.Item;

interface Props {
  record?: ROOM_STATE.StateTableData;
  date?: string;
}

const EmptyDrawer: React.FC<Props> = (props) => {
  const { date, record } = props;
  const [visible, setVisible] = useState(false);

  return (
    <DrawerForm
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      width={480}
      visible={visible}
      onVisibleChange={setVisible}
      trigger={
        <EmptyBox
          record={record}
          onOrder={() => {
            setVisible(true);
          }}
        />
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
      {date}
    </DrawerForm>
  );
};

export default EmptyDrawer;
