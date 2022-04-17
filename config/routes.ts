export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: 'Home',
    title: 'home_title',
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
      { path: '/setting/rooms-manage', component: 'Setting/Rooms' },
      { path: '/setting/rooms-hour', component: 'Setting/Rooms' },
      { path: '/setting/rooms-group', component: 'Setting/Rooms' },
      { path: '/setting/rooms-sort', component: 'Setting/Rooms' },
      { path: '/setting/price-manage', component: 'Setting/Rooms' },
      { path: '/setting/price-batch', component: 'Setting/Rooms' },
      { path: '/setting/price-log', component: 'Setting/Rooms' },
      { path: '/setting/shop-manage', component: 'Setting/Rooms' },
    ],
  },
  {
    name: '登录',
    path: '/login',
    component: 'Login',
    hideInMenu: true,
  },
];
