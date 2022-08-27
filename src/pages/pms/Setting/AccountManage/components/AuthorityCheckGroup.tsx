import { systemMenuOptions } from '@/constants';
import { Checkbox, Form, Space, Tooltip } from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';

const FormItem = Form.Item;

export enum AuthorityTypeEnum {
  // 普通菜单权限
  MENU = 'menuAuthorityList',
  // 全局权限
  GLOBAL = 'overAllAuthorityList',
}

interface Props {
  type?: AuthorityTypeEnum;
  menu: ACCOUNT.SubMenu;
  checkedValues?: number[];
  prefixName?: string;
}

const AuthorityCheckGroup = (props: Props) => {
  const {
    menu,
    checkedValues,
    prefixName,
    type = AuthorityTypeEnum.MENU,
  } = props;
  const { menuName, authorityList } = menu;

  // 所有Id数组
  const authIdList = authorityList?.map((a) => a.authorityId);

  // Form.Item键值
  const name = [type, `${prefixName}-${menuName}`];

  // 初始值
  const value = checkedValues?.filter((i) => {
    return authIdList?.includes(+i);
  });

  const [checkAll, setCheckAll] = useState(
    value?.length === authIdList?.length,
  );
  const [halfCheck, setHalfCheck] = useState(
    !!value?.length && value.length < authIdList?.length,
  );

  return (
    <FormItem
      style={{ marginBottom: 8 }}
      labelAlign="left"
      wrapperCol={{ span: 20 }}
      colon={false}
      name={name}
      initialValue={value}
      label={
        <FormItem
          shouldUpdate
          style={{ marginBottom: 0, paddingLeft: 24, minWidth: 140 }}
        >
          {({ setFields }) => {
            return (
              <Checkbox
                onChange={(e) => {
                  setFields([
                    {
                      name,
                      value: e.target.checked ? authIdList : [],
                    },
                  ]);
                  setHalfCheck(false);
                  setCheckAll(e.target.checked);
                }}
                checked={checkAll}
                indeterminate={halfCheck}
              >
                {menuName}
              </Checkbox>
            );
          }}
        </FormItem>
      }
    >
      <Checkbox.Group
        onChange={(list) => {
          setHalfCheck(!!list?.length && list.length < authIdList?.length);
          setCheckAll(list?.length === authIdList?.length);
        }}
      >
        <Space size={[16, 8]} wrap style={{ padding: 5 }}>
          {authorityList?.map((item) => {
            return (
              <Checkbox key={item.authorityId} value={item.authorityId}>
                {systemMenuOptions?.find?.(
                  (opt) => opt.value === item.authorityType,
                )?.label || item.authorityType}
                {item.remark ? (
                  <Tooltip title={item.remark}>
                    <InfoCircleTwoTone style={{ marginLeft: 5 }} />
                  </Tooltip>
                ) : null}
              </Checkbox>
            );
          })}
        </Space>
      </Checkbox.Group>
    </FormItem>
  );
};

export default React.memo(AuthorityCheckGroup);
