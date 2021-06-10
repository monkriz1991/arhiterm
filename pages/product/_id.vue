<template>
    <div class="container">
        <h1 class="h1-product">{{productItem.name}}</h1>
        <h2 class="h2-product">
            <i class="el-icon-office-building"></i>
            {{productItem.manufacturer_name}}
        </h2>
        <Galery/>
        <div class="cost-product-section">
            <div class="cost-product-price">
                <span>{{price}}</span>
                <strong>руб./м</strong>
                <div class="catalog-list-block-discount">
                    <strong>{{discont}}</strong>
                    <span>руб/м2</span>
                </div>
            </div>
            <CartTovarInput 
            :price.sync="price"
            :discont.sync="discont"
            :product_data="productItem.product"
            @addToCart = "addToCart"
            @NewChar = "funNewChar" 
            />
        </div>
        <div class="tabs-product">
            <Tabs 
            :product_data="productItem.product"
            :new_char="funChar"
             />
        </div>
    </div>
</template>

<script>
import Galery from '~/components/product/Galery.vue'
import Tabs from '~/components/product/Tabs.vue'
import CartTovarInput from '~/components/catalog/CartTovarInput.vue'
import { mapGetters,mapActions } from 'vuex'
export default ({
    created() {
    },
    async asyncData ({ app, params, route, error }) {
        try {
            let result = await app.store.dispatch('tovar/getProductItem',params.id)
            let price = result.product[0].price
            let discont = result.product[0].discont
            return{price,discont}
        } catch (err) {
        return error({
            statusCode: 404,
            message: 'Товар не найдена или сервер не доступен'
        })
        }
    },
    data(){
        return{
            funChar:[],
        }
    },
    components:{
        Galery,
        Tabs,
        CartTovarInput,
    },
    computed:{
        ...mapGetters({
            productItem: 'tovar/productItem'
        })
        //this.price = this.productItem.product[0].price,
    },
    methods:{
        ...mapActions({
           ADD_TO_CART: 'main/ADD_TO_CART'
        }),
        addToCart(data){
            let cart = JSON.parse(JSON.stringify(this.productItem));
            let ret =  cart.product.filter((item)=> item.id == data.data.id);
            cart.product = ret;
            cart['cost']= data.cost;
            cart['count_el'] = data.count_el;
            cart['status'] = 'basket'
            this.ADD_TO_CART(cart)
        },
        funNewChar(data){
            return this.funChar = data
            
        }
    }
})
</script>
