import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default () => {
  return (
    <Space>
      <Avatar size="small" icon={<UserOutlined />} />
    </Space>
  );
};
