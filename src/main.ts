import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {toBoolean} from '@/utils';
import getPageTitle from '@/utils/get-page-title';

const {NODE_ENV, VUE_APP_PWA, VUE_APP_START_PARAMS} = process.env;

Vue.config.productionTip = NODE_ENV === 'production';

if (toBoolean(VUE_APP_PWA) && NODE_ENV !== 'development') {
    // tslint:disable-next-line:no-var-requires
    require('./registerServiceWorker');
}

if (VUE_APP_START_PARAMS) {
    try {
        window.startParams = JSON.parse(process.env.VUE_APP_START_PARAMS);
    } catch (e) {
        console.error('Start params parse error', process.env.VUE_APP_START_PARAMS, e);
    }
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
