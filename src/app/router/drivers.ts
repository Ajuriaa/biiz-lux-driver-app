import { RouteRecordRaw } from 'vue-router';
import DriverMainRouter from '@/components/driver/DriverMainRouter.vue';
import HomePage from '@/views/HomePage.vue';
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
    ],
    meta: { role: Role.driver },
  },
];
