import React from 'react';
import { useHistory } from 'umi';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const SettingContainer: React.FC = (props) => {
  const history = useHistory();
  return (
    <Layout>
      <Sider width={200} collapsed={false} theme="light">
        <Menu
          mode="inline"
          defaultSelectedKeys={[history.location.pathname]}
          // defaultOpenKeys={['rooms']}
          onSelect={(info) => {
            const { key } = info;
            history.push(key);
          }}
        >
          <SubMenu key="rooms" icon={<UserOutlined />} title="住宿设置">
            <Menu.Item key="/setting/rooms-manage">房型房间设置</Menu.Item>
            <Menu.Item key="/setting/rooms-hour">钟点房设置</Menu.Item>
            <Menu.Item key="/setting/rooms-group">房间分组设置</Menu.Item>
            <Menu.Item key="/setting/rooms-sort">排序设置</Menu.Item>
          </SubMenu>
          <SubMenu key="price" icon={<LaptopOutlined />} title="房价设置">
            <Menu.Item key="/setting/price-manage">房价管理</Menu.Item>
            <Menu.Item key="/setting/price-batch">批量改价</Menu.Item>
            <Menu.Item key="/setting/price-log">改价记录</Menu.Item>
          </SubMenu>
          <SubMenu key="shop" icon={<NotificationOutlined />} title="门店设置">
            <Menu.Item key="/setting/shop-manage">门店设置</Menu.Item>
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
