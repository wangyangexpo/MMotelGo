import React from 'react';
import { useHistory, useIntl } from 'umi';
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
  const intl = useIntl();
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
          <SubMenu
            key="rooms"
            icon={<UserOutlined />}
            title={intl.formatMessage({ id: '住宿设置' })}
          >
            <Menu.Item key="/pms/setting/rooms-manage">
              {intl.formatMessage({ id: '房型房间设置' })}
            </Menu.Item>
            {/* <Menu.Item key="/pms/setting/rooms-hour">钟点房设置</Menu.Item> */}
            <Menu.Item key="/pms/setting/rooms-group">
              {intl.formatMessage({ id: '房间分组设置' })}
            </Menu.Item>
            <Menu.Item key="/pms/setting/rooms-sort">
              {intl.formatMessage({ id: '排序设置' })}
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="price"
            icon={<LaptopOutlined />}
            title={intl.formatMessage({ id: '房价设置' })}
          >
            <Menu.Item key="/pms/setting/price-manage">
              {intl.formatMessage({ id: '房价管理' })}
            </Menu.Item>
            <Menu.Item key="/pms/setting/price-batch">
              {intl.formatMessage({ id: '批量改价' })}
            </Menu.Item>
            <Menu.Item key="/pms/setting/price-log">
              {intl.formatMessage({ id: '改价记录' })}
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="shop"
            icon={<NotificationOutlined />}
            title={intl.formatMessage({ id: '门店设置' })}
          >
            <Menu.Item key="/pms/setting/shop-manage">
              {intl.formatMessage({ id: '门店设置' })}
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="financial"
            icon={<MoneyCollectOutlined />}
            title={intl.formatMessage({ id: '财务设置' })}
          >
            <Menu.Item key="/pms/setting/financial-payment">
              {intl.formatMessage({ id: '收款方式设置' })}
            </Menu.Item>
            <Menu.Item key="/pms/setting/financial-note">
              {intl.formatMessage({ id: '记一笔设置' })}
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="account"
            icon={<MoneyCollectOutlined />}
            title={intl.formatMessage({ id: '账号管理' })}
          >
            <Menu.Item key="/pms/setting/account-list">
              {intl.formatMessage({ id: '账号列表' })}
            </Menu.Item>
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
