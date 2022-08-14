import React from 'react';
import { useHistory } from 'umi';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const SettingContainer: React.FC = (props) => {
  const history = useHistory();
  const pathname = history.location.pathname;
  return (
    <Layout>
      <Sider width={200} collapsed={false} theme="light">
        <Menu
          mode="inline"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[
            pathname?.split('/pms/setting/')?.[1]?.split('-')?.[0],
          ]}
          onSelect={(info) => {
            const { key } = info;
            history.push(key);
          }}
        >
          <SubMenu key="rooms" icon={<UserOutlined />} title="住宿设置">
            <Menu.Item key="/pms/setting/rooms-manage">房型房间设置</Menu.Item>
            {/* <Menu.Item key="/pms/setting/rooms-hour">钟点房设置</Menu.Item> */}
            <Menu.Item key="/pms/setting/rooms-group">房间分组设置</Menu.Item>
            <Menu.Item key="/pms/setting/rooms-sort">排序设置</Menu.Item>
          </SubMenu>
          <SubMenu key="price" icon={<LaptopOutlined />} title="房价设置">
            <Menu.Item key="/pms/setting/price-manage">房价管理</Menu.Item>
            <Menu.Item key="/pms/setting/price-batch">批量改价</Menu.Item>
            <Menu.Item key="/pms/setting/price-log">改价记录</Menu.Item>
          </SubMenu>
          <SubMenu key="shop" icon={<NotificationOutlined />} title="门店设置">
            <Menu.Item key="/pms/setting/shop-manage">门店设置</Menu.Item>
          </SubMenu>
          <SubMenu
            key="financial"
            icon={<MoneyCollectOutlined />}
            title="财务设置"
          >
            <Menu.Item key="/pms/setting/financial-payment">
              收款方式设置
            </Menu.Item>
            <Menu.Item key="/pms/setting/financial-note">记一笔设置</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 'calc(100vh - 48px)',
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SettingContainer;
