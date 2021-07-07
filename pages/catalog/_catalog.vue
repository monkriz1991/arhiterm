<template>
    <div 
    class="container">
        <Breadcrumb/>
        <div v-if="adaptivSidebar">
          <Sidebar @updateData="updateData" />
        </div>
        <el-drawer
        v-else
        class="darwer-catalog"
        :visible.sync="drawer"
        :direction="direction"
        :with-header="true">
          <Sidebar @updateData="updateData" />
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
        <CartTovar ref="CartTovar" />
        <Paginated @changePage="updateData"/>

    </div>
</template>

<script>
function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
import Sidebar from '~/components/catalog/Sidebar.vue'
import CartTovar from '~/components/catalog/CartTovar.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'
import Paginated from '~/components/catalog/Paginated.vue'
export default {
  created(){
    //this.loading=true
  },
      mounted() {
        if (process.browser){                 
          window.addEventListener('resize', this.updateWidth);  
          this.updateWidth()        
        }
    },
    components:{
        Sidebar,
        CartTovar,
        Breadcrumb,
        Paginated
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
        if(route.query['manuf']!==undefined){
          parametrs['manuf'] = route.query['manuf'];
        }
    try {

      parametrs['cat'] = params.catalog;
        await app.store.dispatch('category/getCategoryNested',params.catalog)
        await app.store.dispatch('product/getProductList',parametrs)
        await app.store.dispatch('category/getCategoryManuf',params.catalog)
    } catch (err) {
        console.log(err)
        return error({
            statusCode: 404,
            message: 'Товар не найдена или сервер не доступен'
        })
        }
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
        if(to.query['manuf']!==undefined){
          parametrs['manuf'] = to.query['manuf'];
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
        if(this.$route.query['manuf']!==undefined){
          parametrs['manuf'] = this.$route.query['manuf'];
        }
        if(this.$route.query['page']!==undefined){
          parametrs['page'] = this.$route.query['page'];
        }
        parametrs['cat'] = this.$route.params.catalog;
        console.log(parametrs)
        this.sendQuery(parametrs);
      },
      async sendQuery(parametrs){
        await this.$store.dispatch('product/getProductList',parametrs);
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
.darwer-catalog .el-drawer{
  width: 80% !important;
}
.darwer-catalog .el-drawer__body{
    overflow: auto;
    height: 100%;
    padding: 0 20px;
}
.darwer-catalog .cat-filter-title{
  display: none;
}
.darwer-catalog .cat-filter .el-checkbox-group .el-checkbox {
    margin: 0 0 12px;
}
.darwer-catalog .el-drawer__header {
    margin-bottom: 15px;
    padding: 15px 20px 0;
}
.drawer-button{
  margin:0 0 15px;
}
</style>