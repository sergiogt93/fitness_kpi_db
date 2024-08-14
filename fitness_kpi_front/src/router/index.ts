import { useAuthStore } from '@/stores/authStore';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/RegisterFormComponent.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/LoginFormComponent.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/components/DashboardComponent.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/url/acortar',
      name: 'url-acortar',
      component: () => import('@/components/UrlFormComponent.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token;

  if (to.meta.requiresAuth && !isAuthenticated) {
      // Redirige a la página de inicio si el usuario no está autenticado
      next('/');
  } else {
      next();
  }
});

export default router
