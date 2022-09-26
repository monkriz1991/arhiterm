<template>
    <div>
        <div 
        class="">
            <el-button
            v-if="this.$route.name=='product'"
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
        >
        <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
            <el-breadcrumb-item
            v-if="this.$route.name=='catalog'"
            >
                <nuxt-link :to="`/catalog/${nameCat.id}`">
                    {{nameCat.name}}
                </nuxt-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item
            v-else-if="this.$route.name=='catalog-factory-id'"
            >
                <nuxt-link :to="`/catalog/${factory.id}`">
                    {{factory.name}}
                </nuxt-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item
            v-else-if="this.$route.name=='product'"
            >
                <nuxt-link :to="`/catalog/${factory_name}${results_id}`">
                    {{results_prod}}
                </nuxt-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item
                v-if="this.$route.name=='product'"
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
        this.queryString = this.$route.params.id
       
    },
    created(){
        this.getRoute()
    },
    mounted(){
      if(this.queryString!=undefined){
          if(this.$nuxt.context.from!=undefined){
          if(this.$nuxt.context.from.name!='catalog-factory-id'){
            this.$axios.get(`/catalog/search/${this.queryString}`).then(result =>(
                this.results_prod = result.data.cat[0],
                      this.$axios.get(`/catalog/categories/${this.results_prod}`).then(result =>(
                          this.results_prod = result.data.name,
                          this.results_id = result.data.id
                      ))  
                
            ))
            }else if(this.$nuxt.context.from.name=='catalog-factory-id'){
                this.$axios.get(`/catalog/search/${this.queryString}`).then(result =>(
                    this.results_prod = result.data.manufacturername,
                    this.results_id = result.data.manufacturer
                    
                ))    
                this.factory_name = 'factory/'  
            }
        }else{
            this.$axios.get(`/catalog/search/${this.queryString}`).then(result =>(
                this.results_prod = result.data.cat[0],
                      this.$axios.get(`/catalog/categories/${this.results_prod}`).then(result =>(
                          this.results_prod = result.data.name,
                          this.results_id = result.data.id
                      ))  
                
            ))
        }
      }
    },
};
</script>
