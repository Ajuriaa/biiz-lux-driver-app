import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { isAuthed } from '@/core/helpers/auth-helper';
import { useCookies } from '@vueuse/integrations/useCookies';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
    beforeEnter: () => {
      if (isAuthed.value) {
        return { path: '/home' };
      }
    },
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import('@/views/SuccessPage.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/maps',
    name: 'Maps',
    component: () => import('@/views/DemoMaps.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfilePage.vue')
  },
  {
    path: '/travel',
    name: 'Travel',
    component: () => import('@/views/TravelPage.vue'),
  },
  {
    path: '/finished-trip',
    name: 'Finished Trip',
    component: () => import ('@/views/FinishedTrip.vue')
  }
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
