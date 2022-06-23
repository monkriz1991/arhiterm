<template>
    <div class="index-topcat">
    <h2>Каталог</h2>
        <el-row :gutter="20">
        <el-col
        v-for="item in category.results" :key="item.id"
        v-show="item.show_in_start==true"
         :sm="12" :md="12"  :xl="6" :lg="5" :xs="12">
            <nuxt-link @click.native="handlerLoading" :to="`/catalog/${item.id}`" class="nuxt-link-cat">
                <div class="index-topcat-block">
                    <div class="category-in-cyrcle">
                        <nuxt-picture loading="lazy" :src="item.img.substring(24)" :alt="item.name"/>
                    </div>
                    <strong>{{item.name}}
                    </strong>
                </div>
            </nuxt-link>
        </el-col>
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
            category: 'category/categoryIndex',
            loadingItem:'main/loadingItem',
        }),
    },
    mounted(){
      this.getCategoryIndex()
    },
    methods:{
        ...mapActions({
            getCategoryIndex:'category/getCategoryIndex',
            setLoading:'main/newLoadingItem',
        }),
        handlerLoading(item){
            this.setLoading(true)
        },
    },
})
</script>
