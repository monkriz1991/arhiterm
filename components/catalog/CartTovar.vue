<template>
    <div class="catalog-list">
        <el-row :gutter="20">
            <el-col 
            :xs="12" :sm="12" :md="12" :lg="12" :xl="12" 
            v-for="(product,idx) in productsList" :key="idx"
            >
                <div class="catalog-list-block" :class="{ activeImgBlock: show.includes(idx) }">
                    <div class="catalog-list-img" :class="{ activeImgCat: show.includes(idx) }">
                        <el-image
                        :src="product.img"
                        fit="contain"
                        lazy
                        >
                        </el-image>
                        <div class="catalog-list-block-button" :class="{ activeButCat: show.includes(idx) }">
                            <el-button 
                            v-on:click="toggleActive(idx)"
                            type="danger" plain  size="mini" circle
                            >
                                <i class="el-icon-setting"></i>
                            </el-button>
                        </div>
                    </div>
                    <div class="catalog-list-block-desc"> 
                        <nuxt-link :to="`/product/${product.id}`">
                            {{product.name}}
                        </nuxt-link> 
                    <div class="catalog-list-block-price">
                        <strong>{{costProduct[idx]}}</strong>
                        <span>руб/м2</span>
                        <div class="catalog-list-block-cost">
                            <!-- <strong>{{price[idx]}} - {{count[idx]}}</strong> -->
                            <span>руб/м2</span>
                        </div>
                    </div>
                    </div> 
                    <div 
                    v-if="show.includes(idx)"
                    class="catalog-list-input">
                        <CartTovarInput 
                            :product_data="product.product"  
                            @Sendprice="ShowpriceItem"
                        />
                        <CartTovarChar/>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import CartTovarInput from '~/components/catalog/CartTovarInput.vue'
import CartTovarChar from '~/components/catalog/CartTovarChar.vue'
export default {
    data() {
        return {
            costProduct:[],
            show:[],
            num: 1,
            radio: null,
            id_product:0
        };
    },
    components:{
        CartTovarInput,
        CartTovarChar,
    },
    /**
     * хук перед маннтированием страница, но после создания
     */
    // beforeMount(){
    //    this.updatePriceAndCountInPage();
    // },
    computed:{
        productsList(){
            return this.$store.getters['product/productList']
        }
    },
    methods : {

        toggleActive(idx) {
            this.radio = idx;
            if (this.show.includes(idx)) {
                this.show = this.show.filter(entry => entry !== idx);
                return; 
            }else{
                this.show =[]
            }
            this.show.push(idx);
        },
        ShowpriceItem(data,idx){
            this.costProduct = data
            console.log(idx)
        },
    }    
}
</script>