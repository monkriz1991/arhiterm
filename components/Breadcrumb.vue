<template>
    <div>
        <el-breadcrumb
        v-if="this.$route.name!='index'"
        separator-class="el-icon-arrow-right"
        >
        <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
            <el-breadcrumb-item
            v-if="this.$route.name!='product-id'"
                :to="nameCat.id"
            >
                {{nameCat.name}}
            </el-breadcrumb-item>
            <el-breadcrumb-item
            v-if="this.$route.name=='product-id'"
                :to="nameCat.id"
            >
                {{nameCat.name}}
            </el-breadcrumb-item>
            <el-breadcrumb-item
                v-if="this.$route.name=='product-id'"
                :to="nameProduct.id"
            >
                {{nameProduct.name}}
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
          },
          items:[]
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
    watch:{
        $route(){
            this.getRoute()
        }
    },
    computed: {
        ...mapGetters({
            nameCat:'category/categoryNested',
            nameProduct:'tovar/productItem'
        }),

    },
    methods:{
        getRoute(){
            this.items = this.$route.matched
           // console.log(this.$route)
        }
    },
    created(){
        this.getRoute()
    }
};
</script>
