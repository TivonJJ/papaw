<template>
    <div>
        <div class="van-field__body">
            <input
                :placeholder="placeholder"
                class="van-field__control"
                :value="formattedValue"
                readonly
                @click="showPicker"
            />
            <Icon
                v-if="clearButtonVisible"
                @click.stop="clear"
                name="clear"
                class="van-field__clear"
            />
        </div>
        <Popup v-model="pickerVisible" position="bottom">
            <DatetimePicker
                v-model="currentPickerDate"
                :type="type"
                :title="title"
                :formatter="formatter"
                :filter="filter"
                :min-date="minDate"
                :max-date="maxDate"
                :min-hour="minHour"
                :max-hour="maxHour"
                :min-minute="minMinute"
                :max-minute="maxMinute"
                :confirm-button-text="confirmButtonText"
                :cancel-button-text="cancelButtonText"
                :visible-item-count="visibleItemCount"
                show-toolbar
                @cancel="onCancel"
                @confirm="onConfirm"
                @change="onChange"
            />
        </Popup>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { DatetimePicker, Popup, Icon } from 'vant';
import moment from 'moment';

@Component({
    components: {
        DatetimePicker,
        Popup,
        Icon,
    },
})
export default class DatetimeInput extends Vue {
    @Prop()
    placeholder?: string;
    @Prop({ default: false, type: Boolean })
    clearable?: boolean;
    @Prop()
    value?: Date | string;
    @Prop()
    defaultDate?: Date;
    @Prop()
    formatter?: (type: string, value: any) => any;
    @Prop()
    filter?: (type: string, values: any) => any;
    @Prop()
    format?: string;
    @Prop()
    title?: string;
    @Prop({ default: 'datetime' })
    type?: string;
    @Prop()
    minDate?: Date;
    @Prop()
    maxDate?: Date;
    @Prop()
    minHour?: number;
    @Prop()
    maxHour?: number;
    @Prop()
    minMinute?: number;
    @Prop()
    maxMinute?: number;
    @Prop()
    confirmButtonText?: string;
    @Prop()
    cancelButtonText?: string;
    @Prop()
    visibleItemCount?: number;
    @Provide()
    currentPickerDate: Date | string = '';
    @Provide()
    currentValue: Date | string = '';
    @Provide()
    pickerVisible: boolean = false;

    @Watch('value')
    valueChange(value: Date | string) {
        this.currentValue = value;
        this.currentPickerDate = value;
    }

    created() {
        const date = this.value || this.defaultDate;
        if (date) {
            this.currentValue = this.currentPickerDate = date;
        }
    }

    showPicker() {
        this.pickerVisible = true;
    }

    hidePicker() {
        this.pickerVisible = false;
    }

    onChange(picker: any) {
        this.$emit('touch', picker);
    }

    onConfirm(value: Date | string) {
        this.changeValue(value);
        this.hidePicker();
    }

    onCancel() {
        this.hidePicker();
        this.$emit('cancel');
    }

    clear() {
        this.changeValue('');
    }

    changeValue(value: Date | string) {
        this.$emit('input', value);
        this.$emit('change', value);
        this.currentValue = value;
    }

    getDefaultFormat() {
        switch (this.type) {
            case 'date':
                return 'YYYY-MM-DD';
            case 'year-month':
                return 'YYYY-MM';
            case 'datetime':
                return 'YYYY-MM-DD HH:mm';
        }
    }

    get formattedValue() {
        const { currentValue: value } = this;
        if (!value) {
            return '';
        }
        if (this.type === 'time') {
            return value;
        }
        let { format } = this;
        if (!format) {
            format = this.getDefaultFormat();
        }
        return moment(value).format(format);
    }

    get clearButtonVisible() {
        return this.clearable && !!this.currentValue;
    }
}
</script>
