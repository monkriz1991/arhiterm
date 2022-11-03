<template>
    <div class="index-topcat">
    <h2>Каталог</h2>
        <el-row :gutter="20">
        <el-col
        v-for="item in category" :key="item.id"
        v-show="item.show_in_start==true"
         :sm="12" :md="12"  :xl="6" :lg="5" :xs="12">
            <nuxt-link :to="{ name: 'catalog-catalog', params: {catalog:`${item.kirilica}`,id:`${item.id}`} }" class="nuxt-link-cat">
                <div class="index-topcat-block">
                    <div class="category-in-cyrcle">
                        <nuxt-img 
                        provider="twicpics"
                        sizes="sm:100px md:100px lg:100px"
                        loading="lazy" 
                        :src="item.img.substring(24)" 
                        :alt="item.name"
                        presets="product"
                        />
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
    props:['category'],
    data() {
        return {
        }
    },
    computed:{
        ...mapGetters({
        }),
    },
    mounted(){
    },
    methods:{
        ...mapActions({
        }),
    },
})
</script>
