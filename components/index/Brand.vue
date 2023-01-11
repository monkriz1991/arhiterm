<template>
    <div class="index-brand">
    <h2>Бренды</h2>
        <el-row style="margin-left:-10px;margin-right:-10px;">
            <hooper :settings="hooperSettings">
                <slide
                    v-for="item in facturer.results" :key="item.id"
                >
                    <nuxt-link :to="{ name: 'factory-factory', params: {factory:`${item.kirilica_name}`,id:`${item.id}`} }"  class="nuxt-link-cat">
                        <div class="index-brand-block">
                            <div class="index-brand-block-desc">
                                <!-- <strong v-if="item.description !== 'undefined'">
                                    {{item.description}}
                                </strong> -->
                                <span>{{item.name}}</span>
                            </div>
                            <div class="index-brand-block-img">
                                <nuxt-img 
                                provider="twicpics"
                                width="100" height="100"
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
                <!-- <hooper-pagination slot="hooper-addons"></hooper-pagination> -->
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
    props:['facturer'],
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
      })
    },
    mounted(){
    },
    methods:{
    }
})
</script>