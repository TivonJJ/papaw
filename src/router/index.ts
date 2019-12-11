import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        meta: { title: '首页' },
        component: Home,
    },
    {
        path: '/demo',
        name: 'demo',
        meta: { title: '演示页面' },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "demo" */ '@/views/Demo.vue'),
    },
    {
        path: '/user',
        name: 'user',
        meta: { title: '用户演示页面' },
        component: () =>
            import(/* webpackChunkName: "user" */ '@/views/User.vue'),
    },
    {
        path: '/form',
        name: 'form',
        meta: { title: '表单演示页面' },
        component: () =>
            import(/* webpackChunkName: "form" */ '@/views/Form.vue'),
    },
    {
        path: '/model',
        name: 'model',
        meta: { title: 'model演示页面' },
        component: () =>
            import(/* webpackChunkName: "model" */ '@/views/Model.vue'),
    },
    {
        path: '/lightGo',
        name: 'lightGo',
        meta: { title: 'lightGo' },
        component: () =>
            import(/* webpackChunkName: "lightGo" */ '@/views/lightGo.vue'),
    },
];

const router = new VueRouter({
    mode: Settings.router_mode,
    base: Settings.basePath,
    routes,
});

export default router;
