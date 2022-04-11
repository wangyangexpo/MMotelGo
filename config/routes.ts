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
    name: '设置',
    path: '/setting',
    component: 'Setting',
    routes: [{ path: '/setting/rooms', component: 'Setting/Rooms' }],
  },
];
