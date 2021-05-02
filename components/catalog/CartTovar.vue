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
                        <strong>{{price[idx]}}</strong>
                         <span>руб/м2</span>
                        <div class="catalog-list-block-cost">
                            <strong>{{price[idx]}} - {{count[idx]}}</strong>
                            <span>руб/м2</span>
                        </div>
                    </div>
                    </div> 
                    <div 
                    v-if="show.includes(idx)"
                    class="catalog-list-input">
                        <CartTovarInput :count.sync="count[idx]"
                                        :price.sync="price[idx]" 
                                        :id_product="product.id" 
                                        :product="product.product" 
                                        :n="idx"/>
                        <CartTovarChar :count="count[idx]"/>
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
            price:[],
            count:[],
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
    beforeMount(){
       this.updatePriceAndCountInPage();
    },
    computed:{
        productsList(){
            return this.$store.getters['product/productList']
        }
    },
    methods : {
        /**
         * Функция обновляет количество товара и цены продукта на странице
         */
        updatePriceAndCountInPage(){
            for(let i in this.productsList){
                this.price[i] = this.productsList[i].product[0].price;
                this.count[i] = this.productsList[i].product[0].count;
            }
        },
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
    }    
}
</script>