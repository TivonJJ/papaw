<template>
    <span>
        <label class="unit">{{ unit }}</label
        >{{ amount }}
    </span>
</template>

<script>
export default {
    name: 'Amount',
    props: {
        value: [Number, String],
        isFen: {
            type: Boolean,
            default: false,
        },
        precision: {
            type: Number,
            default: 2,
        },
        unit: {
            type: String,
        },
    },
    computed: {
        amount() {
            if (isNaN(this.value)) {
                return '';
            }
            let value = this.value || 0;
            if (this.isFen) {
                value = value / 100;
            }
            return (+value).toFixed(this.precision);
        },
    },
};
</script>

<style lang="less" scoped>
.unit {
    font-size: 60%;
}
</style>
