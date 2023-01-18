<template >
    <div  class="catalog-paginated">
      <nav role="navigation" aria-label="Pagination Navigation">
        <ul class="vs-pagination">
          <!-- <li>
            <nuxt-link  
              :class="{disableitempage:itempagePrev==undefined}" 
              :to="{ path: `${$route.params.catalog}`, query: {page:itempagePrev,card_filter:paregetfilter,manuf:paregetmanuf} }"
              ><i class="el-icon-arrow-left"></i></nuxt-link>
          </li> -->
          <li
          v-for="itempage in Math.ceil(this.countProduct/10)" :key="itempage"
          :class="{'vs-pagination--active':!$route.query.page&&itempage==1
          ?'vs-pagination--active':itempage==$route.query.page
          }" 
          :hidden="hidenPage(itempage)" 
          > 
            <nuxt-link     
              :alt="'Страница '+itempage+' раздела '+ $route.params.catalog" 
              :to="{ path: `${$route.params.catalog}`, query: {page:itempage,card_filter:paregetfilter,manuf:paregetmanuf} }"
              >{{itempage}}</nuxt-link>
          </li> 
          <!-- <li :hidden="Math.ceil(this.countProduct/10)<=5"  class="paginated-nore">
            <i class="el-icon-more"></i>
          </li> -->
          <!-- <li>
            <nuxt-link    
              :class="{disableitempage:itempageNext==Math.ceil(this.countProduct/10)+1}"   
              :to="{ path: `${$route.params.catalog}`, query: {page:itempageNext,card_filter:paregetfilter,manuf:paregetmanuf} }"
              ><i class="el-icon-arrow-right"></i></nuxt-link>
          </li> -->
        </ul> 
      </nav>
    </div>
</template>
<script>
import {mapGetters,mapActions} from "vuex";
export default {
  mounted(){
    this.hidenPage()
    this.filterPage()
  },
  data() {
    return {
      page:this.$route.query.page!==undefined?parseInt(this.$route.query.page):1,
      FilterItem:undefined,
      ManufItem:undefined,
      pagePrev:undefined,
      pageNext:2,
      itempageHiden:false,
      eventpage:this.$route.query.page!==undefined?parseInt(this.$route.query.page):1,
    }
  },
  computed:{
    ...mapGetters({
      countProduct: 'product/countProduct',
      tabsArr:'product/tabs',
    }),
    paregetfilter(){
      if(this.tabsArr.card_filter!=undefined){
        this.FilterItem = this.tabsArr.card_filter.join(',')
      }
      return this.FilterItem
    },
    paregetmanuf(){
      if(this.tabsArr.manuf!=undefined){
        this.ManufItem = this.tabsArr.manuf.join(',')
      }
      return this.ManufItem
    },
    itempagePrev(){
      return this.pagePrev
    },
    itempageNext(){
      return this.pageNext
    }
  },
  watch:{
    tabsArr(){
      if(this.tabsArr.card_filter!=undefined){
        this.FilterItem = this.tabsArr.card_filter.join(',')
      }else{
        this.FilterItem = undefined
      }
      if(this.tabsArr.manuf!=undefined){
        this.ManufItem = this.tabsArr.manuf.join(',')
      }else{
        this.ManufItem = undefined
      }
    },
    '$route.query'(to){
      if(to.page==1){
        this.$router.replace({ name: "catalog-catalog", params: {catalog:this.$route.params.catalog}, query: {card_filter:this.FilterItem,manuf:this.ManufItem,page:undefined} })
        this.pagePrev = undefined
        this.pageNext = 2
        this.eventpage = to.page
        this.changePage()
      }else{
        this.eventpage = to.page
        this.pagePrev = parseInt(to.page) - 1
        this.pageNext = parseInt(to.page) + 1
        this.changePage()
      }
      if(to.page==1||to.page==undefined){
        this.pagePrev = undefined
        this.pageNext = 2
        this.eventpage = 1
      }
    }
  },
  methods:{
    filterPage(){
      // this.paregetfilter
      // this.paregetmanuf
    },
    hidenPage(itempage){
      if(Math.ceil(this.countProduct/10)<=5){
        return false
      }else{
        if(this.eventpage==itempage){
            return false
        }
        if(Math.ceil(this.eventpage)+1==itempage||Math.ceil(this.eventpage)+2==itempage){
            return false
        }
        if(Math.ceil(this.eventpage)-1==itempage||Math.ceil(this.eventpage)-2==itempage){
            return false
        }
        // if(this.eventpage==2&&this.eventpage==itempage){
          
        //   if(Math.ceil(itempage)+3){
        //     return false
        //   }
           
        // }
        if(itempage>1&&itempage<Math.ceil(this.countProduct/10)){
          return true
        }
      }
    },
    changePage(){
      if (process.browser){
          window.scrollTo({
            top: 100,
            behavior: 'smooth'
          });
      };
    },
  },
}
</script>