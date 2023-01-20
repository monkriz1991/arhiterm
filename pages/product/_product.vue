<template>
    <div class="container" > 
            <Breadcrumb/>
        <div itemscope itemtype="https://schema.org/Product">
        <h1 class="h1-product" itemprop="name">{{productItem.name}}</h1>
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
            @addToChosen = "addToChosen"
            />
            <div class="dilivery-cart-block">
                <div class="dilivery-cart">
                    <el-drawer
                    class="darwer-meny"
                    :visible.sync="drawer"
                    :with-header="false">
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
                    :with-header="false">
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
                    :with-header="false">
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
            </div>
        </div>
        <Tabs
        :product_data="productItem.product"
        :productItemDesc="productItem.description"
        :new_char="funChar"
        />
        <div v-show="stufProduct.length" class="stus-product">
            <StufProduct
            :stufProduct="stufProduct"
            />
        </div>
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
    mounted(){
        if (this.$route.fullPath.indexOf(this.$router.options.base) == -1 &&
            this.$route.fullPath.toLocaleLowerCase().indexOf(this.$router.options.base.toLowerCase()) == 0) {
        let base = this.$router.options.base
        let regex = new RegExp("(//[^/]+)"+escapeRegExp(base),"i")
        let newLoc = document.location.href.replace(regex,"$1"+base)
        if (newLoc != document.location.href) {
            document.location.replace(newLoc)
        }
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
        'StufProduct': () => import('~/components/product/StufProduct.vue'),       
    },
    computed:{
        ...mapGetters({
            productItem: 'tovar/productItem',
            stufProduct: 'tovar/stufProduct'
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
            this.ADD_TO_CART(cart)
        },
        addToChosen(data){
            let cart = JSON.parse(JSON.stringify(this.productItem));
            let ret =  cart.product.filter((item)=> item.id == data.data.id);
            cart.product = ret;
            cart['img'] = 'https://new.arhiterm.by'+cart['img'];
            // console.log(cart)
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
        title: this.productItem.name+' - купить в Arhiterm.by',
        meta: [
        {
            hid: 'description',
            name: 'description',
            content:  this.productItem.description_seo
        },
        {
            hid: 'og:type',
            property: 'og:type',
            content: 'product',
        }, 
        {
            hid: 'og:title',
            property: 'og:title',
            content: this.productItem.name +' - arhiterm.by',
        },
        {
            hid: 'og:url',
            property: 'og:url',
            content: `https://arhiterm.by/product/${this.productItem.kirilica_name}`,
        }, 
        {
            hid: 'og:description',
            property: 'og:description',
            content: this.productItem.description_seo,
        },
        {
            hid: 'og:image',
            property: 'og:image',
            content: `https://new.arhiterm.by${this.productItem.img}`,
        }, 
        {
            hid: 'og:site_name',
            property: 'og:site_name',
            content: 'Arhiterm',
        }, 
        {
            hid: 'og:locale',
            property: 'og:locale',
            content: 'ru_RU',
        },
        ],
        // link: [
        //     {
        //         rel: 'canonical',
        //         href: 'https://arhiterm.by/' + this.productItem.kirilica_name.replace(/^./,"")
        //     }
        // ]
      }
    }
})
</script>
