<template>
    <div class="index-brand">
    <h2>Бренды</h2>
        <el-row style="margin-left:-10px;margin-right:-10px;">
            <hooper :settings="hooperSettings">
                <slide
                    v-for="item in category.results" :key="item.id"
                >
                    <nuxt-link :to="{ name: 'factory-factory', params: {factory:`${item.kirilica}`,id:`${item.id}`} }"  class="nuxt-link-cat">
                        <div class="index-brand-block">
                            <div class="index-brand-block-desc">
                                <strong v-if="item.description !== 'undefined'">
                                    {{item.description}}
                                </strong>
                                <!-- <span>{{item.name}}</span> -->
                            </div>
                            <div class="index-brand-block-img">
                                <nuxt-img 
                                provider="twicpics"
                                sizes="sm:100px md:100px lg:100px"
                                loading="lazy" 
                                :src="item.img.substring(24)" 
                                :alt="item.name"
                                presets="product"
                                />
                            </div>
                        </div>
                    </nuxt-link>
                </slide>
                <hooper-navigation slot="hooper-addons"></hooper-navigation>
                <hooper-pagination slot="hooper-addons"></hooper-pagination>
            </hooper>
        </el-row>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import { Hooper, Slide,
Pagination as HooperPagination,
Navigation  as HooperNavigation
} from 'hooper';
import 'hooper/dist/hooper.css';
export default ({
    components: {
        Hooper,
        Slide,
        HooperPagination,
        HooperNavigation
    },
    data() {
        return {
            hooperSettings: {
                infiniteScroll: true,
                wheelControl:false,
                breakpoints: {
                    300: {
                        itemsToShow: 2
                    },
                    1100: {
                        itemsToShow: 2
                    },
                    1800: {
                        itemsToShow: 4
                    },
                    1500: {
                        itemsToShow: 4
                    },
                }
            }
        }
    },
    computed:{
      ...mapGetters({
        category: 'category/manufacturerIndex'
      })
    },
    mounted(){
      this.getManufacturerIndex()
    },
    methods:{
      ...mapActions('category',['getManufacturerIndex'])
    }
})
</script>