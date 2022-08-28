import { useState } from 'react';
import { Button, Form, message, Modal, Space, InputNumber } from 'antd';
import type { ActionType } from '@ant-design/pro-table';
import { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import services from '@/services';

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
        data,
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
          name="name"
          label="消费项分类"
          rules={[{ required: true }]}
          initialValue={consumer?.classifyName}
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
          rules={[{ required: true }]}
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
