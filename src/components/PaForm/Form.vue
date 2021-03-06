<template>
    <form
        @submit.prevent="submit"
        @reset="onReset"
        ref="form"
        class="pa-form"
        :class="{ 'required-mark': showRequiredMark }"
    >
        <slot />
    </form>
</template>

<script>
import Validator from 'async-validator';

export default {
    name: 'PaForm',

    data() {
        return {
            errors: null,
            rules: {},
        };
    },

    props: {
        model: {
            type: Object,
        },
        showRequiredMark: {
            type: Boolean,
            default: false,
        },
    },

    created() {
        if (this.rules && !this.model) {
            throw new Error('If use validate rules, The model is required');
        }
    },

    provide() {
        return {
            $rulesMap: () => this.getValidatorRules(),
            $errors: () => this.errors,
            $watchChange: key => {
                return this.$watch(`model.${key}`, (newVal, oldVal) => {
                    if (newVal === oldVal) return;
                    this.$emit('change', newVal, this.model);
                    this.validateField(key);
                });
            },
            $addRule: (name, rule) => {
                if (!this.model) {
                    throw new Error(
                        'If use validate rules, The model is required',
                    );
                }
                this.rules[name] = rule;
            },
            $removeRule: name => {
                this.rules[name] = undefined;
                delete this.rules[name];
            },
            $setValue: (name, value) => {
                if (this.model) {
                    this.model[name] = value;
                }
            },
            $removeProperty: name => {
                delete this.model[name];
            },
        };
    },

    methods: {
        submit(event) {
            this.$emit('submit', event);
        },
        reset() {
            this.$refs.form.reset();
            this.errors = null;
        },
        onReset(event) {
            this.$emit('reset', event);
        },
        getValidatorRules() {
            return { ...this.rules };
        },
        validate(callback) {
            const validator = new Validator(this.getValidatorRules());
            return validator.validate(this.model, (errors, fields) => {
                this.errors = fields;
                if (callback) {
                    callback(!errors, fields);
                }
            });
        },
        validateField(props, callback) {
            const validatorRules = this.getValidatorRules();
            const validate = (name, callback) => {
                if (!validatorRules[name]) {
                    if (this.errors) {
                        this.errors[name] = undefined;
                        delete this.errors[name];
                    }
                    return;
                }
                const validator = new Validator({
                    [name]: validatorRules[name],
                });
                validator.validate(
                    { [name]: this.model[name] },
                    (errors, fields) => {
                        const temp_errors = { ...this.errors };
                        if (fields) {
                            temp_errors[name] = fields[name];
                        } else {
                            delete temp_errors[name];
                        }
                        if (callback) {
                            callback(temp_errors[name]);
                        }
                        this.errors = temp_errors;
                    },
                );
            };
            if (Array.isArray(props)) {
                props.forEach(name => {
                    validate(name, callback);
                });
            } else {
                validate(props, callback);
            }
        },
    },
};
</script>

<style>
.pa-form:not(.required-mark) .pa-form-item:before {
    display: none;
}
</style>
