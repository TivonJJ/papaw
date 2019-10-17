<template>
    <div class="text-center gutter-lg">
        <div v-if="currentUser">
            <div>ID： {{ currentUser.id }}</div>
            <div>姓名： {{ currentUser.name }}</div>
            <Button @click="logout">退出登录</Button>
        </div>
        <Button
            v-else
            :loading="loading"
            loading-text="登录中"
            @click="login"
            type="primary"
        >
            模拟登陆一个用户
        </Button>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { Button, Toast } from 'vant';
import { mapGetters } from 'vuex';
import { UserModel } from '@/store/modules/user';

@Component({
    components: {
        Button,
    },
    computed: mapGetters(['currentUser']),
})
export default class UserView extends Vue {
    currentUser?: UserModel;
    @Provide()
    loading: boolean = false;

    login() {
        this.loading = true;
        this.$store
            .dispatch('user/login', {
                username: 'demo',
                password: '123456',
            })
            .then(
                () => {
                    console.log('login success');
                },
                err => {
                    Toast('登录失败：' + err.message);
                    console.error(err);
                },
            )
            .finally(() => {
                this.loading = false;
            });
    }

    logout() {
        this.$store.dispatch('user/logout').then(
            () => {
                Toast('退出成功');
            },
            () => {
                Toast('哎呀,失败了');
            },
        );
    }
}
</script>
