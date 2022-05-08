import { useState } from 'react';
import { useRequest } from 'umi';
import {
  Button,
  Form,
  message,
  Modal,
  Space,
  Skeleton,
  InputNumber,
} from 'antd';
import type { ActionType } from '@ant-design/pro-table';
import { ProFormText } from '@ant-design/pro-form';
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
  const [hourRoomId, setHourRoomId] = useState<number>();

  const isUpdate = !!hourRoomId;

  async function onSubmit() {
    try {
      const data = await form.validateFields();
      setSubmitLoading(true);
      await services.SettingController.AddRoomType(
        data,
        isUpdate ? API.ACTION.UPDATE : API.ACTION.ADD,
      );
      message.success(`${isUpdate ? '保存' : '添加'}成功`);
      setVisible(false);
      setHourRoomId(undefined);
      action?.reload();
    } catch (error) {
    } finally {
      setSubmitLoading(false);
    }
  }

  function openAddHourRoomModal(act?: ActionType, rId?: number) {
    setHourRoomId(rId);
    setAction(act);
    setVisible(true);
  }

  const { data, loading } = useRequest(
    () => {
      if (hourRoomId) {
        return services.SettingController.getHourRoomDetail({ id: hourRoomId });
      }
      return Promise.resolve({ data: null });
    },
    {
      refreshDeps: [hourRoomId],
    },
  );

  const addHourRoomModal = (
    <Modal
      width={600}
      onCancel={() => setVisible(false)}
      visible={visible}
      title={isUpdate ? '编辑钟点房' : '添加钟点房'}
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
      <Skeleton loading={loading}>
        <Form
          form={form}
          {...formItemLayout}
          preserve={false}
          layout="horizontal"
        >
          <ProFormText
            name="roomTypeId"
            label="房型名称"
            fieldProps={{
              maxLength: 20,
            }}
            rules={[{ required: true }]}
            initialValue={data?.roomTypeId}
          />
          <FormItem
            label="入住时长"
            name="lengthOfStay"
            initialValue={data?.lengthOfStay}
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: '100%' }} addonAfter="小时" />
          </FormItem>
          <FormItem
            label="价格"
            name="price"
            initialValue={data?.price}
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: '100%' }} addonAfter="元" />
          </FormItem>
        </Form>
      </Skeleton>
    </Modal>
  );

  return {
    addHourRoomModal,
    openAddHourRoomModal,
  };
};
