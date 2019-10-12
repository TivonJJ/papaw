<template>
    <form
        @submit.prevent="submit"
        @reset="onReset"
        ref="form"
    >
        <slot/>
    </form>
</template>

<script>
    import Validator from 'async-validator';

    export default {
        name: "PaForm",

        data(){
            return {
                validated: false,
                errors: null
            }
        },

        props:{
            value:{
                type:Object
            },
            rules:{
                type:Object
            }
        },

        provide() {
            return {
                $rules: this.rules,
                $errors: ()=>this.errors,
                $watchChange:(key)=>{
                    return this.$watch(`value.${key}`,(newVal)=>{
                        this.$emit('change',newVal,this.value);
                        this._itemChangeValidate(key);
                    });
                }
            }
        },

        methods:{
            submit(event){
                this.$emit('submit',event);
            },
            reset(){
                this.$refs.form.reset();
            },
            onReset(event){
                this.$emit('reset',event);
            },
            validate(callback){
                console.log(this.rules)
                this.validated = true;
                const validator = new Validator(this.rules);
                return validator.validate(this.value,(errors, fields)=>{
                    this.errors = fields;
                    if(callback){
                        callback(!!errors, fields);
                    }
                });
            },
            _itemChangeValidate(name){
                if(!this.validated)return;
                if(!this.rules || !this.rules[name]){
                    this.errors = null;
                    return;
                }
                const validator = new Validator({[name]:this.rules[name]});
                validator.validate({[name]:this.value[name]},(errors, fields)=>{
                    const temp_errors = {...this.errors};
                    if(fields){
                        temp_errors[name] = fields[name];
                    }else {
                        delete temp_errors[name];
                    }
                    this.errors = temp_errors;
                })
            }
        }
    }
</script>

<style scoped>

</style>
