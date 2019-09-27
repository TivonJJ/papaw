import Vue from 'vue';

require.ensure([], (require) => {
    const moment = require('moment');
    Vue.filter('moment', (value: any, format: string) => {
        return moment(value).format(format);
    });
});
