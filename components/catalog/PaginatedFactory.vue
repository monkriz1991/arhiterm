<template >
    <div  class="catalog-paginated">
      <nav role="navigation" aria-label="Pagination Navigation">
        <ul class="vs-pagination">
          <li
          v-for="itempage in Math.ceil(this.countProduct/10)" :key="itempage"
          :class="{'vs-pagination--active':!$route.query.page&&itempage==1
          ?'vs-pagination--active':itempage==$route.query.page
          }" 
          :hidden="hidenPage(itempage)" 
          > 
            <nuxt-link     
              :alt="'Страница '+itempage+' раздела '+ $route.params.factory" 
              :to="{ path: `${$route.params.factory}`, query: {page:itempage,card_filter:paregetfilter} }"
              >{{itempage}}</nuxt-link>
          </li> 
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
    },
    '$route.query'(to){
      if(to.page==1){
        this.$router.replace({ name: "factory-factory", params: {factory:this.$route.params.factory}, query: {card_filter:this.FilterItem,page:undefined} })
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