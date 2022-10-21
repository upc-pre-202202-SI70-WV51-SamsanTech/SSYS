import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: () => import('../statistics/pages/DashboardView.vue')
        },
        {
            path: '/orders',
            name: 'orders',
            component: () => import('../purchasing/pages/OrdersView.vue')
        },
        {
            path: '/workers',
            name: 'workers',
            component: () => import('../hcm/pages/WorkersView.vue')
        },
        {
            path: '/customers',
            name: 'customers',
            component: () => import('../sales/pages/CustomersView.vue')
        },
        {
            path: '/suppliers',
            name: 'suppliers',
            component: () => import('../purchasing/pages/SuppliersView.vue')
        },
        {
            path: '/products',
            name: 'products',
            component: () => import('../products/pages/ProductsView.vue')
        },
        {
            path: '/signUp',
            name: 'signUp',
            component: () => import('../security/pages/SignUp.vue')
        },
        {
            path: '/signIn',
            name: "signIn",
            component: () => import('../security/pages/SignIn.vue')
        }
    ]
});

export default router;