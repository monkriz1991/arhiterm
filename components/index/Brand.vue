<template>
    <div class="index-brand">
    <h4>Бренды</h4>
        <el-row style="margin-left:-10px;margin-right:-10px;">
            <hooper :settings="hooperSettings">
                <slide
                    v-for="item in category.results" :key="item.id"
                >
                    <nuxt-link :to="`/catalog/factory/${item.id}`" class="nuxt-link-cat">
                        <div class="index-brand-block">
                            <div class="index-brand-block-desc">
                                <strong v-if="item.description !== 'undefined'">
                                    {{item.description}}
                                </strong>
                                <!-- <span>{{item.name}}</span> -->
                            </div>
                            <nuxt-picture loading="lazy"
                                :src="item.img.substring(24)"
                                :alt="item.name"
                            />
                        </div>
                    </nuxt-link>
                </slide>
                <hooper-navigation slot="hooper-addons"></hooper-navigation>
                <hooper-pagination slot="hooper-addons"></hooper-pagination>
            </hooper>
            <div hidden class="index-brand-all">
                <nuxt-link to="/">
                    Все производители
                </nuxt-link>
            </div>
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
