<template>
    <div>
        <div 
        class="">
            <el-button
            v-if="this.$route.name=='product-product'"
            text
            :ripple="false"
            icon="el-icon-back"
            size="mini"
            class="back-wrapper"
            circle
            @click.prevent="to">
            </el-button>
        </div>
        <el-breadcrumb
        v-if="this.$route.name!='index'"
        separator-class="el-icon-arrow-right"
        :class="{'el-breadcrumb-product':this.$route.name=='product-product'}"
        >
        <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
            <el-breadcrumb-item
            v-if="this.$route.name=='catalog-catalog'"
            >
                <nuxt-link :to="{ name: 'catalog-catalog', params: {catalog:`${nameCat.kirilica}`,id:`${nameCat.kirilica}`} }">
                    {{nameCat.name}}
                </nuxt-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item
            v-else-if="this.$route.name=='factory-factory'"
            >
                <nuxt-link :to="{ name: 'factory-factory', params: {factory:`${factory.kirilica}`,id:`${factory.kirilica}`} }">
                    {{factory.name}}
                </nuxt-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item
            v-else-if="this.$route.name=='product-product'"
            >
                <nuxt-link :to="{ name: 'catalog-catalog', params: {catalog:`${results_name}`,id:`${results_id}`} }">
                    {{results_prod}}
                </nuxt-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item
                v-if="this.$route.name=='product-product'"
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
    props:['factori'],
    data(){
        return{
          names:{
            "index":"Главная",
            "catalog":"Каталог",
            "product":"Продукт",
            "mounters":"Монтажники"
          },
          results_prod:null,
          results_id:null,
          results_name:null,
          queryString:null,
          factory:this.factori?this.factori!=''?this.factori:'':'',
          factory_name:'',
          items:[]
        }
    },
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
        },
        to() {
            this.$router.go(-1);
        },
            getPath(queryString){
        }
    },
    beforeMount(){
        this.queryString = this.$route.params.product
    },
    created(){
        this.getRoute()
    },
    mounted(){
        if(this.queryString!=undefined){
            this.$axios.get(`/api/get/product?kirilica=${this.queryString}`).then(result =>(
                this.results_prod = result.data.cat[0],
                    this.$axios.get(`/catalog/categories/${this.results_prod}`).then(result =>(
                        this.results_prod = result.data.name,
                        this.results_name = result.data.kirilica,
                        this.results_id = result.data.id
                ))  
            ))
        }
    },
};
</script>
