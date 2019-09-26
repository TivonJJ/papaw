import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import getPageTitle from '@/utils/get-page-title';
import './registerServiceWorker';
import './filters';
import {Dialog, Toast, Notify} from 'vant';

Vue.use(Dialog).use(Toast).use(Notify);

const {VUE_APP_BUILD_ENV} = process.env;

Vue.config.productionTip = VUE_APP_BUILD_ENV === 'production';

router.beforeEach((to, from, next) => {
    document.title = getPageTitle(to.meta.title);
    next();
});

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
