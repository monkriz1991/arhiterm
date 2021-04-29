<template>
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
        <el-breadcrumb-item
            v-for="(item, i) in breadcrumbs"
            :key="i"
            :to="item.name"
        >
            <a href="/">{{item.name}}</a>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>


<script>
export default {
    computed: {
        breadcrumbs() {
            // console.log( this.$route.matched);
            return this.$route.matched;
        },
    },
};
</script>