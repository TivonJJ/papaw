<template>
    <div>
        <input
            :placeholder="placeholder"
            class="van-field__control"
            readonly
            :value="label"
            @click.stop="showPicker"
        />
        <Popup v-model="pickerVisible" position="bottom">
            <Picker
                show-toolbar
                ref="picker"
                @cancel="hidePicker"
                @confirm="onConfirm"
                :columns="options"
                value-key="label"
                :default-index="valueIndex"
            />
        </Popup>
    </div>
</template>

<script lang="ts">
import { Picker, Popup } from 'vant';
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

export interface Option {
    label: any;
    value: any;
}

@Component({
    components: {
        Popup,
        Picker,
    },
})
export default class Selector extends Vue {
    @Prop({ type: Array, default: [] })
    options?: Option[];
    @Prop()
    value?: any;
    @Prop()
    placeholder?: string;
    @Provide()
    pickerVisible: boolean = false;
    @Provide()
    currentValue: any = null;

    @Watch('value')
    valueChange(value: any) {
        this.currentValue = value;
    }

    created() {
        this.currentValue = this.value || null;
    }

    get valueIndex() {
        if (!this.currentValue || !this.options) {
            return 0;
        }
        return this.options.findIndex(item => item.value === this.currentValue);
    }

    get label() {
        if (!this.currentValue || !this.options) {
            return '';
        }
        const item = this.options.find(
            ({ value }) => value === this.currentValue,
        );
        return item ? item.label : '';
    }

    showPicker() {
        this.pickerVisible = true;
    }

    hidePicker() {
        this.pickerVisible = false;
    }

    onConfirm(item: any, index: number) {
        this.$emit('input', item.value);
        this.$emit('change', item, index);
        this.currentValue = item.value;
        this.hidePicker();
    }
}
</script>
