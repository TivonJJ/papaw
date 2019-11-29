<template>
    <div :type="layout" class="comp-descriptionlist">
        <slot />
    </div>
</template>
<script>
export default {
    props: {
        layout: {
            type: String,
            default: 'flex',
        },
        col: {
            type: Number,
            default: 1,
        },
    },
    provide() {
        return {
            list: this,
        };
    },
};
</script>
<style lang="less">
.comp-descriptionlist {
    flex-flow: row wrap;
    display: flex;
    position: relative;
    box-sizing: border-box;
}
</style>
