import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import SuccessPage from '@/views/SuccessPage.vue';
import { isAuthed } from '@/core/helpers/auth-helper';
import { useCookies } from '@vueuse/integrations/useCookies';
import HomePage from '@/views/HomePage.vue';
import DemoMaps from '@/views/DemoMaps.vue';
import ProfilePage from '@/views/ProfilePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
    beforeEnter: () => {
      if (isAuthed.value) {
        return { path: '/home' };
      }
    },
  },
  {
    path: '/success',
    name: 'Success',
    component: SuccessPage,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/maps',
    name: 'Maps',
    component: DemoMaps,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
  },
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
