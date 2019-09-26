import Vue from 'vue';
import moment from 'moment';

Vue.filter('moment', (value: any, format: string) => {
    return moment(value).format(format);
});
