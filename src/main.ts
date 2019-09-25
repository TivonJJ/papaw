import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import getPageTitle from '@/utils/get-page-title';

const {VUE_APP_BUILD_ENV} = process.env;

Vue.config.productionTip = VUE_APP_BUILD_ENV === 'production';

if (Settings.pwa && VUE_APP_BUILD_ENV !== 'development') {
    // tslint:disable-next-line:no-var-requires
    require('./registerServiceWorker');
}

router.beforeEach((to, from, next) => {
    document.title = getPageTitle(to.meta.title);
    next();
});

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
