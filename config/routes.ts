export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: 'Home',
  },
  {
    name: '房态',
    path: '/room-state',
    component: 'RoomState',
  },
  {
    path: '/setting',
    exact: true,
    redirect: '/setting/rooms-manage',
  },
  {
    name: '设置',
    path: '/setting',
    component: 'Setting',
    routes: [
      { path: '/setting/rooms-manage', component: 'Setting/RoomType' },
      { path: '/setting/rooms-hour', component: 'Setting/HourRooms' },
      { path: '/setting/rooms-group', component: 'Setting/RoomGroup' },
      { path: '/setting/rooms-sort', component: 'Setting/RoomSort' },
      { path: '/setting/price-manage', component: 'Setting/PriceCalendar' },
      { path: '/setting/price-batch', component: 'Setting/RoomType' },
      { path: '/setting/price-log', component: 'Setting/PriceChangeLog' },
      { path: '/setting/shop-manage', component: 'Setting/RoomType' },
    ],
  },
  {
    name: '登录',
    path: '/login',
    component: 'Login',
    hideInMenu: true,
  },
];
