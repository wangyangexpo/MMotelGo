import React, { useState } from 'react';
import { message, Space, Form, Typography, InputNumber, Input } from 'antd';
import { DrawerForm, ProFormDateRangePicker } from '@ant-design/pro-form';
import services from '@/services';

const FormItem = Form.Item;

interface Props {
  record?: SETTING.RoomPriceListData;
  date?: string;
  showRemain?: boolean;
  priceType?: number;
}

const OrderDrawer: React.FC<Props> = (props) => {
  const { record, showRemain, date, priceType } = props;
  const [visible, setVisible] = useState(false);

  const data = record?.dateList?.find((item) => item.date === date);

  return (
    <DrawerForm
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      width={480}
      visible={visible}
      onVisibleChange={setVisible}
      trigger={
        <Space
          direction="vertical"
          size={[0, 0]}
          style={{ width: '100%', cursor: 'pointer' }}
        >
          {data?.price}
          {showRemain ? (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              剩{data?.remainCount}
            </Typography.Text>
          ) : null}
        </Space>
      }
      drawerProps={{
        closable: false,
        maskClosable: false,
      }}
      layout="horizontal"
      title="修改价格"
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
      <FormItem label="本地房型">
        <Typography.Text type="secondary">
          {record?.roomTypeName}
        </Typography.Text>
      </FormItem>
      <FormItem name="roomTypeId" hidden initialValue={record?.roomTypeId}>
        <Input />
      </FormItem>
      <FormItem name="priceType" hidden initialValue={priceType}>
        <Input />
      </FormItem>
      <ProFormDateRangePicker
        label="改价日期"
        name="dateRange"
        rules={[{ required: true }]}
        fieldProps={{ style: { width: '100%' } }}
        initialValue={[date, date]}
      />
      <FormItem
        label="门市价"
        rules={[{ required: true }]}
        name="price"
        initialValue={data?.price}
      >
        <InputNumber style={{ width: '100%' }} />
      </FormItem>
    </DrawerForm>
  );
};

export default OrderDrawer;
