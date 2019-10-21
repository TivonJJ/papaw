<template>
    <span
        class="comp-payment_icon_item"
        :style="iconStyle"
        :class="{
            'comp-payment_icon_empty': !iconPos,
            'comp-payment_icon_grey': grey,
        }"
    >
        <Icon
            name="question-o"
            class="comp-payment_icon_notfount"
            v-if="!iconPos"
            :style="{ fontSize: size + 'px' }"
        />
    </span>
</template>
<script lang="ts">
import { Icon } from 'vant';
import { Component, Prop, Vue } from 'vue-property-decorator';

const ICON_POS_ARRAY = [
    [
        'CashPay',
        'Alipay',
        'WechatPay',
        'UnionPay_QR',
        'UnionPay',
        'Visa',
        'Mastercard',
        'JCB',
        'DinersClub',
        'AmericanExpress',
    ],
];
const CODE_POS_MAP = (() => {
    const map: any = {};
    ICON_POS_ARRAY.forEach((row, y) => {
        row.forEach((item, x) => {
            map[item] = [x, y];
        });
    });
    return map;
})();

@Component({
    components: { Icon },
})
export default class PaymentIcon extends Vue {
    @Prop({ required: true })
    public code!: string;
    @Prop({ default: 28 })
    public size: number | string = 28;
    public grey: boolean = false;

    get iconPos() {
        const iconPosition = CODE_POS_MAP[this.code];
        if (iconPosition) {
            const x = -(iconPosition[0] * this.size);
            const y = -(iconPosition[1] * this.size);
            return { x, y };
        }
        return null;
    }

    get iconStyle() {
        let size = this.size;
        if (typeof size === 'number') {
            size = size + 'px';
        }
        const style: any = {
            width: size,
            height: size,
        };
        if (this.iconPos) {
            style.backgroundPosition = `${this.iconPos.x}px ${this.iconPos.y}px`;
        }
        return style;
    }
}
</script>
<style lang="less">
@import '~@/styles/vars';

.comp-payment_icon_item {
    display: inline-block;
    width: 36px;
    height: 36px;
    background: url('~@/assets/payment-icon.png') no-repeat;
    background-size: cover;
    vertical-align: baseline;
    line-height: 1;
    &.comp-payment_icon_empty {
        background: none;
    }
    &.comp-payment_icon_grey {
        filter: grayscale(1);
        opacity: 0.3;
    }
    .comp-payment_icon_notfount {
        color: @red;
    }
}
</style>
