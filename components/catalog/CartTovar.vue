<template>
    <div class="catalog-list" v-loading="loading">
        <div class="catalog-list-tags">
            <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
            </el-tag>
        </div>
        <el-row :gutter="20">
            <el-col
            :xs="24" :sm="12" :md="12" :lg="12" :xl="12"
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
                        <div
                        v-show="price[idx]"
                        class="catalog-list-block-button" :class="{ activeButCat: show.includes(idx) }">
                            <el-button
                            v-on:click="toggleActive(idx)"
                            type="danger" plain  size="mini" circle
                            >
                                <i :class="[show.includes(idx)?'el-icon-close':'el-icon-setting' ]"></i>
                            </el-button>
                        </div>
                    </div>
                    <div class="catalog-list-block-desc">
                        <nuxt-link
                        :class="{disabledLink:!price[idx]}"
                        :to="`/product/${product.id}`"
                        >
                            {{product.name}}
                        </nuxt-link>
                        <div class="catalog-list-block-price">
                            <strong>{{price[idx]}}
                                <div class="catalog-list-block-discount">
                                    <strong>{{discont[idx]}}</strong>
                                    <span>руб/м2</span>
                                </div>
                            </strong>
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
                        ref="cartTovarInput"
                        :price.sync="price[idx]"
                        :discont.sync="discont[idx]"
                        :product_data="product.product"
                        @Sendprice = "updatePriceAndCountInPage"
                        @addToCart = "addToCart"
                        @NewChar = "funNewChar"
                        />
                        <CartTovarChar
                        :product_filter="product.product"
                        :new_char="funChar"
                        />
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
    props:['productsList'],
    beforeCreate(){

        //this.hidePreload()

        // setTimeout(() => {
        //     this.loading=!this.loading;
        // }, 500);
    },
    data() {
        return {
            dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
            loading: false,
            show:[],
            num: 1,
            radio: null,
            id_product:0,
            price:[],
            discont:[],
            oneprice:[],
            lastprice:[],
            funChar:[],

        };
    },
    components:{
        CartTovarInput,
        CartTovarChar,
    },
    mounted(){
        //this.hidePreload()
    },
    /**
     * хук перед маннтированием страница, но после создания
     */
    beforeMount(){
       this.updatePriceAndCountInPage();
    },
    beforeUpdate(){

    },
    computed:{
        ...mapGetters({
           // productsList: 'product/productList',
        }),
    },
    watch:{
        productsList(){
            this.updatePriceAndCountInPage()
        }
    },
    methods : {
        hidePreload(item){
            setTimeout(() => {
            this.loading=!this.loading;
            }, 500);
        },
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
                    this.discont[i] = this.productsList[i].product[0].discont;
                    this.oneprice[i] = this.productsList[i].product[0].price;
                    this.lastprice[i] = this.productsList[i].product.slice(-1)[0].price;
                }catch{
                    this.price[i] = pr;
                    this.lastprice[i] = '';
                    this.oneprice[i] = '';
                    this.discont[i] = '';
                }
            }
        },
        /**
         *
         */
        addToCart(data){
            let cart = JSON.parse(JSON.stringify(this.productsList.find(i=>i.id==data.data.parent)));
            let ret =  cart.product.filter((item)=> item.id == data.data.id);
            cart.product = ret;
            cart.product[0]['cost'] = data.cost;
            cart.product[0]['count_el'] = data.count_el;
            this.ADD_TO_CART(cart)
        },
        funNewChar(data){
            return this.funChar = data

        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        // updateData(){
        //     this.updatePriceAndCountInPage();
        // }
    }
}
</script>
<style>
.disabledLink{
    pointer-events: none;
}

</style>
