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
        }
      }
  },
    methods:{
      paginate(){
        this.$addQueryFactory('page',this.page,this.$route,this.$route.params.id);
        setTimeout(this.updateData,100);
        if (process.browser){
            window.scrollTo({
                    top: 100,
                    behavior: 'smooth'
            });
        }
        ;
      },
      updateData(){
          this.$emit('changePage',this.page);
      },
    },
    mounted(){

    },
}
</script>
