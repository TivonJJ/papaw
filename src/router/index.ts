import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: process.env.VUE_APP_ROUTER_MODE,
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {title: '首页'},
            component: Home,
        },
        {
            path: '/demo',
            name: 'demo',
            meta: {title: '演示页面'},
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "demo" */ '@/views/Demo.vue'),
        },
        {
            path: '/user',
            name: 'user',
            meta: {title: '用户演示页面'},
            component: () => import(/* webpackChunkName: "user" */ '@/views/User.vue'),
        },
    ],
});
