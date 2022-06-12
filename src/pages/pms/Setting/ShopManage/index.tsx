import React, { useState } from 'react';
import { Descriptions, Button, Form, Input, Skeleton } from 'antd';
import { useRequest } from 'umi';
import services from '@/services';
import './style.less';

const FormItem = Form.Item;
const DescItem = Descriptions.Item;

const ShopMange: React.FC = () => {
  const [editable, setEditable] = useState(false);

  const { data, loading } = useRequest(() => {
    return services.SettingController.getShopDetail();
  });
  return (
    <Skeleton loading={loading}>
      <Form className="shop-manage-container">
        <Descriptions
          title="门店基本信息"
          layout="vertical"
          column={4}
          extra={
            <Button
              type="primary"
              onClick={() => {
                setEditable(!editable);
              }}
            >
              编辑
            </Button>
          }
          labelStyle={{ fontSize: 10, color: '#999', padding: '0 12px' }}
          contentStyle={{ padding: '0 12px' }}
        >
          <DescItem label="门店名称">
            {!editable ? (
              'LAN坞09'
            ) : (
              <FormItem noStyle name="shopName" initialValue={data?.name}>
                <Input />
              </FormItem>
            )}
          </DescItem>
          <DescItem label="门店编号">67064513</DescItem>
          <DescItem label="门店类型">民宿</DescItem>
          <DescItem label="门店地址">上海/上海市/长宁区</DescItem>
          <DescItem label="详细地址" span={2}>
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </DescItem>
          <DescItem label="创建日期">2021-10-05</DescItem>
          <DescItem label="负责人">xxx</DescItem>
          <DescItem label="负责人手机号">13157215841</DescItem>
        </Descriptions>
      </Form>
    </Skeleton>
  );
};

export default ShopMange;
