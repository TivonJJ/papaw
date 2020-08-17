<template>
    <span>{{ formattedDate }}</span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class DateFormat extends Vue {
    @Prop()
    public date?: string | Date | number;
    @Prop({ default: 'YYYY-MM-DD HH:mm:ss' })
    public format?: string;

    public get formattedDate() {
        if (!this.date) {
            return '';
        }
        return moment(this.date).format(this.format);
    }
}
</script>
