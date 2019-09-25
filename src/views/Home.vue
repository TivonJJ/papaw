<template>
    <div class="container">
        <div class="header">
            <img alt="logo" src="../assets/logo.png" class="logo">
            <h1>Papaw !</h1>
        </div>
        <router-link to="about">组件示例</router-link>
        <PaymentIcon code="Alipay"/>
        <PaymentIcon code="Alipay22"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import PaymentIcon from '@/components/PaymentIcon.vue'; // @ is an alias to /src

    @Component({
        components: {
            PaymentIcon,
        },
    })
    export default class Home extends Vue {
    }
</script>

<style lang="less" scoped>
    .container{
        padding: 24px;
    }
    .header{
        text-align: center;
        .logo{
            width: 80px;
        }
        h1{
            font-size: 20px;
        }
    }
</style>