<template>
    <div style="padding: 10px">
        <Button @click="getDeviceInfo">获取设备信息</Button>
        <div>{{ deviceInfo }}</div>
    </div>
</template>

<script>
import { Button } from 'vant';
import lightGo from '@/utils/lightGo';
export default {
    components: {
        Button,
    },
    data() {
        return {
            deviceInfo: '',
        };
    },
    methods: {
        getDeviceInfo() {
            lightGo.getDeviceInfo().then(
                data => {
                    this.deviceInfo = JSON.stringify(data);
                    console.log(data);
                },
                err => {
                    console.log(err);
                    this.deviceInfo = err.message;
                },
            );
        },
    },
};
</script>
