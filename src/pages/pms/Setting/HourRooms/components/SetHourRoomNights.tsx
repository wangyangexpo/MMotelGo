import React from 'react';
import { useRequest } from 'umi';
import { message, InputNumber, Form, Button } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import services from '@/services';

const FormItem = Form.Item;

const FormContent: React.FC = () => {
  const { data } = useRequest(() => {
    return services.SettingController.getHourRoomIntervalNight();
  });

  return (
    <FormItem
      name="intervalNight"
      label="钟点房间夜量基数"
      rules={[{ required: true }]}
      initialValue={data?.intervalNight}
      extra="请输入0～10之间的数字"
    >
      <InputNumber min={0} max={10} precision={1} style={{ width: '100%' }} />
    </FormItem>
  );
};

export default () => {
  return (
    <ModalForm
      width={500}
      trigger={<Button>设置钟点房间夜量</Button>}
      layout="horizontal"
      title="设置钟点房间夜量"
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        try {
          await services.SettingController.setHourRoomIntervalNight(values);
          message.success('设置成功！');
        } catch (error) {}
        return true;
      }}
    >
      <FormContent />
    </ModalForm>
  );
};
