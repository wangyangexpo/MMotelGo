declare module 'mockjs';
declare module 'js-cookie';
declare module '@/assets/*';

declare type Key = React.Key;

declare interface BasicExtraProps {
  createTime?: number; // 创建时间
  updateTime?: number; // 修改时间
  creatorId?: string; // 创建人工号
  creator?: string; // 创建人姓名
  operatorId?: string; // 修改人工号
  operator?: string; // 修改人姓名
}
