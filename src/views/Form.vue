<template>
    <div>
        <div class="header">表单示列</div>
        <CellGroup>
            <Field v-model="form.name"
                   required
                   label="用户名"
                   placeholder="请输入用户名"
            />
            <Field v-model="form.age"
                   label="年龄"
                   type="number"
                   placeholder="真实年龄"
            />
            <Field v-model="form.phone"
                   required
                   label="手机号"
                   type="tel"
                   clearable
                   placeholder="11位手机号"
            />
            <Field
                required
                v-model="form.sms"
                center
                clearable
                label="短信验证码"
                placeholder="请输入短信验证码"
            >
                <Button slot="button" size="small" type="primary">发送验证码</Button>
            </Field>
            <Field label="预定时间" required>
                <DatetimeInput
                    slot="input"
                    clearable
                    v-model="form.bookTime"
                    type="datetime"
                    placeholder="请选择预约时间"
                />
            </Field>
            <Field label="核销密码" required>
                <NumberKeyboardInput
                    slot="input"
                    v-model="form.transPwd"
                    theme="custom"
                    type="password"
                />
            </Field>
            <Field label="预约类型" required>
                <Selector
                    slot="input"
                    :options="types"
                    v-model="form.type"
                />
            </Field>
        </CellGroup>
        <div class="submit">
            <Button type="info" block>提交</Button>
        </div>
    </div>
</template>
<script lang="ts">
import {Component, Vue, Provide} from 'vue-property-decorator';
import {Button, Field, CellGroup, Cell} from 'vant';
import NumberKeyboardInput from '@/components/NumberKeyboardInput.vue';
import DatetimeInput from '@/components/DatetimeInput.vue';
import Selector from '@/components/Selector.vue';

interface Form {
    name?: string;
    age?: number;
    phone?: string;
    sms?: string;
    bookTime?: Date;
    transPwd?: string|number;
    type?: any;
}

@Component({
    components: {
        Button,
        CellGroup,
        Cell,
        Field,
        NumberKeyboardInput,
        DatetimeInput,
        Selector,
    },
})
export default class UserView extends Vue {
    @Provide()
    form: Form = {
        bookTime: new Date(),
        type: 'O02',
    };
    @Provide()
    types: any[] = [{label: '上门服务', value: 'S01'}, {label: '在线服务', value: 'O02'}, {label: '补差服务', value: 'CH001'}];
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
