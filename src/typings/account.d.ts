/** 订单 */
declare namespace ACCOUNT {
  interface AccountData extends BasicExtraProps {
    id: number;
    phoneNo: number;
    name: string;
    emailAddress: string;
    accountType: 0 | 1; // 0-管理员，1-普通员工；
    status: 0 | 1; // 0-禁用，1-启用
    storeId: number;
  }

  interface AccountDetail {
    accountId: number;
    nickName: string;
    phoneNo: string;
    emailAddress: string;
    menuAuthorityList: number[];
    overAllAuthorityList: number[];
  }

  interface SubMenu {
    menuId: number;
    menuName: string;
    authorityList: MenuAuthority[];
  }

  interface MainMenu {
    mainMenuId: number;
    mainMenuName: string;
    subMenuList: SubMenu[];
  }

  interface MenuAuthority {
    authorityId: number;
    authorityType:
      | 'add'
      | 'select'
      | 'update'
      | 'delete'
      | 'advancedManipulate'
      | 'advancedEditor'
      | 'anvancedOperations';
    remark: string;
  }

  interface MenuAuthorityModule {
    moduleName: string;
    mainMenuList: MainMenu[];
  }

  interface OverallAuthorityModule {
    authorityModule: string;
    authorityList: MenuAuthority[];
  }
}
