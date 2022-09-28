import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue')
        },
        {
            path: '/orders',
            name: 'orders',
            component: () => import('../views/OrdersView.vue')
        },
        {
            path: '/workers',
            name: 'workers',
            component: () => import('../views/WorkersView.vue')
        },
        {
            path: '/customers',
            name: 'customers',
        },
        {
            path: '/suppliers',
            name: 'suppliers',
        }
    ]
});

export default router;