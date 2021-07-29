<template>
    <div>
        <el-breadcrumb
        v-if="this.$route.name!='index'"
        separator-class="el-icon-arrow-right"
        >
        <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
            <el-breadcrumb-item
                v-for="(item, i) in breadcrumbs"
                :key="i"
                :to="{path:item.fullPath}"
            >
                {{names[item.name]?names[item.name]:item.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
          names:{
            "index":"Главная",
            "catalog-catalog":"Каталог",
            "product-id":"Продукт",
            "mounters":"Монтажники"
          }
        }
    },
    // props:{
    //   crumb:{
    //     type:Array,
    //     default(){
    //       return{}
    //     }
    //   }
    // },
    computed: {
        ...mapGetters({
            nameCat:'category/categoryNested',
            nameProduct:'tovar/productItem'
        }),
        breadcrumbs () {
        return this.$nuxt.history;
        }
    },
};
</script>
