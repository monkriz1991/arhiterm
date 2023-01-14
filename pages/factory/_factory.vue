<template>
    <div class="container">
        <Breadcrumb
        :factori.sync="factori"
        />
        <el-skeleton
        :loading="loadingFirst"
        class="skeleton-cat-category"
        >
          <template slot="template" >
            <el-row :gutter="6">
                <el-col
                :xs="12" :sm="12" :md="4" :xl="4"
                v-for="(tovar, index) in 6" :key="index"
                >
                  <el-skeleton-item
                    variant="rect"
                    class="skeleton-slider-category"
                  />
                </el-col>
            </el-row>
          </template>
        </el-skeleton>
        <transition name="el-fade-in-linear">
          <div :class="[showFirst==false?'show-on-class':'']">
            <SliderBrand  />
          </div>
        </transition>
        <div v-if="adaptivSidebar">
          <el-skeleton
          :loading="loadingFirst"
          :rows="10" 
          class="skeleton-sidebar-category"
          >
          </el-skeleton>
          <transition name="el-fade-in-linear">
            <sidebarFactory
            :categoriesNested.sync="factori"
            :adaptivSidebar.sync="adaptivSidebar"
            v-show="showFirst"
            />
          </transition>
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
        <el-skeleton
          :loading="loadingFirst"
          v-if="!adaptivSidebar"
          :rows="2" 
          class="skeleton-sidebar-filter"
          >
        </el-skeleton>
        <div 
        v-if="!adaptivSidebar"
        class="name-category"
        v-show="showFirst"
        >{{factori.name}}</div>
        <el-button
        v-if="!adaptivSidebar"
        @click="drawer = true"
        class="drawer-button"
        icon="el-icon-finished"
        size="small"
        v-show="showFirst"
        >
          Фильтры
        </el-button>
        <el-skeleton
        :loading="loadingFirst"
        class="skeleton-product-category"
        >
          <template slot="template" >
            <el-row :gutter="6">
                <el-col
                :xs="24" :sm="24" :md="12" :xl="12"
                v-for="(tovar, index) in 10" :key="index"
                >
                  <el-skeleton-item
                    variant="rect"
                    class="skeleton-product-img"
                  />
                  <div
                  class="skeleton-product-desc">
                    <el-skeleton-item variant="p" style="width: 100%" />
                    <div
                      style="display: flex;align-items: flex-start;flex-direction: column;"
                    >
                      <el-skeleton-item variant="text" style="height: 75px;margin: 15px 0 25px 0;" />
                      <el-skeleton-item variant="text" style="width: 50%;height: 25px;" />
                    </div>
                  </div>
                </el-col>
            </el-row>
          </template>
        </el-skeleton>
        <transition name="el-fade-in-linear">
          <CartTovar 
          ref="CartTovar" 
          :productsList.sync="productsList"
          :categoriesNested.sync="categoriesNested"
          v-show="showFirst"
          />
        </transition>
        <Paginated/>
        <div v-show="showFirst" class="cat-desc">
          <el-collapse  accordion>
            <el-collapse-item name="1">
              <template slot="title">
                <h2>Описание раздела</h2> <i class="header-icon el-icon-info"></i>
              </template>
              <div v-show="showFirst" v-html="factori.description"></div>
            </el-collapse-item>
          </el-collapse>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    components:{
      'sidebarFactory': () => import('~/components/catalog/sidebarFactory.vue'),
      'CartTovar': () => import('~/components/catalog/CartTovar.vue'),
      'Breadcrumb': () => import('~/components/Breadcrumb.vue'),
      'Paginated': () => import('~/components/catalog/PaginatedFactory.vue'),
      'SliderBrand': () => import('~/components/catalog/SliderBrand.vue'),
    },
    mounted() {
      if (process.browser){
        window.addEventListener('resize', this.updateWidth);
        this.updateWidth()
      }
      this.setLoading()
    },
    async asyncData ({ app, params, route, error, $axios}) {
      let parametrs = {};
      let object_tabs = {}
      let card_filter_rus = []
      await app.store.dispatch('product/DELL_TABS')
        let arr_filter = []
        if(route.query['page']!==undefined){
          parametrs['page'] = route.query['page'];
        }
        if(params.id == undefined){
        let name_fill_fill='';
        let routeManuf = await app.store.dispatch('category/getManufacturer')
        for(let item in routeManuf.results){           
           if(params.factory==routeManuf.results[item].kirilica_name){
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
          let name_fill = ''
          object_tabs['card_filter'] = route.query.card_filter.split(',')
          object_tabs['card_filter_rus'] = ''
          for(let item in factori.filters){          
            for(let itemin in factori.filters[item].chice){  
              for(let fill in object_tabs['card_filter']){  
                if(object_tabs['card_filter'][fill]==factori.filters[item].chice[itemin].kirilica){
                  card_filter_rus.push(factori.filters[item].chice[itemin].value)
                    name_fill = '"'+factori.filters[item].chice[itemin].id +'||'+ factori.filters[item].id+'"'
                    arr_filter.push(name_fill)
                  
                }
              }
            } 
          } 
        } 
      parametrs['card_filter'] = '['+arr_filter +']';
      object_tabs['card_filter_rus']= card_filter_rus
      let categoriesNested = {}
      await app.store.dispatch('product/ADD_TO_TABS',object_tabs)
      categoriesNested['list_filter'] = factori.filters
      let productsList = await app.store.dispatch('product/getProductListManufacturer',parametrs)
     return{categoriesNested,productsList,factori}
    },
    data() {
      return {
        adaptivSidebar:true,
        drawer: false,
        direction: 'ltr',
        width:0,
        showFirst:false,
        loadingFirst: true,
        timeStart:800,
      }
    },
    watch:{
      $route (to, from){
        let parametrs = {};
        let object_tabs = {}
        let arr_filter = []
        let card_filter_rus = []
        let name_fill= ''
        if(to.query['card_filter']!==undefined&&to.query['card_filter']!=''){
          object_tabs['card_filter'] = to.query.card_filter.split(',')
          for(let item in this.factori.filters){                   
            for(let itemin in this.factori.filters[item].chice){       
              for(let fill in object_tabs['card_filter']){
                if(object_tabs['card_filter'][fill]==this.factori.filters[item].chice[itemin].kirilica){
                  card_filter_rus.push(this.factori.filters[item].chice[itemin].value)
                  name_fill = '"'+this.factori.filters[item].chice[itemin].id +'||'+ this.factori.filters[item].id+'"'
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
        if(to.query['page']!==undefined){
          parametrs['page'] = to.query['page'];
        }
        parametrs['manuf'] = this.factori.id
        this.sendQuery(parametrs)
      }
    },
    methods:{
      ...mapActions({
        ADD_TO_TABS: 'product/ADD_TO_TABS',
        DELL_TABS:'product/DELL_TABS',
      }),
      setLoading() {
        setTimeout(() => (
          this.loadingFirst = false,
          this.showFirst = true
          ), this.timeStart)
      },
      async sendQuery(parametrs){
        this.productsList = await this.$store.dispatch('product/getProductListManufacturer',parametrs);
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
        title: this.factori.name+' купить продукцию производителя в Arhiterm.by',
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
              content: `https://arhiterm.by/factory/${this.factori.kirilica_name}`,
          },
        ]
      }
    }
}
</script>