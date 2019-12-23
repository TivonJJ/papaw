<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view />
        </transition>
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
    data() {
        return {
            transitionName: '',
        };
    },
    watch: {
        //使用watch 监听$router的变化
        $route(to, from) {
            const toPath = to.path.split('/').filter(n => !!n);
            const fromPath = from.path.split('/').filter(n => !!n);
            this.transitionName =
                toPath.length >= fromPath.length ? 'slide-left' : 'slide-right';
        },
    },
};
</script>
<style lang="less">
@import '~@/styles/common';
#app > div {
    min-width: 100vw;
    min-height: 100vh;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
}
.slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
</style>
