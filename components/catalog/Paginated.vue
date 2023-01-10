<template >
    <div  class="catalog-paginated">
        <vs-pagination 
        :total-pages="Math.ceil(this.countProduct/10)"
        :current-page="page"
        @change="changePage">
        </vs-pagination>
    </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
export default {
  components:{
    
  },
  data() {
      return {
        page:this.$route.query.page!==undefined?parseInt(this.$route.query.page):1,
        FilterItem:'',
        ManufItem:''
      }
  },
  computed:{
    ...mapGetters({
      countProduct: 'product/countProduct',
      tabsArr:'product/tabs',
    }),
  },
  watch:{
      '$route.query'(to){
        if(to.page!==undefined){
          this.page = to.page-0;
        }else{
          this.page = 1
        }
      }
  },
  methods:{
    changePage(pagenum){
      this.page = pagenum
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
      if(pagenum==1){
        this.$router.replace({ name: "catalog-catalog", params: {catalog:this.$route.params.catalog}, query: {card_filter:this.FilterItem,manuf:this.ManufItem,page:undefined} })
      }else{
        this.$router.replace({ name: "catalog-catalog", params: {catalog:this.$route.params.catalog}, query: {card_filter:this.FilterItem,manuf:this.ManufItem,page:pagenum} })
      }
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
