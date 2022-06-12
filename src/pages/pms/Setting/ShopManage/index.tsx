import React, { useState } from 'react';
import {
  Descriptions,
  Button,
  Form,
  Input,
  Skeleton,
  Space,
  message,
} from 'antd';
import { useRequest } from 'umi';
import services from '@/services';
import moment from 'moment';
import './style.less';

const FormItem = Form.Item;
const DescItem = Descriptions.Item;

const ShopMange: React.FC = () => {
  const [editable, setEditable] = useState(false);
  const [form] = Form.useForm();

  const { data, loading, run } = useRequest(() => {
    return services.SettingController.getShopDetail();
  });
  return (
    <Skeleton loading={loading}>
      <Form className="shop-manage-container" form={form}>
        <Descriptions
          title="门店基本信息"
          layout="vertical"
          column={4}
          extra={
            editable ? (
              <Space>
                <Button
                  onClick={() => {
                    setEditable(false);
                  }}
                >
                  取消
                </Button>
                <Button
                  type="primary"
                  onClick={async () => {
                    const values = await form.validateFields();
                    await services.SettingController.setShopDetail({
                      id: data?.id,
                      ...values,
                    });
                    message.success('修改成功');
                    setEditable(false);
                    run();
                  }}
                >
                  保存
                </Button>
              </Space>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  setEditable(true);
                }}
              >
                编辑
              </Button>
            )
          }
          labelStyle={{ fontSize: 10, color: '#999', padding: '0 12px' }}
          contentStyle={{ padding: '0 12px' }}
        >
          <DescItem label="门店名称">
            {!editable ? (
              data?.name
            ) : (
              <FormItem noStyle name="shopName" initialValue={data?.name}>
                <Input />
              </FormItem>
            )}
          </DescItem>
          <DescItem label="门店编号">{data?.code}</DescItem>
          <DescItem label="门店类型">
            {['', '民宿', '其他'][data?.type!]}
          </DescItem>
          <DescItem label="门店地址">
            {!editable ? (
              data?.address
            ) : (
              <FormItem noStyle name="address" initialValue={data?.address}>
                <Input />
              </FormItem>
            )}
          </DescItem>
          <DescItem label="详细地址" span={2}>
            {!editable ? (
              data?.detailAddress
            ) : (
              <FormItem
                noStyle
                name="detailAddress"
                initialValue={data?.detailAddress}
              >
                <Input />
              </FormItem>
            )}
          </DescItem>
          <DescItem label="创建日期">
            {data?.createTime
              ? moment(data?.createTime).format('YYYY/MM/DD')
              : '--'}
          </DescItem>
          <DescItem label="负责人">{data?.bossName}</DescItem>
          <DescItem label="负责人邮箱">{data?.bossEmail}</DescItem>
        </Descriptions>
      </Form>
    </Skeleton>
  );
};

export default ShopMange;
