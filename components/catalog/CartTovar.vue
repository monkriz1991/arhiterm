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
                            <strong>{{oneprice[idx]}} - {{lastprice[idx]}}</strong>
                            <span>руб/м2</span>
                        </div>
                    </div>
                    </div> 
                    <div 
                    v-if="show.includes(idx)"
                    class="catalog-list-input">
                        <CartTovarInput 
                        :price.sync="price[idx]"
                        :product_data="product.product"
                        @Sendprice = "updatePriceAndCountInPage" 
                        @addToCart = "addToCart"
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
import {mapGetters,mapActions} from 'vuex'
export default {
    data() {
        return {
            show:[],
            num: 1,
            radio: null,
            id_product:0,
            price:[],
            oneprice:[],
            lastprice:[],
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
        },
    },
    methods : {
        ...mapActions({
           ADD_TO_CART: 'main/ADD_TO_CART'
        }),
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

        /**
       * Функция обновляет количество товара и цены продукта на странице
       */
        updatePriceAndCountInPage(pr,id){

            for(let i in this.productsList){
                try{
                    this.price[i] = this.productsList[i].product[0].price;
                    this.oneprice[i] = this.productsList[i].product[0].price;
                    this.lastprice[i] = this.productsList[i].product.slice(-1)[0].price;
                    //this.count[i] = this.productsList[i].product[0].count;
                    //this.id_filter[i] = this.productsList[i].product[0].id;
                }catch{
                    this.price[i] = pr;
                    this.lastprice[i] = '';
                    this.oneprice[i] = '';
                   // this.count[i] = '';
                   // this.id_filter[i] = '';
                } 
            }
            
        },
        addToCart(data){
            for(let i in this.productsList){
                if(data.parent == this.productsList[i].id){
                    data = this.productsList[i].product.filter((item)=> item.id == data.id);
                } 
            }
           console.log(data)
            this.ADD_TO_CART(data)
        }
    }    
}
</script>