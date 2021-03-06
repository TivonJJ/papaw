<template>
    <Field
        ref="field"
        :value="value"
        :label="label"
        :placeholder="placeholder"
        :icon="icon"
        :size="size"
        :center="center"
        :is-link="isLink"
        :required="isRequired"
        :clickable="clickable"
        :titleStyle="titleStyle"
        :titleClass="titleClass"
        :valueClass="valueClass"
        :title="title"
        :arrow-direction="arrowDirection"
        :border="border"
        :error="!!currentError"
        :error-message="currentError"
        :error-message-align="errorMessageAlign"
        :readonly="readonly"
        :disabled="disabled"
        :autosize="autosize"
        :autofocus="autofocus"
        :left-icon="leftIcon"
        :right-icon="rightIcon"
        :clearable="clearable"
        :label-class="labelClass"
        :label-width="labelWidth"
        :label-align="labelAlign"
        :input-align="inputAlign"
        :maxlength="maxlength"
        :type="type"
        @click="_throwEvent('click', $event)"
        @change="_throwEvent('change', $event)"
        @input="_throwEvent('input', $event)"
        @focus="_throwEvent('focus', $event)"
        @blur="_throwEvent('blur', $event)"
        @clear="_throwEvent('clear', $event)"
        @click-left-icon="_throwEvent('click-left-icon', $event)"
        @click-right-icon="_throwEvent('click-right-icon', $event)"
        class="pa-form-item"
    >
        <slot name="label" slot="label" />
        <slot slot="input" />
        <slot name="left-icon" slot="left-icon" />
        <slot name="right-icon" slot="right-icon" />
        <slot name="button" slot="button" />
    </Field>
</template>

<script>
import { Field } from 'vant';

export default {
    name: 'PaFormItem',
    props: {
        name: {
            type: String,
            required: true,
        },
        placeholder: String,
        disabled: Boolean,
        readonly: Boolean,
        icon: String,
        size: String,
        center: Boolean,
        isLink: Boolean,
        required: {
            type: Boolean,
            default: undefined,
        },
        clickable: Boolean,
        titleStyle: null,
        titleClass: null,
        valueClass: null,
        title: [Number, String],
        value: [Number, String],
        label: [Number, String],
        arrowDirection: String,
        border: {
            type: Boolean,
            default: true,
        },
        error: Boolean,
        autosize: [Boolean, Object],
        autofocus: Boolean,
        leftIcon: String,
        rightIcon: String,
        clearable: Boolean,
        labelClass: null,
        labelWidth: [Number, String],
        labelAlign: String,
        inputAlign: String,
        errorMessage: String,
        errorMessageAlign: String,
        type: {
            type: String,
            default: 'text',
        },
        maxlength: [Number, String],
        rules: null,
        clearOnDestroy: {
            type: Boolean,
            default: true,
        },
    },
    components: { Field },
    inject: [
        '$errors',
        '$rulesMap',
        '$watchChange',
        '$addRule',
        '$removeRule',
        '$setValue',
        '$removeProperty',
    ],

    computed: {
        currentError() {
            if (this.errorMessage) {
                return this.errorMessage;
            }
            const errors = this.$errors();
            if (!errors || !this.name) {
                return '';
            }
            const error = errors[this.name];
            if (error && error.length > 0 && error[0]) {
                return error[0].message;
            }
            return '';
        },
        isRequired() {
            if (this.required !== undefined) {
                return this.required;
            }
            const rulesMap = this.$rulesMap() || {};
            const rules = rulesMap[this.name];
            if (rules) {
                if (Array.isArray(rules)) {
                    return rules.some(item => item.required === true);
                } else {
                    return rules.required === true;
                }
            }
            return false;
        },
    },

    created() {
        if (this.rules) {
            this.$addRule(this.name, this.rules);
        }
    },

    mounted() {
        if (this.name) {
            this.cancelChangeWatcher = this.$watchChange(this.name);
        }
    },

    beforeDestroy() {
        if (this.clearOnDestroy) {
            this.$removeProperty(this.name);
        }
    },

    destroyed() {
        if (this.cancelChangeWatcher) {
            this.cancelChangeWatcher();
        }
        if (this.rules) {
            this.$removeRule(this.name, this.rules);
        }
    },

    methods: {
        focus() {
            this.$refs.field.focus();
            this.$emit('focus');
        },
        blur() {
            this.$refs.field.blur();
            this.$emit('blur');
        },
        _throwEvent(type, event) {
            this.$emit(type, event);
        },
    },
};
</script>

<style scoped></style>
