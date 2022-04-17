/**
 * 在这里按照初始化数据定义项目中的权限，统一管理
 */
export default (initialState: SYSTEM.InitialState) => {
  const isSuperAdmin = initialState?.isSuper === '1';
  return {
    isSuperAdmin,
  };
};
