<template>
    <div>
        <div v-if="type==='v-password'" class="comp-nkbi-password-input">
            <PasswordInput
                style="margin: 0"
                :value="currentValue"
                :info="placeholder"
                :focused="keyboardVisible"
                :mask="mask"
                :gutter="gutter"
                @focus="showKeyboard"
            />
        </div>
        <template v-else>
            <input :placeholder="placeholder"
                   class="van-field__control"
                   :value="currentValue"
                   :type="type"
                   readonly
                   @touchstart.stop="showKeyboard"
            />
        </template>
        <NumberKeyboard
            ref="numberKeyboard"
            :show="keyboardVisible"
            :extra-key="extraKey"
            :theme="theme"
            :title="title"
            :maxlength="maxlength"
            :transition="transition"
            :z-index="zIndex"
            :close-button-text="closeButtonText"
            :delete-button-text="deleteButtonText"
            :show-delete-key="showDeleteKey"
            :hide-on-click-outside="hideOnClickOutside"
            :safe-area-inset-bottom="safeAreaInsetBottom"
            close-button-text="完成"
            v-model="_value"
            @input="onInput"
            @blur="onBlur"
            @delete="onDelete"
            @close="onClose"
            @show="onShow"
            @hide="onHide"
        />
    </div>
</template>
<script lang="ts">
import {Component, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
import {NumberKeyboard, PasswordInput} from 'vant';

@Component({
    components: {
        PasswordInput,
        NumberKeyboard,
    },
})
export default class NumberKeyboardInput extends Vue {
    @Prop()
    type?: string;
    @Prop({type: Boolean, default: true})
    mask?: boolean;
    @Prop()
    gutter?: number|string;
    @Prop()
    value?: string | number;
    @Prop()
    placeholder?: string;
    @Prop({default: '.'})
    extraKey?: string;
    @Prop({default: 'custom'})
    theme?: string;
    @Prop()
    title?: string;
    @Prop()
    maxlength?: number|string;
    @Prop({type: Boolean, default: true})
    transition?: boolean;
    @Prop()
    zIndex?: number;
    @Prop({default: '确定'})
    closeButtonText?: string;
    @Prop()
    deleteButtonText?: string;
    @Prop({type: Boolean, default: true})
    showDeleteKey?: boolean;
    @Prop({type: Boolean, default: true})
    hideOnClickOutside?: boolean;
    @Prop({type: Boolean, default: true})
    safeAreaInsetBottom?: boolean;
    @Provide()
    keyboardVisible: boolean = false;
    @Provide()
    currentValue: string | number = '';

    @Watch('value')
    valueChange(value: any) {
        this.currentValue = value;
    }

    created() {
        this.currentValue = this.value || '';
    }

    get _value() {
        return this.currentValue;
    }

    set _value(value: any) {
        this.currentValue = value;
        this.$emit('input', value);
    }

    showKeyboard() {
        this.keyboardVisible = true;
    }

    hideKeyboard() {
        this.keyboardVisible = false;
    }

    onBlur(...args: any) {
        this.hideKeyboard();
        this.$emit('blur', ...args);
    }

    onInput(...args: any) {
        this.$emit('input', ...args);
    }

    onDelete(...args: any) {
        this.$emit('delete', ...args);
    }

    onClose(...args: any) {
        this.$emit('close', ...args);
    }

    onShow(...args: any) {
        this.$emit('show', ...args);
    }

    onHide(...args: any) {
        this.$emit('hide', ...args);
    }
}
</script>
<style lang="less">
    .comp-nkbi-password-input .van-password-input{
        margin-left: 0;
        margin-right: 0;
    }
</style>
