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
import { ProFormText, ProFormRadio } from '@ant-design/pro-form';
import RoomNumberGroup from './RoomNumberGroup';
import services from '@/services';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

export default () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState<ActionType>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [roomTypeId, setRoomTypeId] = useState<number>();

  const isUpdate = !!roomTypeId;

  async function onSubmit() {
    try {
      const data = await form.validateFields();
      await services.SettingController.addRoomType(
        {
          ...data,
          id: roomTypeId,
        },
        isUpdate ? 'update' : 'add',
      );
      message.success(`${isUpdate ? '保存' : '添加'}成功`);
      setVisible(false);
      setRoomTypeId(undefined);
      action?.reload();
    } catch (error) {
    } finally {
      setSubmitLoading(false);
    }
  }

  function openAddRoomTypeModal(act?: ActionType, rId?: number) {
    setRoomTypeId(rId);
    setAction(act);
    setVisible(true);
  }

  const { data, loading } = useRequest(
    () => {
      if (roomTypeId) {
        return services.SettingController.getRoomTypeDetail({ id: roomTypeId });
      }
      return Promise.resolve({ data: null });
    },
    {
      refreshDeps: [roomTypeId],
    },
  );

  const addRoomTypeModal = (
    <Modal
      width={720}
      onCancel={() => setVisible(false)}
      visible={visible}
      title={isUpdate ? '编辑房型' : '添加房型'}
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
            name="roomTypeName"
            label="房型名称"
            fieldProps={{
              maxLength: 20,
            }}
            rules={[{ required: true }]}
            initialValue={data?.roomTypeName}
          />
          <ProFormText
            name="roomTypeShortName"
            label="简称"
            fieldProps={{
              maxLength: 10,
            }}
            rules={[{ required: true }]}
            initialValue={data?.roomTypeShortName}
          />
          <ProFormRadio.Group
            label="门市价"
            name="defaultPriceType"
            initialValue={data?.defaultPriceType || 1}
            options={[
              { label: '不区分', value: 1 },
              { label: '区分平日、周末', value: 2 },
            ]}
          />
          <FormItem
            label="&nbsp;"
            colon={false}
            dependencies={['defaultPriceType']}
          >
            {({ getFieldValue }) => {
              const defaultPriceType = getFieldValue(['defaultPriceType']);
              return defaultPriceType === 1 ? (
                <FormItem
                  label="默认价"
                  name="defaultPrice"
                  initialValue={data?.defaultPrice}
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </FormItem>
              ) : (
                <>
                  <FormItem
                    label="平日价"
                    name="weekDayPrice"
                    initialValue={data?.weekDayPrice}
                    rules={[{ required: true }]}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </FormItem>
                  <FormItem
                    label="周末价"
                    name="weekEndPrice"
                    initialValue={data?.weekEndPrice}
                    rules={[{ required: true }]}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </FormItem>
                </>
              );
            }}
          </FormItem>
          <FormItem
            label="房间数量"
            name="roomCount"
            initialValue={data?.roomCount || 1}
            rules={[{ required: true }]}
          >
            <InputNumber
              min={1}
              max={99}
              style={{ width: '100%' }}
              addonAfter="间"
            />
          </FormItem>
          <FormItem label="房间号" dependencies={['roomCount']}>
            {({ getFieldValue }) => {
              const roomCount = getFieldValue(['roomCount']);
              return (
                <RoomNumberGroup
                  form={form}
                  roomCount={roomCount}
                  initialValue={data?.roomList}
                />
              );
            }}
          </FormItem>
        </Form>
      </Skeleton>
    </Modal>
  );

  return {
    addRoomTypeModal,
    openAddRoomTypeModal,
  };
};
