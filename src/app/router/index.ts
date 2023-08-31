import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { driverRoutes } from '@/router/drivers';
import LoginPage from '@/views/LoginPage.vue';
import SuccessPage from '@/views/SuccessPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import MapsPage from '@/views/MapsPage.vue';
import { findToken } from '@/core/helpers/auth-helper';
import { getRole } from '@/core/helpers/role-helper';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
    beforeEnter: (to) => {
      if (findToken()) {
        const homePathname = `/${getRole()}/home`;
        return { path: homePathname };
      }
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
  },
  {
    path: '/success',
    name: 'Success',
    component: SuccessPage,
  },
  {
    path: '/maps',
    name: 'Maps',
    component: MapsPage,
  },
  ...driverRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
