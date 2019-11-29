<template>
    <div class="pa-spin">
        <div v-if="busy" class="pa-spin-nested-loading" :style="{ color }">
            <Loading
                :type="type"
                :color="color"
                :size="size"
                :text-size="textSize"
                :vertical="vertical"
                class="pa-spin-loading"
            >
                <slot name="text">{{ text }}</slot>
            </Loading>
        </div>
        <div class="pa-spin-container" :class="{ 'pa-spin-blur': busy }">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { Loading } from 'vant';
import { isPromise } from '@/utils';

@Component({
    components: {
        Loading,
    },
})
export default class Selector extends Vue {
    @Prop({ type: [Boolean, Promise], default: true })
    spinning?: boolean | Promise<any>;
    @Prop()
    type?: string;
    @Prop({ type: String, default: '#1989fa' })
    color?: string;
    @Prop()
    size?: string | number;
    @Prop()
    text?: string;
    @Prop()
    textSize?: string | number;
    @Prop({ type: Boolean, default: true })
    vertical?: boolean = true;
    @Provide()
    private busy: boolean = false;

    @Watch('spinning')
    onSpinningChange(spinning: boolean | Promise<any>) {
        this.syncSpin2Busy(spinning);
    }

    created() {
        this.syncSpin2Busy(this.spinning || false);
    }

    syncSpin2Busy(spinning: boolean | Promise<any>) {
        if (typeof spinning === 'boolean') {
            this.busy = spinning;
        } else if (isPromise(spinning)) {
            this.busy = true;
            spinning.then(
                () => {
                    this.busy = false;
                },
                () => {
                    this.busy = false;
                },
            );
        } else {
            console.error('Type error on spinning property');
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/vars';
.pa-spin {
    position: relative;
}
.pa-spin-nested-loading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    display: block;
    width: 100%;
    height: 100%;
    max-height: 400px;
}
.pa-spin-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    .van-loading__text {
        color: inherit;
    }
}
.pa-spin-container {
    position: relative;
    transition: opacity 0.3s;
}
.pa-spin-blur {
    clear: both;
    overflow: hidden;
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
}
</style>
