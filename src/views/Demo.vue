<template>
    <div class="container">
        <div class="group">
            <div class="title">支付图标</div>
            <div class="content margin">
                <PaymentIcon code="Alipay" />&nbsp;
                <PaymentIcon code="WechatPay" />&nbsp;
                <PaymentIcon code="UnionPay_QR" />
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

        <div class="group">
            <div class="title">Vant按钮</div>
            <div class="content margin buttons">
                <Button type="default">默认按钮</Button>
                <Button type="primary">主要按钮</Button>
                <Button type="info">信息按钮</Button>
                <Button type="warning">警告按钮</Button>
                <Button type="danger">危险按钮</Button>
                <Button plain type="primary">朴素按钮</Button>
                <Button plain type="info">朴素按钮</Button>
                <Button plain hairline type="primary">细边框按钮</Button>
                <Button plain hairline type="info">细边框按钮</Button>
                <Button loading type="primary" />
            </div>
        </div>

        <div class="group">
            <div class="title">Vant 图标</div>
            <div class="content margin icons">
                <Icon name="close" color="red" />
                <Icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
                <Icon name="chat" dot color="blue" />
                <Icon name="chat" info="9" />
                <Icon name="chat" info="99+" size="30px" />
            </div>
        </div>

        <div class="group">
            <div class="title">预置CSS类</div>
            <div class="content margin">
                <div class="text-primary">主要颜色文字</div>
                <div class="text-primary">成功颜色文字</div>
                <div class="text-danger">错误颜色文字</div>
                <div class="text-warning">警告颜色文字</div>
                <div class="text-muted">灰色辅助文字</div>
                <div class="text-lg">大文字</div>
                <div class="text-sm">小文字</div>
                <div class="text-xs">超小文字</div>
                <div class="pull-left">左浮动</div>
                <div class="pull-right">右浮动</div>
            </div>
        </div>

        <div class="group">
            <div class="title">时间格式化</div>
            <div class="content margin">
                <DateFormat :date="date" format="YYYY年MM月DD日 HH:mm:ss" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { CellGroup, Cell, Field, Button, Icon } from 'vant';
import PaymentIcon from '@/components/PaymentIcon.vue';
import DateFormat from '@/components/DateFormat.vue';

@Component({
    components: {
        CellGroup,
        Cell,
        Field,
        PaymentIcon,
        Button,
        Icon,
        DateFormat,
    },
})
export default class Demo extends Vue {
    interval?: number = undefined;

    @Provide() date: number = Date.now();

    public mounted() {
        this.interval = setInterval(() => {
            this.date = Date.now();
        }, 1000);
    }

    public beforeDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}
</script>
<style lang="less" scoped>
@import '~@/styles/vars';

.group {
    margin-bottom: 12px;
}

.title {
    padding: 12px;
    border-top: solid 1px @border-color;
    font-weight: bold;
}

.content {
    padding: 12px 0;

    &.margin {
        margin: 0 12px;
    }
}

.buttons button {
    margin-right: 8px;
    margin-bottom: 8px;
}

.icons .van-icon {
    margin-right: 8px;
    margin-bottom: 8px;
    font-size: 20px;
}
</style>
