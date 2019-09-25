<template>
    <div class="container">
        <div class="header">
            <img alt="logo" src="../assets/logo.png" class="logo">
            <h1>Papaw !</h1>
        </div>
        <div class="desc">
            papaw是一个基于VUE+Vant的前端脚手架，使用vue-cli构建，并增加pwa、环境配置、本地能力模拟等功能
        </div>
        <CellGroup>
            <Cell title="组件示例" is-link to="demo"/>
            <Cell title="系统配置" @click="showSetting"/>
            <Cell title="启动参数配置" @click="showStartParams"/>
        </CellGroup>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CellGroup, Cell, Dialog} from 'vant';

    @Component({
        components: {
            CellGroup,
            Cell
        },
    })
    export default class Home extends Vue {
        showSetting = () => {
            Dialog({title: '设置', message: JSON.stringify(Settings)});
        };
        showStartParams = () => {
            Dialog({title: '启动参数', message: JSON.stringify(StartParams)});
        }
    }
</script>

<style lang="less" scoped>
    @import "~@/styles/mixins";

    .container {
        padding: 24px 0;
    }

    .header {
        text-align: center;

        .logo {
            width: 80px;
        }

        h1 {
            font-size: 20px;
        }
    }

    .desc {
        padding: 24px;
        font-size: 14px;
        background: @white;
        margin: 12px 0;
    }
</style>