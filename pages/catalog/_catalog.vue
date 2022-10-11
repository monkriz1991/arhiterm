<template>
    <div
    class="container">
    <div 
    v-if="!adaptivSidebar"
    class="name-category"
    >{{categoriesNested.name}}</div>
        <Breadcrumb/>
        <div v-if="adaptivSidebar">
          <Sidebar
          :categoriesNested.sync="categoriesNested"
          :categoryManuf.sync="categoryManuf"
          :adaptivSidebar.sync="adaptivSidebar"
           />
        </div>
        <el-drawer
        v-else
        class="darwer-catalog"
        :visible.sync="drawer"
        :direction="direction"
        :with-header="true">
          <Sidebar
          :categoriesNested.sync="categoriesNested"
          :categoryManuf.sync="categoryManuf"
          :adaptivSidebar.sync="adaptivSidebar"
          />
        </el-drawer>

        <el-button
        v-if="!adaptivSidebar"
        @click="drawer = true"
        class="drawer-button"
        icon="el-icon-s-operation"
        size="small"
        >
          Фильтры
        </el-button>
        <transition >
        <CartTovar ref="CartTovar" :productsList.sync="productsList"
        :categoriesNested.sync="categoriesNested"
        :categoryManuf.sync="categoryManuf"
        />
        </transition>
        <Paginated/>
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
import {mapGetters,mapActions} from 'vuex'
export default {
    created(){
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
        Paginated,
    },
    async asyncData ({ app, params, route, error }) {
      let parametrs = {};
      let arr_filter = []
      let object_tabs = {}
      let card_filter_rus = []
      await app.store.dispatch('product/DELL_TABS')
       if(params.id == undefined){
        let category = await app.store.dispatch('category/getCategory');
        let name_fill = ''
        for(let i in category){
          if(category[i].kirilica == params.catalog){
            params.id = category[i].id
            if(route.query['card_filter']!==undefined){
              object_tabs['card_filter'] = route.query.card_filter.split(',')
              object_tabs['card_filter_rus'] = ''
            }
            for(let item in category[i].list_filter){         
              for(let itemin in category[i].list_filter[item].chice){       
                for(let fill in object_tabs['card_filter']){
                  if(object_tabs['card_filter'][fill]==category[i].list_filter[item].chice[itemin].kirilica){
                      card_filter_rus.push(category[i].list_filter[item].chice[itemin].value)
                      name_fill = '"'+ category[i].list_filter[item].chice[itemin].id +'||'+ category[i].list_filter[item].id+'"'
                      arr_filter.push(name_fill)
                  }
                }
              } 
            } 
          }  
        }
        parametrs['card_filter'] = '['+arr_filter +']';
        object_tabs['card_filter_rus']= card_filter_rus
        await app.store.dispatch('product/ADD_TO_TABS',object_tabs)
      }
        if(route.query['page']!==undefined){
          parametrs['page'] = route.query['page'];
        }
        if(route.query['manuf']!==undefined){
        let arr_filter_manuf = []
        let name_fill_fill= ''
        let manuf_filter_rus = []
        let routeManuf = await app.store.dispatch('category/getCategoryManuf',params.id)
        object_tabs['manuf'] = route.query['manuf'].split(',')
        for(let item in routeManuf.results){   
          for(let fill in object_tabs['manuf']){           
            if(object_tabs['manuf'][fill]==routeManuf.results[item].kirilica){
              manuf_filter_rus.push(routeManuf.results[item].name)
                name_fill_fill = '"'+routeManuf.results[item].id +'"'
                arr_filter_manuf.push(name_fill_fill)
            }
          }
        } 
          object_tabs['manuf_filter_rus']= manuf_filter_rus
          parametrs['manuf'] = '['+arr_filter_manuf +']';
        }
    try {

      parametrs['cat'] = params.id;
      let categoriesNested =  await app.store.dispatch('category/getCategoryNested',params.id)
      let productsList =  await app.store.dispatch('product/getProductList',parametrs)
      let categoryManuf = await app.store.dispatch('category/getCategoryManuf',params.id)
      return{categoriesNested,productsList,categoryManuf}
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
        let parametrs = {}
        let arr_filter = []
        let object_tabs = {}
        let name_fill = []
        let card_filter_rus = []
        if(to.query['card_filter']!==undefined&&to.query['card_filter']!=''){
          object_tabs['card_filter'] = to.query.card_filter.split(',')
          for(let item in this.categoriesNested.list_filter){         
            for(let itemin in this.categoriesNested.list_filter[item].chice){       
              for(let fill in object_tabs['card_filter']){
                if(object_tabs['card_filter'][fill]==this.categoriesNested.list_filter[item].chice[itemin].kirilica){
                    card_filter_rus.push(this.categoriesNested.list_filter[item].chice[itemin].value)
                    name_fill = '"'+this.categoriesNested.list_filter[item].chice[itemin].id +'||'+ this.categoriesNested.list_filter[item].id+'"'
                    arr_filter.push(name_fill)
                }
              }
            } 
          } 
          object_tabs['card_filter_rus']= card_filter_rus
          parametrs['card_filter'] = '['+arr_filter +']';
          this.ADD_TO_TABS(object_tabs)
        }else{
          this.DELL_TABS()
        }
        if(to.query['page']!==undefined ){
          parametrs['page'] = to.query['page'];
        }
        let arr_filter_manuf = []
        let name_fill_fill=''
        let manuf_filter_rus = []
        if(to.query['manuf']!==undefined&&to.query['manuf']!=''){ 
          object_tabs['manuf'] = to.query.manuf.split(',')
          for(let item in this.categoryManuf.results){   
            for(let fill in object_tabs['manuf']){          
              if(object_tabs['manuf'][fill]==this.categoryManuf.results[item].kirilica){
                  manuf_filter_rus.push(this.categoryManuf.results[item].name)
                  name_fill_fill = '"'+this.categoryManuf.results[item].id +'"'
                  arr_filter_manuf.push(name_fill_fill)
              }
            }
          } 
          object_tabs['manuf_filter_rus']= manuf_filter_rus
          parametrs['manuf'] = '['+arr_filter_manuf +']';
          this.ADD_TO_TABS(object_tabs) 
        }else{
          this.ADD_TO_TABS(object_tabs)
        }
          parametrs['cat'] = this.categoriesNested.id;
          this.sendQuery(parametrs)
      }
  },
    computed:{
    },
    methods:{
      ...mapActions({
          ADD_TO_TABS: 'product/ADD_TO_TABS',
          DELL_TABS:'product/DELL_TABS',
      }),
      async sendQuery(parametrs){
        this.productsList = await this.$store.dispatch('product/getProductList',parametrs);
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
        title: this.categoriesNested.name,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content:  this.categoriesNested.description.replace(/(&lt;|<([^>]+)>)/ig,"")
          },
          {
              hid: 'og:title',
              name: 'og:title',
              content: this.categoriesNested.name,
          },
          {
              hid: 'og:image',
              property: 'og:image',
              content: `${this.categoriesNested.img}`,
          },
          {
              hid: 'og:description',
              property: 'og:description',
              content: this.categoriesNested.description.replace(/(&lt;|<([^>]+)>)/ig,""),
          },
          {
              hid: 'og:url',
              property: 'og:url',
              content: `https://arhiterm.by/catalog/${this.categoriesNested.id}`,
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
