import { createRouter, createWebHistory } from 'vue-router'
import Menu from '@/views/menu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: Menu,
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/orders.vue'),
    },
    {
      path: '/sales',
      name: 'sales',
      component: () => import('@/views/sales.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard.vue'),
    },

    /**
     * ADMIN
     */

    /**
     * AUTH
     */
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/login.vue'),
    },
  ],
})

export default router
