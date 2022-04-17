import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const SettingContainer: React.FC = (props) => {
  return (
    <Layout>
      <Sider width={200} className="site-layout-background" collapsed={false}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['room']}
        >
          <SubMenu key="room" icon={<UserOutlined />} title="住宿设置">
            <Menu.Item key="1">房型房间设置</Menu.Item>
            <Menu.Item key="2">钟点房设置</Menu.Item>
            <Menu.Item key="3">房间分组设置</Menu.Item>
            <Menu.Item key="4">排序设置</Menu.Item>
          </SubMenu>
          <SubMenu key="price" icon={<LaptopOutlined />} title="房价设置">
            <Menu.Item key="5">房价管理</Menu.Item>
            <Menu.Item key="6">批量改价</Menu.Item>
            <Menu.Item key="7">改价记录</Menu.Item>
          </SubMenu>
          <SubMenu key="shop" icon={<NotificationOutlined />} title="门店设置">
            <Menu.Item key="8">门店设置</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 0,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SettingContainer;
