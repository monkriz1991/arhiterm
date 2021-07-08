<template>
    <div class="container">
        <Breadcrumb/>
        <div v-if="adaptivSidebar">
        <Sidebar 
        @updateData="updateData" 
        :categoriesNested.sync="categoriesNested"
        />
        </div>
        <el-drawer
        v-else
        class="darwer-catalog"
        :visible.sync="drawer"
        :direction="direction"
        :with-header="true">
          <Sidebar 
          @updateData="updateData"
          :categoriesNested.sync="categoriesNested"
           />
        </el-drawer>
        <el-button 
        v-if="!adaptivSidebar" 
        @click="drawer = true" 
        class="drawer-button"
        icon="el-icon-finished"
        size="small"
        >
          Фильтры
        </el-button>
        <CartTovar ref="CartTovar" :productsList.sync="productsList" />
        <Paginated @changePage="updateData"/>

    </div>
</template>

<script>
function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
import Sidebar from '~/components/catalog/sidebarFactory.vue'
import CartTovar from '~/components/catalog/CartTovar.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'
import Paginated from '~/components/catalog/Paginated.vue'
export default {
    components:{
        Sidebar,
        CartTovar,
        Breadcrumb,
        Paginated
    },
    mounted() {
      if (process.browser){                 
        window.addEventListener('resize', this.updateWidth);  
        this.updateWidth()        
      }
    },
    async asyncData ({ app, params, route, error }) {
      let parametrs = {};
      app.$UpdsaveArr(route)
        if(route.query['card_filter']!==undefined){
          parametrs['card_filter'] = route.query['card_filter'];
        }
        if(route.query['page']!==undefined){
          parametrs['page'] = route.query['page'];
        }
      parametrs['manuf'] = params.id;
       let categoriesNested = await app.store.dispatch('category/getCategoryNestedFactory',params.id)
       let productsList = await app.store.dispatch('product/getProductListManufacturer',parametrs)
     return{categoriesNested,productsList}
    },
    data() {
        return {
          adaptivSidebar:true,
          drawer: false,
          direction: 'ltr',
          width:0,
        }
    },
    watch:{
      $route (to, from){
        this.$UpdsaveArr(to);
        let parametrs = {};
        if(to.query['card_filter']!==undefined){
          parametrs['card_filter'] = to.query['card_filter'];
        }
        if(to.query['page']!==undefined){
          parametrs['page'] = to.query['page'];
        }
         parametrs['cat'] = to.params.catalog;
       this.sendQuery(parametrs)
      }
  },
    computed:{
    },
    methods:{

       updateData(){
        let parametrs = {};
        if(this.$route.query['card_filter']!==undefined){
          parametrs['card_filter'] = this.$route.query['card_filter'];
        }
        if(this.$route.query['page']!==undefined){
          parametrs['page'] = this.$route.query['page'];
        }
        parametrs['manuf'] = this.$route.params.id;
        console.log(parametrs)
        this.sendQuery(parametrs);
      },
      async sendQuery(parametrs){
         if (parametrs['manuf']!==undefined){
          this.productsList = await this.$store.dispatch('product/getProductListManufacturer',parametrs);
         }
      },
      updateWidth() {
        this.width = window.innerWidth;
        if(window.innerWidth>991){
            this.adaptivSidebar = true
        }else{
          this.adaptivSidebar = false
          
        }
      },
    },
}
</script>
<style>
.drawer-button{
margin:0 0 15px;
}
</style>