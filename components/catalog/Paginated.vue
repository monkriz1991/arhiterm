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
          FilterItem:'',
          ManufItem:''
        }
    },
     computed:{
        ...mapGetters({
            countProduct: 'product/countProduct',
            productLimit: 'product/productLimit',
            activeButCatMenyItem:'main/activeButCatMenyItem',
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
      ...mapActions({
        ButCatMeny: 'main/newSateButCatMeny',
      }),
      paginate(){
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
        if(this.page==1){
          this.$router.replace({ name: "catalog-catalog", params: {catalog:this.$route.params.catalog}, query: {card_filter:this.FilterItem,manuf:this.ManufItem,page:undefined} })
        }else{
          this.$router.replace({ name: "catalog-catalog", params: {catalog:this.$route.params.catalog}, query: {card_filter:this.FilterItem,manuf:this.ManufItem,page:this.page} })
        }
        
        setTimeout(this.updateData,100);
        this.fromSateButCatMeny(false)
        if (process.browser){
            window.scrollTo({
                    top: 100,
                    behavior: 'smooth'
            });
        }
        ;
      },
      updateData(){
          //this.$emit('changePage',this.page);
      },
      fromSateButCatMeny(data){
        this.ButCatMeny(data)
      }
    },
    mounted(){

    },
}
</script>
