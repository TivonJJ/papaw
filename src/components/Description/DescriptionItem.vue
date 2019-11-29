<template>
    <div
        class="description-item_container"
        :style="{ width: (span / 24) * 100 + '%' }"
    >
        <label class="left"
            ><slot name="term">{{ term }}</slot></label
        >
        <span class="right"><slot /></span>
    </div>
</template>
<script>
export default {
    props: {
        term: {
            type: String,
        },
    },
    inject: ['list'],
    computed: {
        span() {
            const col = this.list.col || 3;
            return 24 / col;
        },
    },
};
</script>
<style lang="less">
.description-item_container {
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    > .left {
        line-height: 22px;
        margin-right: 8px;
        color: rgba(0, 0, 0, 0.85);
        white-space: nowrap;
        display: table-cell;
        font-weight: normal;
        &:after {
            content: ':';
            margin: 0 8px 0 2px;
            position: relative;
            top: -0.5px;
        }
    }
    > .right {
        line-height: 22px;
        width: 100%;
        color: rgba(0, 0, 0, 0.65);
        display: table-cell;
    }
}
</style>
