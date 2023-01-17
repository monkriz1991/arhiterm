<template>
    <div class="catalog-list" v-loading="loading">
        <div class="catalog-list-tags">
            <el-tag
            :key="tag"
            v-for="tag in tabsArr.card_filter_rus"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
            </el-tag>
            <el-tag
            :key="tag"
            v-for="tag in tabsArr.manuf_filter_rus"
            closable
            :disable-transitions="false"
            @close="handleCloseManuf(tag)">
            {{tag}}
            </el-tag>
        </div>
        <el-row :gutter="20">
            <el-col
            :xs="24" :sm="12" :md="12" :lg="12" :xl="12"
            v-for="(product,idx) in productsList" :key="idx"
            >
                <div class="catalog-list-block">
                    <nuxt-link
                    :class="{disabledLink:!price[idx]}"
                        :to="{ name: 'product-product', params: {product:`${product.kirilica_name}`,id:`${product.kirilica_name}`} }" 
                    >
                    <div class="catalog-list-img" >
                        <nuxt-img 
                        provider="twicpics"
                        loading="lazy" 
                        width="180" height="180"
                        :src="product.img.substring(24)" 
                        :alt="product.name"
                        quality="75"
                        />
                        <div
                        v-on:click.prevent
                        v-show="price[idx]"
                        class="catalog-list-block-button">
                            <el-button
                            v-on:click="toggleActive(idx)"
                            type="danger" plain  size="mini" circle
                            >
                                <i :class="['el-icon-zoom-in']"></i>
                            </el-button>
                        </div>
                    </div>
                    <div class="catalog-list-block-desc">
                        <div
                        v-on:click.prevent
                        v-if="product.manufacturer_name"
                        class="catalog-manuf">
                            <i class="el-icon-office-building"></i>
                            {{product.manufacturer_name}}
                        </div>
                            <span v-if="product.name.length<65">{{product.name}}</span>
                            <span v-else>{{product.name.substring(0,65)+".." }}</span>
                        <div class="catalog-list-block-price">
                            <b v-if="product.product.length>1&&product.product.length!=0">от</b>
                            <strong :class="{ butDiscount: discont[idx]}">
                                {{price[idx]}}
                            </strong>
                            <span v-if="product.product.length!=0">руб/{{product.units}}</span>
                        </div>
                    </div>
                    </nuxt-link>
                </div>
                <el-dialog
                :visible="show.includes(idx)&&centerDialogVisible"
                :before-close="handleCloseModal"
                width="30%"
                center>
                    <div
                    class="catalog-list-input">
                        <CartTovarInput
                        ref="cartTovarInput"
                        :price.sync="price[idx]"
                        :units="product.units"
                        :multiplicity.sync="product.multiplicity"
                        :discont.sync="discont[idx]"
                        :product_data="product.product"
                        @Sendprice = "updatePriceAndCountInPage"
                        @addToCart = "addToCart"
                        @NewChar = "funNewChar"
                        @toggleModal = "toggleModal"
                        />
                        <CartTovarChar
                        :product_filter="product.product"
                        :new_char="funChar"
                        />
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
        <no-ssr>
        <BasketModal
        @clickModal = "toggleModal"
        :dialogFormVisibleModal.sync="dialogFormVisibleModal"/>
        </no-ssr>
    </div>
</template>

