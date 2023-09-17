import { RouteRecordRaw } from 'vue-router';
import DriverMainRouter from '@/components/driver/DriverMainRouter.vue';
import HomePage from '@/views/HomePage.vue';
import DemoMaps from '@/views/DemoMaps.vue';
import ProfilePage from '@/views/ProfilePage.vue';


import { Role } from '@/core/enums';

export const driverRoutes: Array<RouteRecordRaw> = [
  {
    path: '/driver',
    component: DriverMainRouter,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: HomePage,
      },
      {
        path: 'maps',
        name: 'Maps',
        component: DemoMaps,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfilePage,
      },
    ],
    meta: { role: Role.driver },
  },
];
