<template>
    <div class="index-top">
    <h4>Популярные товары</h4>
        <el-row style="margin-left:-10px;margin-right:-10px;">
            <hooper :settings="hooperSettings">
                <slide
                    v-for="(item,idx) in tovar" :key="idx" 
                >
                    <nuxt-link :to="`/product/${item.id}`" class="nuxt-link-cat">
                        <div class="index-top-block">
                            <nuxt-picture loading="lazy"
                                :src="item.img.substring(24)"
                                :alt="item.name"
                                format="webp"
                            />
                            
                            <div class="index-top-block-desc">
                                <strong>
                                    {{item.manufacturer_name}}
                                </strong>
                                <span v-if="item.name.length<50">{{item.name}}</span>
                                <span v-else>{{item.name.substring(0,50)+".." }}</span>
                            </div>
                            <div class="index-top-cost">
                                <b>от</b><strong
                                v-for="(item_product,idx) in item.product" :key="idx"
                                v-show="idx==0"
                                >{{item_product.price}}</strong> 
                                <span>руб/{{item.units}}</span>
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
                    1800: {
                        itemsToShow: 3
                    },
                    1500: {
                        itemsToShow: 3
                    },
                    1100: {
                        itemsToShow: 2
                    },
                }
            }
        }
    },
    computed:{
      ...mapGetters({
        tovar: 'main/top'
      })
    },
    mounted(){
      this.getTop()
    },
    methods:{
      ...mapActions('main',['getTop'])
    }
})
</script>
