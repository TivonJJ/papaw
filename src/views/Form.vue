<template>
    <PaForm :model="form" ref="form">
        <div class="header">表单示列</div>
        <CellGroup>
            <PaFormItem
                name="name"
                v-model="form.name"
                label="用户名"
                placeholder="请输入用户名"
                :rule="rules.name"
            />
            <PaFormItem
                name="age"
                v-model="form.age"
                label="年龄"
                type="number"
                placeholder="真实年龄"
                :rule="rules.age"
            />
            <PaFormItem
                name="phone"
                v-model="form.phone"
                label="手机号"
                type="tel"
                clearable
                placeholder="11位手机号"
            />
            <PaFormItem
                name="sms"
                v-model="form.sms"
                center
                clearable
                label="短信验证码"
                placeholder="请输入短信验证码"
            >
                <Button slot="button" size="small" type="primary"
                    >发送验证码</Button
                >
            </PaFormItem>
            <PaFormItem
                v-if="showDate"
                name="bookTime"
                :rule="rules.bookTime"
                label="预定时间"
            >
                <DatetimeInput
                    v-model="form.bookTime"
                    clearable
                    type="datetime"
                    placeholder="请选择预约时间"
                />
            </PaFormItem>
            <PaFormItem label="核销密码" name="transPwd">
                <NumberKeyboardInput
                    v-model="form.transPwd"
                    theme="custom"
                    type="password"
                />
            </PaFormItem>
            <PaFormItem label="预约类型" name="type">
                <Selector :options="types" v-model="form.type" />
            </PaFormItem>
        </CellGroup>
        <div class="submit">
            <Button type="info" block @click="submit">提交</Button>
        </div>
        <div>
            <Button size="mini" @click="showDate = true">动态增加</Button>
            <Button size="mini" @click="showDate = false">动态删除</Button>
        </div>
    </PaForm>
</template>
<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { Button, Field, CellGroup, Cell } from 'vant';
import NumberKeyboardInput from '@/components/NumberKeyboardInput.vue';
import DatetimeInput from '@/components/DatetimeInput.vue';
import Selector from '@/components/Selector.vue';
import PaForm from '@/components/PaForm/Form.vue';
import PaFormItem from '@/components/PaForm/FormItem.vue';

interface Form {
    name?: string;
    age?: number;
    phone?: string;
    sms?: string;
    bookTime?: Date;
    transPwd?: string | number;
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
        PaForm,
        PaFormItem,
    },
})
export default class FormView extends Vue {
    @Provide()
    form: Form = {
        bookTime: undefined,
        type: 'O02',
    };
    @Provide()
    showDate: boolean = true;
    @Provide()
    rules: object = {
        name: { required: true, message: '用户名不能为空' },
        age: [
            { required: true, message: '年龄不能为空' },
            {
                type: 'number',
                min: 18,
                transform: (val: string) => +val,
                message: '只允许18岁及以上的人群',
            },
        ],
        bookTime: { required: true, message: '预定时间不能为空' },
    };
    @Provide()
    fixedRules: object = {
        transPwd: { required: true, message: '核销密码不能为空' },
    };
    @Provide()
    types: any[] = [
        { label: '上门服务', value: 'S01' },
        { label: '在线服务', value: 'O02' },
        { label: '补差服务', value: 'CH001' },
    ];

    submit() {
        const form: any = this.$refs.form;
        form.validate((valid: boolean) => {
            if (!valid) {
                this.$toast.fail('验证不通过');
                return;
            }
            this.$toast.success('验证通过，开始提交');
        });
    }
}
</script>
<style lang="less" scoped>
.header {
    background: #fff;
    font-size: 16px;
    text-align: center;
    padding: 12px;
    margin-bottom: 16px;
}

.submit {
    margin: 12px;
}
</style>