<script>
import CartTovarInput from '~/components/catalog/CartTovarInput.vue'
import CartTovarChar from '~/components/catalog/CartTovarChar.vue'
import BasketModal from '~/components/BasketModal.vue'
import {mapGetters,mapActions} from 'vuex'
export default {
    props:['productsList','categoriesNested','categoryManuf'],
    beforeCreate(){
    },
    data() {
        return {
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
            checkListManuf:[],
            checkList:[],
            cats:[],
            tabsItem:[],
            visible:false,
            activeButCatMeny:false,
            dialogFormVisibleModal:false,
            centerDialogVisible: false,
            FilterItem:[],
            ManufItem:[],
        };
    },
    components:{
        CartTovarInput,
        CartTovarChar,
        BasketModal,
    },
    mounted(){
    },
    beforeMount(){
       this.updatePriceAndCountInPage();
    },
    computed:{
        ...mapGetters({
            activeButCatMenyItem:'main/activeButCatMenyItem',
            tabsArr:'product/tabs'
        }),
    },
    watch:{
        productsList(){
            this.updatePriceAndCountInPage()
        },
        activeButCatMenyItem(data) {
            this.fromSateButCatMeny(data)
        },
        $route (to, from){
        },
    },
    methods : {
        handleClose(item){
            let filter = ''
            this.UPDATE_TABS(item)
           
            if(this.tabsArr.card_filter_rus!=''){
                console.log(this.categoriesNested)
                for(let item in this.categoriesNested.list_filter){         
                    for(let itemin in this.categoriesNested.list_filter[item].chice){       
                        for(let fill in this.tabsArr.card_filter_rus){
                            if(this.tabsArr.card_filter_rus[fill]==this.categoriesNested.list_filter[item].chice[itemin].value){
                                filter +=this.categoriesNested.list_filter[item].chice[itemin].kirilica +','
                            }
                        }
                    } 
                } 
                if(this.tabsArr.manuf!=undefined){
                    this.ManufItem = this.tabsArr.manuf.join(',')
                }
                filter = filter.slice(0,-1);
                this.FilterItem = filter
                this.checkFilRoute(this.FilterItem,this.ManufItem)
            }else{
                if(this.tabsArr.manuf!=undefined){
                    this.ManufItem = this.tabsArr.manuf.join(',')
                }
                this.FilterItem = undefined
                this.checkFilRoute(this.FilterItem,this.ManufItem)
            } 
        },
        handleCloseManuf(item){
            let filter = ''
            this.UPDATE_TABS_MANUF(item)         
            if(this.tabsArr.manuf_filter_rus!=''){
                for(let item in this.categoryManuf.results){   
                    for(let items in this.tabsArr.manuf_filter_rus){       
                        if(this.tabsArr.manuf_filter_rus[items]==this.categoryManuf.results[item].name){
                            filter +=this.categoryManuf.results[item].kirilica +','
                        }
                    }
                }
                if(this.tabsArr.card_filter!=undefined){
                    this.FilterItem = this.tabsArr.card_filter.join(',')
                }
                filter = filter.slice(0,-1);
                this.ManufItem = filter
                this.checkFilRoute(this.FilterItem,this.ManufItem)
            }else{
                if(this.tabsArr.card_filter!=undefined){
                    this.FilterItem = this.tabsArr.card_filter.join(',')
                }
                this.ManufItem = undefined
                this.checkFilRoute(this.FilterItem,this.ManufItem)
            } 
            
        },  
        checkFilRoute(FilterItem,ManufItem){
            if(this.$route.name=='catalog-catalog'){
                this.$router.replace({ name: "catalog-catalog", params: {catalog:this.$route.params.catalog}, query: {card_filter:FilterItem,manuf:ManufItem} })
            }else if(this.$route.name=='factory-factory'){
                this.$router.replace({ name: "factory-factory", params: {factory:this.$route.params.factory}, query: {card_filter:FilterItem} })
            }
        },
        hidePreload(item){
            setTimeout(() => {
            this.loading=!this.loading;
            }, 500);
        },
        ...mapActions({
           ADD_TO_CART: 'crate/ADD_TO_CART',
           ADD_TO_TABS: 'product/ADD_TO_TABS',
           UPDATE_TABS: 'product/UPDATE_TABS',
           UPDATE_TABS_MANUF: 'product/UPDATE_TABS_MANUF',
           DELL_TABS_FILL: 'product/DELL_TABS_FILL',
           ButCatMeny: 'main/newSateButCatMeny',
        }),
        toggleActive(idx) {
            this.centerDialogVisible = true
            this.activeButCatMeny = true
            this.fromSateButCatMeny(this.activeButCatMeny)
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
        addToCart(data){
            let cart = JSON.parse(JSON.stringify(this.productsList.find(i=>i.id==data.data.parent)));
            let ret =  cart.product.filter((item)=> item.id == data.data.id);
            cart.product = ret;
            cart.product[0]['cost'] = data.cost;
            cart.product[0]['count_el'] = data.count_el;
            cart.product[0]['multiplicity'] = data.multiplicity;
            this.ADD_TO_CART(cart)
        },
        funNewChar(data){
            return this.funChar = data
        },
        toggleModal(val,noCloseNotify) {
            this.dialogFormVisibleModal = true;
            this.show =[]
            this.fromSateButCatMeny(this.activeButCatMeny)
            this.$notify.closeAll()
            this.handleCloseModal()
        },
        fromSateButCatMeny(data){
            if(data==false){
                this.show =[]
            }
            this.activeButCatMeny = data
            this.ButCatMeny(data)
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
        handleCloseModal(done) {
            this.centerDialogVisible = false
            this.show =[]
      }
    }
}
</script>
<style>
.disabledLink{
    pointer-events: none;
}

</style>
