<template>
    <div class="container"> 
        <Breadcrumb/>
        <h1 class="h1-product">{{productItem.name}}</h1>
        <h2 class="h2-product">
            <i class="el-icon-office-building"></i>
            {{productItem.manufacturer_name}}
        </h2>
        <Galery/>
        <div class="cost-product-section">
            <div class="cost-product-price">
                <span :class="{ butDiscount: discont}">{{price}}</span>
                <strong>руб./{{result.units}}</strong>
                <div v-if="discont" class="catalog-list-block-discount">
                    <strong>{{discont}}</strong>
                    <span>руб/{{result.units}}</span>
                </div>
            </div>
            <CartTovarInput
            :price.sync="price"
            :discont.sync="discont"
            :product_data="productItem.product"
            :units="result.units"
            :multiplicity.sync="result.multiplicity"
            @addToCart = "addToCart"
            @NewChar = "funNewChar"
            @showBasket = "showBasket"
            />
        </div>
        <div class="tabs-product">
            <Tabs
            :product_data="productItem.product"
            :new_char="funChar"
             />
        </div>
        <no-ssr>
        <BasketModal  
        @clickModal = "toggleModal"
        @closeBasket = "closeBasket"
        :dialogFormVisibleModal="dialogFormVisibleModal"
        />
        </no-ssr> 
    </div>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import Galery from '~/components/product/Galery.vue'
import Tabs from '~/components/product/Tabs.vue'
import CartTovarInput from '~/components/catalog/CartTovarInput.vue'
import BasketModal from '~/components/BasketModal.vue'
import { mapGetters,mapActions } from 'vuex'
export default ({
    created() {
    },
    async asyncData ({ app, params, route, error }) {
        try {
            let result = await app.store.dispatch('tovar/getProductItem',params.id)
            let price = result.product[0].price
            let discont = result.product[0].discont
            return{price,discont,result}
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
            dialogFormVisibleModal:false,
        }
    },
    components:{
        Galery,
        Tabs,
        CartTovarInput,
        Breadcrumb,
        BasketModal
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
            cart.product[0]['cost']= data.cost;
            cart.product[0]['count_el'] = data.count_el;
            cart.product[0]['multiplicity'] = data.multiplicity;
            console.log(cart)
            this.ADD_TO_CART(cart)
        },
        funNewChar(data){
            return this.funChar = data

        },
        showBasket(dialogVisible){
            this.dialogFormVisibleModal = dialogVisible
        },
        toggleModal(val,noCloseNotify) { 
            this.dialogFormVisibleModal = val;
            if(noCloseNotify==false){
                this.$notify.closeAll()
            }
        },

        closeBasket(val){ 
            if(val==true){
                this.openNotify()
            }
        },
        openNotify() {
            this.$notify({
            type: 'success',
            title: 'Заказ успешно оформлен',
            dangerouslyUseHTMLString: true,
            duration:4500,
            message: 'На Вашу почту была выслана информация о заказе!',
            // offset: 100
            });
        },       
    },
    head() {
      return {
        title: this.productItem.name,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content:  this.productItem.description.replace(/(&lt;|<([^>]+)>)/ig,"")
          }
        ]
      }
    }
})
</script>
