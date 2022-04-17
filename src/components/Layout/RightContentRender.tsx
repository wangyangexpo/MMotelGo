import { Avatar, Space, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { setLocale, getLocale, getAllLocales } from 'umi';

export default () => {
  const allLocales = getAllLocales();
  return (
    <Space>
      <Select
        value={getLocale()}
        options={allLocales?.map((locale) => ({
          label: locale,
          value: locale,
        }))}
        onChange={(locale) => {
          setLocale(locale, false);
        }}
      ></Select>
      <Avatar size="small" icon={<UserOutlined />} />
    </Space>
  );
};
