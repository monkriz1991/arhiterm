<template>
    <div class="container">
        <Breadcrumb/>
        <Sidebar @updateData="updateData" />
        <CartTovar ref="CartTovar" />
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
        await app.store.dispatch('category/getCategoryNestedFactory',params.id)
        await app.store.dispatch('product/getProductListManufacturer',parametrs)

    },
    data() {
        return {
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
           await this.$store.dispatch('product/getProductListManufacturer',parametrs);
         }
      }
    },
    mounted(){

    },
}
</script>
