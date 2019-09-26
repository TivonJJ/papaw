import {register} from 'register-service-worker';

const {VUE_APP_BUILD_ENV} = process.env;

if (Settings.pwa && VUE_APP_BUILD_ENV !== 'development') {
    console.log('register PWA');
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
            console.log(
                'App is being served from cache by a service worker.\n' +
                'For more details, visit https://goo.gl/AFskqB',
            );
        },
        registered() {
            console.log('Service worker has been registered.');
        },
        cached() {
            console.log('Content has been cached for offline use.');
        },
        updatefound() {
            console.log('New content is downloading.');
        },
        updated() {
            console.log('New content is available; please refresh.');
        },
        offline() {
            console.log('No internet connection found. App is running in offline mode.');
        },
        error(error) {
            console.error('Error during service worker registration:', error);
        },
    });
} else if ('serviceWorker' in navigator) {
    const {serviceWorker} = navigator;
    if (serviceWorker.getRegistrations) {
        serviceWorker.getRegistrations().then((sws) => {
            sws.forEach((sw) => {
                sw.unregister();
            });
        });
    }
    serviceWorker.getRegistration().then((sw) => {
        if (sw) {
            sw.unregister();
        }
    });

    // remove all caches
    if (window.caches && window.caches.keys) {
        caches.keys().then((keys) => {
            keys.forEach((key) => {
                caches.delete(key);
            });
        });
    }
}
