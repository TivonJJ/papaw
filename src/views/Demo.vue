<template>
    <div class="container">
        <div class="group">
            <div class="title">支付图标</div>
            <div class="content">
                <div style="margin: 0 12px">
                    <PaymentIcon code="Alipay"/>&nbsp;
                    <PaymentIcon code="WechatPay"/>&nbsp;
                    <PaymentIcon code="UnionPay_QR"/>
                </div>
            </div>
        </div>

        <div class="group">
            <div class="title">Vant输入框</div>
            <div class="content">
                <CellGroup>
                    <Field
                        required
                        clearable
                        label="用户名"
                        right-icon="question-o"
                        placeholder="请输入用户名"
                    />
                </CellGroup>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CellGroup, Cell, Field} from 'vant';
    import PaymentIcon from '@/components/PaymentIcon';

    @Component({
        components: {
            CellGroup,
            Cell,
            Field,
            PaymentIcon,
        },
    })
    export default class Demo extends Vue {
    }
</script>
<style lang="less" scoped>
    @import "~@/styles/mixins";

    .group{
        margin-bottom: 12px;
    }
    .title{
        padding: 12px;
        border-top: solid 1px @border-color;
    }
    .content{
        padding: 12px 0;
    }
</style>