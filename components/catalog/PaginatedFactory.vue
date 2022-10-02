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
import {mapGetters} from "vuex";

export default {
    data() {
        return {
          page:this.$route.query.page!==undefined?parseInt(this.$route.query.page):1,
        }
    },
     computed:{
        ...mapGetters({
            countProduct: 'product/countProduct',
            productLimit: 'product/productLimit'
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
        if(this.page==1){
         this.$addQueryFactory('page',undefined,this.$route,this.$route.params.factory);
        }else{
          this.$addQueryFactory('page',this.page,this.$route,this.$route.params.factory);
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
      fromSateButCatMeny(data){
       // this.ButCatMeny(data)
      },
      updateData(){
         // this.$emit('changePage',this.page);
      },
    },
    mounted(){

    },
}
</script>
