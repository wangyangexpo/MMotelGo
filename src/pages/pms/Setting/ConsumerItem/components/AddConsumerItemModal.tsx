import { useState } from 'react';
import { Button, Form, message, Modal, Space, InputNumber } from 'antd';
import type { ActionType } from '@ant-design/pro-table';
import { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { ConsumerItemClassifyEnum } from '@/constants';
import services from '@/services';
import Cookie from 'js-cookie';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState<ActionType>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [consumer, setConsumer] = useState<Partial<SETTING.ConsumerItem>>();

  const isUpdate = !!consumer;

  async function onSubmit() {
    try {
      const data = await form.validateFields();
      setSubmitLoading(true);
      await services.SettingController.addConsumerItem(
        {
          id: consumer?.id,
          ...data,
        },
        isUpdate ? 'update' : 'add',
      );
      message.success(`${isUpdate ? '保存' : '添加'}成功`);
      setVisible(false);
      setConsumer(undefined);
      action?.reload();
    } catch (error) {
    } finally {
      setSubmitLoading(false);
    }
  }

  function openAddConsumerItemModal(
    act?: ActionType,
    record?: Partial<SETTING.ConsumerItem>,
  ) {
    setConsumer(record);
    setAction(act);
    setVisible(true);
  }

  const addConsumerItemModal = (
    <Modal
      width={600}
      onCancel={() => setVisible(false)}
      visible={visible}
      title={isUpdate ? '编辑消费项' : '添加消费项'}
      footer={
        <Space>
          <Button onClick={() => setVisible(false)}>取消</Button>
          <Button type="primary" onClick={onSubmit} loading={submitLoading}>
            {isUpdate ? '保存' : '添加'}
          </Button>
        </Space>
      }
      maskClosable={false}
      destroyOnClose
    >
      <Form
        form={form}
        {...formItemLayout}
        preserve={false}
        layout="horizontal"
      >
        <ProFormSelect
          name="classify"
          label="消费项分类"
          rules={[{ required: true, message: '请选择分类' }]}
          initialValue={consumer?.classify}
          options={[
            { label: '早餐消费', value: ConsumerItemClassifyEnum.BREAKFAST },
            {
              label: '客房消费',
              value: ConsumerItemClassifyEnum.ROOM_CONSUMPTION,
            },
            { label: '赔偿', value: ConsumerItemClassifyEnum.COMPENSATION },
            { label: '其他', value: ConsumerItemClassifyEnum.OTHER },
          ]}
        />
        <ProFormText
          label="名称"
          name="name"
          fieldProps={{
            maxLength: 20,
          }}
          rules={[{ required: true, message: '请输入名称' }]}
          initialValue={consumer?.name}
        />
        <FormItem
          label="价格"
          name="price"
          initialValue={consumer?.price}
          rules={[{ required: true, message: '请输入价格' }]}
        >
          <InputNumber style={{ width: '100%' }} addonBefore="￥" />
        </FormItem>
      </Form>
    </Modal>
  );

  return {
    addConsumerItemModal,
    openAddConsumerItemModal,
  };
};
