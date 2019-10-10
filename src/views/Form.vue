<template>
    <div>
        <div class="header">表单示列</div>
        <CellGroup>
            <Field v-model="form.name"
                   label="用户名"
                   placeholder="请输入用户名"
            />
            <Field v-model="form.age"
                   label="年龄"
                   type="number"
                   placeholder="真实年龄"
            />
            <Field v-model="form.phone"
                   label="手机号"
                   type="tel"
                   clearable
                   placeholder="11位手机号"
            />
            <Field
                v-model="form.sms"
                center
                clearable
                label="短信验证码"
                placeholder="请输入短信验证码"
            >
                <Button slot="button" size="small" type="primary">发送验证码</Button>
            </Field>
            <DateTimePickerField
                label="预定时间"
                v-model="form.bookTime"
                type="datetime"
                placeholder="请选择预约时间"
            />
        </CellGroup>
        <div class="submit">
            <Button type="info" block>提交</Button>
        </div>
    </div>
</template>
<script lang="ts">
import {Component, Vue, Provide} from 'vue-property-decorator';
import {Button, Field, CellGroup, Cell} from 'vant';
import NumberKeyboardField from '@/components/NumberKeyboardField.vue';
import DateTimePickerField from '@/components/DateTimePickerField.vue';

interface Form {
    name?: string;
    age?: number;
    phone?: string;
    sms?: string;
    bookTime?: Date;
}

@Component({
    components: {
        Button,
        CellGroup,
        Cell,
        Field,
        NumberKeyboardField,
        DateTimePickerField,
    },
})
export default class UserView extends Vue {
    @Provide()
    form: Form = {
        bookTime: new Date(),
    };
}
</script>
<style lang="less" scoped>
    .header{
        background: #fff;
        font-size: 16px;
        text-align: center;
        padding: 12px;
        margin-bottom: 16px;
    }
    .submit{
        margin: 12px;
    }
</style>
