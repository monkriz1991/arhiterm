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
    methods:{
      paginate(){
        this.$addQuery('page',this.page,this.$route,this.$route.params.catalog);
        setTimeout(this.updateData,100);
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
