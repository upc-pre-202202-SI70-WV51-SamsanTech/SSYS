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
            component: () => import('../views/CustomersView.vue')
        },
        {
            path: '/suppliers',
            name: 'suppliers',
            component: () => import('../views/SuppliersView.vue')
        },
        {
            path: '/products',
            name: 'products',
            component: () => import('../views/ProductsView.vue')
        }
    ]
});

export default router;