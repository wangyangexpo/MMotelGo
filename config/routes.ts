export default [
  {
    path: '/',
    redirect: 'pms/setting',
  },
  {
    name: '首页',
    path: 'pms/home',
    component: 'pms/Home',
    hideInMenu: true,
  },
  {
    name: '房态',
    path: 'pms/room-state',
    component: 'pms/RoomState',
  },
  {
    path: 'pms/setting',
    exact: true,
    redirect: 'pms/setting/rooms-manage',
  },
  {
    name: '设置',
    path: 'pms/setting',
    component: 'pms/Setting',
    routes: [
      { path: '/pms/setting/rooms-manage', component: 'pms/Setting/RoomType' },
      { path: '/pms/setting/rooms-hour', component: 'pms/Setting/HourRooms' },
      { path: '/pms/setting/rooms-group', component: 'pms/Setting/RoomGroup' },
      { path: '/pms/setting/rooms-sort', component: 'pms/Setting/RoomSort' },
      {
        path: '/pms/setting/price-manage',
        component: 'pms/Setting/PriceCalendar',
      },
      { path: '/pms/setting/price-batch', component: 'pms/Setting/RoomType' },
      {
        path: '/pms/setting/price-log',
        component: 'pms/Setting/PriceChangeLog',
      },
      { path: '/pms/setting/shop-manage', component: 'pms/Setting/ShopManage' },
    ],
  },
  {
    name: '酒店列表',
    path: 'pms/store',
    component: 'pms/Store',
    hideInMenu: true,
    layout: {
      hideMenu: true, //  隐藏边栏
      hideNav: true, // 隐藏顶部导航
      hideFooter: true, // 隐藏底部底栏
    },
  },
  {
    name: '登录',
    path: 'user/login',
    component: 'user/Login',
    hideInMenu: true,
    layout: {
      hideMenu: true, //  隐藏边栏
      hideNav: true, // 隐藏顶部导航
      hideFooter: true, // 隐藏底部底栏
    },
  },
  {
    name: '注册账号',
    path: 'user/regist',
    hideInMenu: true,
    layout: {
      hideMenu: true, //  隐藏边栏
      hideNav: true, // 隐藏顶部导航
      hideFooter: true, // 隐藏底部底栏
    },
    component: 'user/Regist',
  },
  {
    name: '忘记密码',
    path: 'user/reset_password',
    hideInMenu: true,
    layout: {
      hideMenu: true, //  隐藏边栏
      hideNav: true, // 隐藏顶部导航
      hideFooter: true, // 隐藏底部底栏
    },
    component: 'user/ResetPassword',
  },
  {
    name: '404',
    redirect: 'user/login',
  },
];
