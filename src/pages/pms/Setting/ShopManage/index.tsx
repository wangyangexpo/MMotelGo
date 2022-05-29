import React from 'react';
import { Descriptions, Button } from 'antd';
import './style.less';

const ShopMange: React.FC = () => {
  return (
    <div className="shop-manage-container">
      <Descriptions
        title="门店基本信息"
        layout="vertical"
        column={4}
        extra={<Button type="primary">编辑</Button>}
        labelStyle={{ fontSize: 10, color: '#999' }}
      >
        <Descriptions.Item label="门店名称">LAN坞09</Descriptions.Item>
        <Descriptions.Item label="门店编号">67064513</Descriptions.Item>
        <Descriptions.Item label="门店类型">民宿</Descriptions.Item>
        <Descriptions.Item label="门店地址">
          上海/上海市/长宁区
        </Descriptions.Item>
        <Descriptions.Item label="详细地址" span={2}>
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
        <Descriptions.Item label="创建日期">2021-10-05</Descriptions.Item>
        <Descriptions.Item label="负责人">xxx</Descriptions.Item>
        <Descriptions.Item label="负责人手机号">13157215841</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ShopMange;
