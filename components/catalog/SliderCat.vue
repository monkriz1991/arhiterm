<template>
    <div class="catalog-nav">
        <el-row style="margin-left:-10px;margin-right:-10px;">
            <hooper :settings="hooperSettings">
                <slide
                v-for="item in category" :key="item.id"
                >
                    <div>
                        <nuxt-link  :to="{ name: 'catalog-catalog', params: {catalog:`${item.kirilica_name}`,id:`${item.id}`} }" class="nuxt-link-cat">
                            <div class="index-topcat-block">
                                <div class="category-in-cyrcle">
                                    <nuxt-img 
                                    provider="twicpics"
                                    width="40" height="40"
                                    loading="lazy" 
                                    :src="item.img.substring(24)" 
                                    :alt="'Изображение категории ' + item.name"
                                    presets="product"
                                    />
                                </div>
                                <strong>{{item.name}}
                                </strong>
                            </div>
                        </nuxt-link>
                    </div>
                </slide>
                <hooper-navigation slot="hooper-addons"></hooper-navigation>
            </hooper>
        </el-row>
    </div>
</template>


<script>
import { mapGetters,mapActions } from 'vuex'
import { Hooper, Slide,
Pagination as HooperPagination,
Navigation  as HooperNavigation} from 'hooper';
import 'hooper/dist/hooper.css';
export default ({
    async fetch() {
        // await this.$store.dispatch('category/getCategoryIndex')
    },
    components: {
        Hooper,
        Slide,
        HooperPagination,
        HooperNavigation
    },
    data() {
        return {
            hooperSettings: {
                infiniteScroll: false,
                wheelControl:false,
                mouseDrag:true,
                loop:false,
                breakpoints: {
                    1800: {
                        itemsToShow: 8,
                    },
                    1500: {
                        itemsToShow: 8
                    },
                    900: {
                        itemsToShow: 4
                    },
                    360: {
                        itemsToShow: 2
                    },
                }
            }
        }
    },
    computed:{
      ...mapGetters({
        category: 'category/categoryIndex',
      })
    },
    mounted(){

    },
    methods:{
        ...mapActions({
        }),
    }
})
</script>
