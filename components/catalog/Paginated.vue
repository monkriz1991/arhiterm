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
<style type="text/css">
.vs-pagination .disableitempage{
  opacity: 0.5;
  /* cursor: not-allowed; */
  pointer-events: none;
  
}
.vs-pagination--hidden{
  display: none;
}
.vs-pagination {
  --page-bg-color: #f0f5fb;
  --page-color: #68737d;
  --page-active-color: #2f3941;
  --page-disabled-color: #d8d8d8;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}
.vs-pagination > li {
  list-style: none;
}
.vs-pagination > li:first-child a {
  margin-left: 0;
}
.vs-pagination > li:last-child a {
  margin-right: 0;
}
.vs-pagination > li > a {
  min-width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  color: var(--page-color);
  font-size: 14px;
  margin-left: 2px;
  margin-right: 2px;
  user-select: none;
}
.vs-pagination > li > a:hover {
  background-color: var(--page-bg-color);
  color: var(--page-active-color);
}
.vs-pagination > li > a:focus-visible {
  box-shadow: 0 0 0 2px rgba(31, 115, 183, 0.35);
  outline: none;
}
.vs-pagination > li.vs-pagination--active a {
  color: var(--page-active-color);
  background-color: var(--page-bg-color);
  font-weight: 600;
  position: relative;
  z-index: 1;
}
.vs-pagination > li.vs-pagination--disabled > a {
  color: var(--page-disabled-color) !important;
  user-select: none;
  cursor: default;
}
.vs-pagination > li.vs-pagination--disabled > a:hover {
  background: transparent;
}
.vs-pagination > li.vs-pagination--disabled.vs-pagination--no-cursor a {
  cursor: not-allowed;
}
.vs-pagination > li.vs-pagination--gap a {
  cursor: default;
  color: var(--page-color);
}
.vs-pagination > li.vs-pagination--gap a:hover {
  background: transparent;
}</style>