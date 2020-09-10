<template>
    <div class="result-container" :class="'status_' + status">
        <van-icon class="icon" :style="{ color }" :name="computedIcon" />
        <div class="title">
            <slot name="title">{{ title }}</slot>
        </div>
        <div class="description">
            <slot name="description">{{ description }}</slot>
        </div>
        <div class="actions">
            <slot name="actions">
                <template v-if="actions">
                    <van-button
                        v-for="action of actions"
                        :key="action.name"
                        :type="action.type"
                        :size="action.size"
                        @click="action.onclick"
                    >
                        {{ action.name }}
                    </van-button>
                </template>
            </slot>
        </div>
    </div>
</template>

<script>
import { Icon, Button } from 'vant';

export default {
    name: 'Result',
    components: { [Icon.name]: Icon, [Button.name]: Button },
    props: {
        status: {
            type: String,
            default: 'info',
        },
        icon: String,
        title: String,
        description: String,
        color: String,
        actions: Array,
    },
    computed: {
        computedIcon() {
            if (this.icon) return this.icon;
            return {
                info: 'info',
                success: 'checked',
                warning: 'warning',
                error: 'clear',
            }[this.status];
        },
    },
};
</script>

<style lang="less" scoped>
@import '~@/styles/vars';
.result-container {
    text-align: center;
    padding: @design-gutter_lg 0;
    &.status_success .icon {
        color: @success-color;
    }
    &.status_warning .icon {
        color: @warning-color;
    }
    &.status_error .icon {
        color: @danger-color;
    }
    .icon {
        font-size: 60px;
        color: @blue;
    }
    .title {
        font-size: 20px;
        margin-bottom: @design-gutter;
    }
    .description {
        color: @gray-6;
        font-size: 14px;
    }
}
</style>
