<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import Vue from 'vue';
import { Dialog, Toast, Notify } from 'vant';

Vue.use(Dialog)
    .use(Toast)
    .use(Notify);

export default {
    name: 'App',
};
</script>
<style lang="less">
@import '~@/styles/common';
</style>
