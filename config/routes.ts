export default [
  {
    path: '/',
    redirect: 'pms/home',
  },
  {
    name: '首页',
    path: 'pms/home',
    component: 'Home',
  },
  {
    name: '房态',
    path: 'pms/room-state',
    component: 'RoomState',
  },
  {
    path: 'pms/setting',
    exact: true,
    redirect: 'pms/setting/rooms-manage',
  },
  {
    name: '设置',
    path: 'pms/setting',
    component: 'Setting',
    routes: [
      { path: '/pms/setting/rooms-manage', component: 'Setting/RoomType' },
      { path: '/pms/setting/rooms-hour', component: 'Setting/HourRooms' },
      { path: '/pms/setting/rooms-group', component: 'Setting/RoomGroup' },
      { path: '/pms/setting/rooms-sort', component: 'Setting/RoomSort' },
      { path: '/pms/setting/price-manage', component: 'Setting/PriceCalendar' },
      { path: '/pms/setting/price-batch', component: 'Setting/RoomType' },
      { path: '/pms/setting/price-log', component: 'Setting/PriceChangeLog' },
      { path: '/pms/setting/shop-manage', component: 'Setting/RoomType' },
    ],
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
    path: 'user/join',
    hideInMenu: true,
    layout: {
      hideMenu: true, //  隐藏边栏
      hideNav: true, // 隐藏顶部导航
      hideFooter: true, // 隐藏底部底栏
    },
    component: 'user/Join',
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
];
