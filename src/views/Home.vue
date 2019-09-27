<template>
    <div>
        <div class="banner">
            <img src="@/assets/logo.png" class="logo"/>
        </div>
        <Row class="user-links">
            <Col span="6" @click="$toast('Click:待付款')">
                <Icon name="pending-payment"></Icon>
                待付款
            </Col>
            <Col span="6" @click="$toast('Click:待接单')">
                <Icon name="records"/>
                待接单
            </Col>
            <Col span="6" @click="$toast('Click:待发货')">
                <Icon name="tosend"/>
                待发货
            </Col>
            <Col span="6" @click="$toast('Click:已发货')">
                <Icon name="logistics"/>
                已发货
            </Col>
        </Row>

        <CellGroup class="user-group">
            <Cell>
                <div class="desc">
                    papaw是一个基于VUE+Vant的前端脚手架，开发语言使用Typescript，构建环境使用vue-cli，并增加pwa、环境配置、本地能力模拟等功能
                </div>
            </Cell>
        </CellGroup>


        <CellGroup>
            <Cell icon="apps-o"
                  title="组件示例"
                  is-link
                  to="demo"/>
            <Cell icon="setting-o"
                  title="系统配置"
                  label="settings.js的全局配置，内含环境配置"
                  @click="showSetting"/>
            <Cell icon="cluster-o"
                  title="启动参数"
                  label="启动参数，运行时传入的--后的参数"
                  @click="showStartParams"/>
        </CellGroup>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CellGroup, Cell, Row, Col, Icon} from 'vant';

    @Component({
        components: {
            CellGroup,
            Cell,
            Row,
            Col,
            Icon,
        },
    })
    export default class Home extends Vue {

        public showSetting = () => {
            this.$dialog({title: '设置', message: JSON.stringify(Settings)});
        };

        public showStartParams = () => {
            this.$dialog({title: '启动参数', message: JSON.stringify(StartParams)});
        }
    }
</script>

<style lang="less" scoped>
    @import "~@/styles/mixins";

    .banner {
        background: url("~@/assets/banner.jpg") no-repeat;
        background-size: contain;
        height: 53vw;
        display: flex;
        align-items: center;

        .logo {
            display: block;
            height: 60px;
            margin: auto;
        }
    }

    .user {

        &-group {
            margin-bottom: 15px;
        }

        &-links {
            padding: 15px 0;
            font-size: 12px;
            text-align: center;
            background-color: #fff;

            .Icon {
                display: block;
                font-size: 24px;
            }
        }
    }

    .desc {
        font-size: 14px;
        color: @gray-darker;
    }
</style>
