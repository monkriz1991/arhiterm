<template >
    <div  class="cabinet-paginated">
        <el-pagination
            layout="prev, pager, next"
            :page-size="limit"
            :total.sync="this.countAllBaskets"
            @current-change="paginate"
            :current-page.sync="page"
        >
        </el-pagination>
    </div>
</template>


<script>
import {mapActions, mapGetters} from "vuex";

export default {
    data() {
        return {
          page:this.$route.query.page-0,
          limit:5,
        }
    },
     computed:{
        ...mapGetters({
            countAllBaskets:'main/countAllBaskets',
        }),
    },
    methods:{
          paginate(){
        this.addParam('page',this.page);
        this.getAllBaskets({limit:this.limit,offset:((this.page-1)*this.limit)});
      },
      addParam(key,val){
        let params = JSON.parse(JSON.stringify(this.$route.query));
        params[key] = val;
        this.setUrl(params)
    },
      setUrl(params){
        this.$router.replace({path:'/userCabinet/store/','query':params}).catch(err => {});
    },
       ...mapActions({
        getAllBaskets:'main/getallBaskets',
      })
    },
    mounted(){
         this.getAllBaskets({limit:this.limit,offset:((this.page-1)*this.limit)})
    },
}
</script>
<style>
.cabinet-paginated{
    float: left;
    width: 100%;
    margin: 20px 0 0;
}
</style>
