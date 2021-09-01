<template>
    <div class="index-topcat">
    <h4>Категории</h4>
        <el-row :gutter="20">
        <el-col
        v-for="item in category" :key="item.id"
        :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
            <nuxt-link :to="`/catalog/${item.id}`" class="nuxt-link-cat">
                <div class="index-topcat-block">
                    <img :src="item.img" :alt="item.name">
                    <strong>{{item.name}}
                        <!-- <span>140 / наименований</span> -->
                    </strong>
                </div>
            </nuxt-link>
        </el-col>
        <div class="index-topcat-all">
            <nuxt-link to="/">
                Все категории
            </nuxt-link>
        </div>
        </el-row>
    </div>
</template>



<script>
import { mapGetters,mapActions } from 'vuex'
export default ({
    data() {
        return {
        }
    },
    computed:{
      ...mapGetters({
        category: 'category/categoryIndex'
      })
    },
    mounted(){
      this.getCategoryIndex()
    },
    methods:{
      ...mapActions('category',['getCategoryIndex'])
    }
})
</script>
