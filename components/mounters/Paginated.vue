<template >
    <div  class="catalog-paginated">
        <el-pagination
            layout="prev, pager, next"
            @current-change="paginate"
            :page-size="10"
            :current-page.sync="page"
            :total="this.mountersCount">
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
          mountersCount:'mounters/mountersCount',
        }),
    },
    methods:{
      updateData(){
          this.$emit('updateData')
      },
      paginate(){
        this.$addQueryMounters('page',this.page,this.$route,this.$route.params.catalog);
        setTimeout(this.updateData,100);
        if (process.browser){
          window.scrollTo({
                  top: 100,
                  behavior: 'smooth'
          });
        }
      },
    },
    mounted(){

    },
}
</script>
