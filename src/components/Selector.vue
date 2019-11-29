<template>
    <div>
        <input
            :placeholder="placeholder"
            class="van-field__control"
            readonly
            :value="label"
            @click.stop="showPicker"
        />
        <Popup v-model="pickerVisible" position="bottom" get-container="body">
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
    @Prop()
    optionKey?: any;
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
        const found: any = this.findItemByValue(this.currentValue);
        return found ? found.index : 0;
    }

    get label() {
        const found: any = this.findItemByValue(this.currentValue);
        return found ? found.item.label : '';
    }

    findItemByValue(value: any) {
        if (!value || !this.options) {
            return null;
        }
        for (let i = 0; i < this.options.length; i++) {
            const item: any = this.options[i];
            if (this.optionKey) {
                if (item.value[this.optionKey] === value[this.optionKey]) {
                    return { item, index: i };
                }
            } else {
                if (item.value === value) {
                    return { item, index: i };
                }
            }
        }
        return null;
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
