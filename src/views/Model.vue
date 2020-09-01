<template>
    <div>
        <div>{{ count }}</div>
        <Button @click="increment">增加</Button>
        <Button @click="decrement">减少</Button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button } from 'vant';
import { mapState } from 'vuex';

@Component({
    components: {
        Button,
    },
    computed: {
        ...mapState({
            count: (state: any) => state.demo.count,
        }),
        // count() {
        //     return this.$store.state.demo.count;
        // },
    },
})
export default class ModelView extends Vue {
    public name = 'model';
    count?: number;

    increment() {
        this.$store.dispatch('demo/increment', 1);
    }

    decrement() {
        this.$store.dispatch('demo/decrement', 1);
    }
}
</script>

<style scoped></style>
