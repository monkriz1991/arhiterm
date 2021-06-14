<template >
    <div  class="cabinet-paginated">
        <el-pagination
            layout="prev, pager, next"
            :page-size="100"
            :total="12"
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

    },
    methods:{

    },
    mounted(){

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