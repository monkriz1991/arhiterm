<template>
    <div class="container"> 
            <Breadcrumb/>
        <h1 class="h1-product">{{productItem.name}}</h1>
        <div class="product-top">
            <i class="el-icon-office-building manuf-name"></i> 
            <h2 class="h2-product">
                {{productItem.manufacturer_name}}
            </h2>
            <h3 v-if="productItem.mfr_name" class="h3-product">
                -
                {{productItem.mfr_name}}
            </h3>
        </div>
        <Galery :productItems="productItem"/>
        <div class="cost-product-section">
            <div class="cost-product-price">
                <span :class="{ butDiscount: discont}">{{price}}</span>
                <strong>руб.</strong>
                <div v-if="discont" class="catalog-list-block-discount">
                    <strong>{{discont}}<span>руб/{{result.units}}</span></strong>
                </div>
                <strong class="cost-product-price-unit">1 {{result.units}}</strong>
                <b>/</b>
            </div>
            <div class="kod-product">
                <el-tooltip class="item" effect="dark" content="Код товара" placement="top-start">
                <i class="el-icon-info"></i>
                </el-tooltip>
                <b>:</b>
                <strong>{{kodProduct}}</strong>
            </div>
            <CartTovarInput
            :price.sync="price"
            :discont.sync="discont"
            :kodProduct.sync="kodProduct"
            :product_data="productItem.product"
            :units="result.units"
            :multiplicity.sync="result.multiplicity"
            @addToCart = "addToCart"
            @NewChar = "funNewChar"
            @toggleModal = "toggleModal"
            />
            <div class="dilivery-cart-block">
                <no-ssr>
                    <div class="dilivery-cart">
                        <el-drawer
                        class="darwer-meny"
                        :visible.sync="drawer"
                        :with-header="true">
                        <Dostavka
                        :visible.sync ="drawer" />
                        </el-drawer>
                        <el-button
                        @click="drawer = true"
                        class="drawer-button-meny"
                        size="small"
                        icon="el-icon-takeaway-box"
                        >Доставка
                        </el-button>
                    </div>
                    <div class="dilivery-cart">
                        <el-drawer
                        class="darwer-meny"
                        :visible.sync="drawerPay"
                        :with-header="true">
                        <Payment
                        :visible.sync ="drawer" />
                        </el-drawer>
                        <el-button
                        @click="drawerPay = true"
                        class="drawer-button-meny"
                        size="small"
                        icon="el-icon-wallet"
                        >Оплата
                        </el-button>
                    </div>
                    <div class="dilivery-cart">
                        <el-drawer
                        class="darwer-meny"
                        :visible.sync="drawerkont"
                        :with-header="true">
                        <Drawerkont
                        :visible.sync ="drawer" />
                        </el-drawer>
                        <el-button
                        @click="drawerkont = true"
                        class="drawer-button-meny"
                        size="small"
                        icon="el-icon-phone-outline"
                        >Контакты
                        </el-button>
                    </div>
                </no-ssr>
            </div>
        </div>
        <div class="tabs-product">
                <Tabs
                :product_data="productItem.product"
                :productItemDesc="productItem.description"
                :new_char="funChar"
                />
        </div>
        <no-ssr>
        <BasketModal  
        @clickModal = "toggleModal"
        :dialogFormVisibleModal.sync="dialogFormVisibleModal"
        />
        </no-ssr> 
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default ({
    async asyncData ({ app, params, route, error }) {
        try {
            let result = await app.store.dispatch('tovar/getProductItem',params.product)
            let price = result.product[0].price
            let discont = result.product[0].discont
            let kodProduct = result.product[0].name
            return{price,discont,result,kodProduct}
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
            drawer: false,
            drawerPay: false,
            drawerkont: false,
        }
    },
    components:{
        'Breadcrumb': () => import('~/components/Breadcrumb.vue'),
        'Galery': () => import('~/components/product/Galery.vue'),
        'Tabs': () => import('~/components/product/Tabs.vue'),
        'CartTovarInput': () => import('~/components/catalog/CartTovarInput.vue'),
        'BasketModal': () => import('~/components/BasketModal.vue'),
        'Dostavka': () => import('~/components/product/Dostavka.vue'),
        'Payment': () => import('~/components/product/Payment.vue'),
        'Drawerkont': () => import('~/components/product/Drawerkont.vue'),        
    },
    computed:{
        ...mapGetters({
            productItem: 'tovar/productItem'
        })
    },
    methods:{
        ...mapActions({
           ADD_TO_CART: 'crate/ADD_TO_CART'
        }),
        addToCart(data){
            let cart = JSON.parse(JSON.stringify(this.productItem));
            let ret =  cart.product.filter((item)=> item.id == data.data.id);
            cart.product = ret;
            cart.product[0]['cost']= data.cost;
            cart.product[0]['count_el'] = data.count_el;
            cart.product[0]['multiplicity'] = data.multiplicity;
            cart['img'] = 'https://new.arhiterm.by'+cart['img'];
            console.log(cart)
            this.ADD_TO_CART(cart)
        },
        funNewChar(data){
            return this.funChar = data
        },
        toggleModal(val,noCloseNotify) { 
            this.dialogFormVisibleModal = true;
             this.$notify.closeAll()
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
          {
            hid: 'description',
            name: 'description',
            content:  this.productItem.description_seo
          },
          {
              hid: 'og:title',
              name: 'og:title',
              content: this.productItem.name,
          },
          {
              hid: 'og:image',
              property: 'og:image',
              content: `https://new.arhiterm.by${this.productItem.img}`,
          },
          {
              hid: 'og:description',
              property: 'og:description',
              content: this.productItem.description_seo,
          },
          {
              hid: 'og:url',
              property: 'og:url',
              content: `https://arhiterm.by/product/${this.productItem.kirilica_name}`,
          },  
          {
              hid: 'og:type',
              property: 'og:type',
              content: 'product',
          }, 
        ]
      }
    }
})
</script>
