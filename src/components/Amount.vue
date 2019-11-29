<template>
    <span>
        {{ amount }}
    </span>
</template>

<script>
export default {
    name: 'Amount',
    props: {
        value: Number,
        isFen: {
            type: Boolean,
            default: true,
        },
        precision: {
            type: Number,
            default: 2,
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
            return value.toFixed(this.precision);
        },
    },
};
</script>

<style scoped></style>
