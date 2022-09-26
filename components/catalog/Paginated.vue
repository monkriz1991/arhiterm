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
        }
    },
     computed:{
        ...mapGetters({
            countProduct: 'product/countProduct',
            productLimit: 'product/productLimit',
            activeButCatMenyItem:'main/activeButCatMenyItem',
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
        if(this.page==1){
         this.$addQuery('page',undefined,this.$route,this.$route.params.catalog);
        }else{
          this.$addQuery('page',this.page,this.$route,this.$route.params.catalog);
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
