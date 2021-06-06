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
          page:1,
        }
    },
     computed:{
        ...mapGetters({
            countProduct: 'product/countProduct',
            productLimit: 'product/productLimit'
        }),
       pages(){
         console.log(Math.ceil(this.countProduct/this.productLimit))
          return Math.ceil(this.countProduct/this.productLimit)
       }
    },
    methods:{
      paginate(){
        this.$emit('changePage',this.page);
      }
    },
    mounted(){

    },
}
</script>
