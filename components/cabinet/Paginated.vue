<template >
    <div  class="catalog-paginated">
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
