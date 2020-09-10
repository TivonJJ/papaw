<template>
    <div class="container">
        <img src="@/assets/404.png" class="img-404" />
        <div class="links">
            <router-link to="/">返回首页</router-link>
        </div>
    </div>
</template>
<style scoped lang="less">
.container {
    text-align: center;
    background-color: #fff;
    height: 100vh;
    padding-top: 100px;
}
.img-404 {
    display: block;
    width: 90%;
    margin: auto;
}
.links {
    margin-top: 62px;
}
</style>
