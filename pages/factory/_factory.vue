<template>
    <div class="container">
        <Breadcrumb
        :factori.sync="factori"
        />
        <div v-if="adaptivSidebar">
        <sidebarFactory
        :categoriesNested.sync="factori"
        :adaptivSidebar.sync="adaptivSidebar"
        />
        </div>
        <el-drawer
        v-else
        class="darwer-catalog"
        :visible.sync="drawer"
        :direction="direction"
        :with-header="true">
          <sidebarFactory
          :categoriesNested.sync="factori"
          :adaptivSidebar.sync="adaptivSidebar"
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
        <Paginated/>

    </div>
</template>

<script>
function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
import sidebarFactory from '~/components/catalog/sidebarFactory.vue'
import CartTovar from '~/components/catalog/CartTovar.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'
import Paginated from '~/components/catalog/PaginatedFactory.vue'
export default {
    components:{
        sidebarFactory,
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
    async asyncData ({ app, params, route, error, $axios}) {
      
      let parametrs = {};
      let object_tabs = {}
      app.$UpdsaveArr(route)

        let arr_filter = []

        if(route.query['page']!==undefined){
          parametrs['page'] = route.query['page'];
        }
        if(params.id == undefined){
        let name_fill_fill='';
        let routeManuf = await app.store.dispatch('category/getManufacturer')

        for(let item in routeManuf.results){           
           if(params.factory==routeManuf.results[item].kirilica){
                name_fill_fill = routeManuf.results[item].id
            }
        } 

          params.id = name_fill_fill;
          parametrs['manuf'] = params.id
        }else{
          parametrs['manuf'] = params.id;
        }

        let factori = await $axios.$get(`/manufacturer/get/${params.id}/`)

        if(route.query['card_filter']!==undefined){
          let name_fill,name_arr_fill = ''
          name_arr_fill = route.query['card_filter'].slice(1,-1);
          name_arr_fill = name_arr_fill.split(',')
      
          for(let item in factori.filters){      
                      
            for(let itemin in factori.filters[item].chice){  
            
              for(let fill in name_arr_fill){
                
                if(name_arr_fill[fill]==factori.filters[item].chice[itemin].kirilica){
                    name_fill = '"'+factori.filters[item].chice[itemin].id +'||'+ factori.filters[item].id+'"'
                    arr_filter.push(name_fill)
                  
                }
              }
            } 
          } 
        } 
        await app.store.dispatch('product/ADD_TO_TABS',object_tabs)
        parametrs['card_filter'] = '['+arr_filter +']';
       let categoriesNested = await app.store.dispatch('category/getCategory1NestedFactory',params.id)
       let productsList = await app.store.dispatch('product/getProductListManufacturer',parametrs)
     return{categoriesNested,productsList,factori}
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
        let arr_filter = []
        let name_fill,name_arr_fill= ''
        if(to.query['card_filter']!==undefined){
        name_arr_fill = to.query['card_filter'].slice(1,-1);
        name_arr_fill = name_arr_fill.split(',')
    
        for(let item in this.factori.filters){      
                    
          for(let itemin in this.factori.filters[item].chice){  
          
            for(let fill in name_arr_fill){
               
              if(name_arr_fill[fill]==this.factori.filters[item].chice[itemin].kirilica){
                  name_fill = '"'+this.factori.filters[item].chice[itemin].id +'||'+ this.factori.filters[item].id+'"'
                  arr_filter.push(name_fill)
                 
              }
            }
          } 
        } 
          
          parametrs['card_filter'] = '['+arr_filter +']';
        }
      
        if(to.query['page']!==undefined){
          parametrs['page'] = to.query['page'];
        }

        parametrs['manuf'] = this.factori.id
       this.sendQuery(parametrs)
      }
  },
    computed:{
    },
    methods:{
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
    head() {
      return {
        title: this.factori.name,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content:  this.factori.description_seo
          },
          {
              hid: 'og:title',
              name: 'og:title',
              content: this.factori.name,
          },
          {
              hid: 'og:image',
              property: 'og:image',
              content: `${this.factori.img}`,
          },
          {
              hid: 'og:description',
              property: 'og:description',
              content: this.factori.description_seo,
          },
          {
              hid: 'og:url',
              property: 'og:url',
              content: `https://arhiterm.by/catalog/factory/${this.factori.id}`,
          },
        ]
      }
    }
}
</script>
<style>
.drawer-button{
margin:0 0 15px;
}
</style>
