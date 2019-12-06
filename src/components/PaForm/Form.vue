<template>
    <form @submit.prevent="submit" @reset="onReset" ref="form">
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
            childRules: {},
        };
    },

    props: {
        model: {
            type: Object,
        },
        rules: {
            type: Object,
            default: () => {},
        },
    },

    created() {
        if (this.rules && !this.model) {
            throw new Error('If use validate rules, The model is required');
        }
    },

    provide() {
        return {
            $rules: () => this.getValidatorRules(),
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
                this.childRules[name] = rule;
            },
            $removeRule: name => {
                this.childRules[name] = undefined;
                delete this.childRules[name];
            },
            $setValue: (name, value) => {
                if (this.model) {
                    this.model[name] = value;
                }
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
            return { ...this.rules, ...this.childRules };
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

<style scoped></style>
