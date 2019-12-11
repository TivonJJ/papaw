import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import getPageTitle from '@/utils/get-page-title';
import './registerServiceWorker';
import './filters';

const { VUE_APP_BUILD_ENV } = process.env;

Vue.config.productionTip = VUE_APP_BUILD_ENV === 'development';

router.beforeEach((to, from, next) => {
    document.title = getPageTitle(to.meta.title);
    next();
});

// Extend finally method to Promise's prototype if it dose not exist
function PromiseFinally(f: any) {
    // @ts-ignore
    return this.then(
        function(value: any) {
            return Promise.resolve(f(null, value)).then(function() {
                return value;
            });
        },
        function(err: any) {
            return Promise.resolve(f(err)).then(function() {
                throw err;
            });
        },
    );
}
if (!Promise.prototype.finally) {
    Promise.prototype.finally = PromiseFinally;
}
if (!window.Promise.prototype.finally) {
    window.Promise.prototype.finally = PromiseFinally;
}

window.app = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
