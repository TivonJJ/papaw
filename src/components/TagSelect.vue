<template>
    <div class="tag-select">
        <div
            class="tag-item"
            v-for="(item, index) in options"
            :key="index"
            :class="{ selected: item.value === value }"
            @click="select(item)"
        >
            {{ item.label }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: null,
        options: {
            type: Array,
            default: () => [],
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        select(item) {
            if (item.value === this.value) return;
            this.$emit('input', item.value);
        },
    },
};
</script>

<style lang="less" scoped>
@import '~@/styles/vars';

.tag-item {
    position: relative;
    overflow: hidden;
    background-color: #ebebeb;
    display: inline-block;
    padding: 4px 16px;
    font-size: 12px;
    color: #323233;
    border: 1px solid #ebebeb;
    border-radius: 12px;
    box-sizing: border-box;
    white-space: nowrap;
}
.tag-item:not(:last-child) {
    margin-right: 12px;
}
.tag-item.selected {
    color: @white;
    border-color: @primary-color;
    background-color: @primary-color;
}
</style>
