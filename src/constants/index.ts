export const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const localeMap = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];

// 全局权限枚举，增删改查高级操作等
export enum MenuAuthorityEnum {
  ADD = 'add',
  SELECT = 'select',
  UPDATE = 'update',
  DELETE = 'delete',
  ADVANCED_MANIPULATE = 'advancedManipulate',
  ADVANCED_EDITOR = 'advancedEditor',
  ADVANCED_OPERATIONS = 'advancedOperations',
}

export const systemMenuOptions = [
  { label: '新增', value: MenuAuthorityEnum.ADD },
  { label: '查询', value: MenuAuthorityEnum.SELECT },
  { label: '编辑', value: MenuAuthorityEnum.UPDATE },
  { label: '删除', value: MenuAuthorityEnum.DELETE },
  {
    label: '高级操作',
    value: MenuAuthorityEnum.ADVANCED_MANIPULATE,
    remark: true,
  },
  { label: '高级编辑', value: MenuAuthorityEnum.ADVANCED_EDITOR, remark: true },
  {
    label: '高级运营',
    value: MenuAuthorityEnum.ADVANCED_OPERATIONS,
    remark: true,
  },
];

export enum ConsumerItemClassifyEnum {
  OTHER = 1, // 其他
  BREAKFAST = 2, // 早餐消费
  ROOM_CONSUMPTION = 3, // 客房消费
  COMPENSATION = 4, // 赔偿
}
