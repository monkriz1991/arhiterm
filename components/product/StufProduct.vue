<template>
    <div class="index-top">
    <h2>С этим товаром покупают</h2>
        <el-row style="margin-left:-10px;margin-right:-10px;">
            <hooper :settings="hooperSettings">
                <slide
                v-for="item in stufProduct" :key="item.id"
                >
                    <nuxt-link :to="{ name: 'product-product', params: {product:`${item.kirilica_name}`,id:`${item.kirilica_name}`} }" class="nuxt-link-cat">
                        <div class="index-top-block">
                            <div class="index-top-block-img">
                                <nuxt-img
                                provider="twicpics"
                                :src="item.img.substring(24)" 
                                :alt="item.name"
                                format="webp"
                                quality="50"
                                sizes="sm:50vw md:50vw lg:50px" 
                                loading="lazy" 
                                />
                            </div> 
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
            </hooper>
        </el-row>
    </div>
</template>


<script>

import { Hooper, Slide,
Pagination as HooperPagination,
Navigation  as HooperNavigation} from 'hooper';
import 'hooper/dist/hooper.css';
export default ({
    props:['stufProduct'],
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
                        itemsToShow: 3,
                    },
                    1500: {
                        itemsToShow: 3
                    },
                    900: {
                        itemsToShow: 1
                    },
                    360: {
                        itemsToShow: 1
                    },
                }
            }
        }
    },
    computed:{
    },
    mounted(){
    },
    methods:{
    }
})
</script>
