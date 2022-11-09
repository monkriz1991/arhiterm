<template>
    <div class="catalog-nav">
        <el-row style="margin-left:-10px;margin-right:-10px;">
            <hooper :settings="hooperSettings">
                <slide
                v-for="item in facturer.results" :key="item.id"
                >
                        <nuxt-link  :to="{ name: 'factory-factory', params: {factory:`${item.kirilica}`,id:`${item.id}`} }" class="nuxt-link-cat">
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
        await this.$store.dispatch('category/getManufacturer')
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
                mouseDrag:false,
                loop:false,
                breakpoints: {
                    1800: {
                        itemsToShow: 6,
                    },
                    1500: {
                        itemsToShow: 6
                    },
                    900: {
                        itemsToShow: 3
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
        facturer: 'category/manufacturer',
      })
    },
    methods:{
    }
})
</script>
