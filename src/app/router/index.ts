import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { driverRoutes } from '@/router/drivers';
import LoginPage from '@/views/LoginPage.vue';
import SuccessPage from '@/views/SuccessPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import DemoMaps from '@/views/DemoMaps.vue';
import { isAuthed, findToken } from '@/core/helpers/auth-helper';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
    beforeEnter: () => {
      if (isAuthed.value) {
        const homePathname = `/driver/home`;
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
    component: DemoMaps,
  },
  ...driverRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  // Guard to check if the cookies still exist
  if (!(isAuthed.value = findToken()) && to.name !== 'Login') {
    return { name: 'Login' }
  }
});

export default router;
