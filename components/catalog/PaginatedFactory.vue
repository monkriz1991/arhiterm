<template >
  <div  class="catalog-paginated">
      <el-pagination
          layout="prev, pager, next"
          :page-size="this.productLimit"
          :total="this.countProduct"
          @current-change="paginate"
          :current-page.sync="page"
      >
      </el-pagination>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
export default {
  data() {
      return {
        page:this.$route.query.page!==undefined?parseInt(this.$route.query.page):1,
        FilterItem:''
      }
  },
  computed:{
    ...mapGetters({
      countProduct: 'product/countProduct',
      productLimit: 'product/productLimit',
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
    paginate(){
      if(this.tabsArr.card_filter!=undefined){
        this.FilterItem = this.tabsArr.card_filter.join(',')
      }else{
        this.FilterItem = undefined
      }
      if(this.page==1){
        this.$router.replace({ name: "factory-factory", params: {factory:this.$route.params.factory}, query: {card_filter:this.FilterItem,page:undefined} })
      }else{
        this.$router.replace({ name: "factory-factory", params: {factory:this.$route.params.factory}, query: {card_filter:this.FilterItem,page:this.page} })
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
