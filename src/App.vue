<template>
    <div id="app">
        <transition :name="isForward ? 'slide-left' : 'slide-right'">
            <keep-alive :include="keepAliveRoutes">
                <router-view />
            </keep-alive>
        </transition>
    </div>
</template>
<script>
import Vue from 'vue';
import { Dialog, Toast, Notify } from 'vant';
import { mapState } from 'vuex';

Vue.use(Dialog)
    .use(Toast)
    .use(Notify);

export default {
    name: 'App',
    computed: {
        ...mapState({
            keepAliveRoutes: state => state.navigator.keepAliveRoutes,
            isForward: state => state.navigator.isForward,
        }),
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
