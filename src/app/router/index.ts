import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { driverRoutes } from '@/router/drivers';
import LoginPage from '@/views/LoginPage.vue';
import SuccessPage from '@/views/SuccessPage.vue';
import { isAuthed } from '@/core/helpers/auth-helper';
import { useCookies } from '@vueuse/integrations/useCookies';

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
    path: '/success',
    name: 'Success',
    component: SuccessPage,
  },
  ...driverRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {  
  // Guard to check if the cookies still exist
  const cookies = useCookies();
  isAuthed.value = !!cookies.get('BZ-TOKEN');  
  
  if (!isAuthed.value && to.name !== 'Login') {
    return { name: 'Login' }
  }
});

export default router;
