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
                <div class="catalog-list-block">
                    <div class="catalog-list-img" >
                        <div
                        v-if="product.manufacturer_name"
                        class="catalog-manuf">
                            <i class="el-icon-office-building"></i>
                            {{product.manufacturer_name}}
                        </div>
                        <nuxt-link
                        :class="{disabledLink:!price[idx]}"
                        :to="`/product/${product.id}`"
                        >
                        <el-image
                        :src="product.img"
                        fit="contain"
                        >
                        </el-image>
                        </nuxt-link>
                        <div
                        v-show="price[idx]"
                        class="catalog-list-block-button">
                            <el-button
                            v-on:click="toggleActive(idx)"
                            type="danger" plain  size="mini" circle
                            >
                                <i :class="['el-icon-shopping-cart-1']"></i>
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
                        <div 
                        class="catalog-list-block-price">
                            <strong :class="{ butDiscount: discont[idx]}">
                                {{price[idx]}}
                                <div v-if="discont[idx]" 
                                class="catalog-list-block-discount">
                                    <strong>{{discont[idx]}}</strong>
                                    <span>руб/{{product.units}}</span>
                                </div>
                            </strong>
                            <span>руб/{{product.units}}</span>
                            <div class="catalog-list-block-cost">
                                <b>от</b><strong>{{oneprice[idx]}}</strong> 
                                <b>до</b><strong>{{lastprice[idx]}}</strong>
                                <span>руб/{{product.units}}</span>
                            </div>
                        </div>
                    </div>
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
                        @showBasket = "showBasket"
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
        @closeBasket = "closeBasket"
        :dialogFormVisibleModal="dialogFormVisibleModal"/>
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

        //this.hidePreload()

        // setTimeout(() => {
        //     this.loading=!this.loading;
        // }, 500);
    },
    // async mounted(){
    //     this.ButCatMeny()
    // },
    data() {
        return {
            dynamicTags: [],
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
            visible:false,
            activeButCatMeny:false,
            dialogFormVisibleModal:false,
            centerDialogVisible: false,
        };
    },
    components:{
        CartTovarInput,
        CartTovarChar,
        BasketModal,
    },
    mounted(){
        this.parser(this.$route)
        
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
            activeButCatMenyItem:'main/activeButCatMenyItem',
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
        this.parser(to)
      }
    },
    methods : {
      parseCheckboxes(to,cats, key){
        let res = [];
         let checkList = JSON.parse(decodeURI(to.query[key]))
        let newkey = 'name'
        if (key ==='card_filter'){
            newkey = 'value'
          let nrerr = []
          for(let i of checkList){
            nrerr.push(i.split("||")[0])
          }
          checkList = nrerr;
          this.cats = cats
         res = cats.map(function(x){if(checkList.includes(""+x.id)){return x[newkey]}}).filter(function( element ) {return element !== undefined;})

        }
        if (key ==='manuf'){
          res = cats.map(function(x){
            if(checkList.includes(x.id)){
               return x.name
            }
          }).filter(function( element ) {return element !== undefined;})
        }
         return  res
      },
        hidePreload(item){
            setTimeout(() => {
            this.loading=!this.loading;
            }, 500);
        },
        ...mapActions({
           ADD_TO_CART: 'main/ADD_TO_CART',
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
        /**
         *
         */
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
        handleClose(tag) {
            debugger;
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
          let a = this.categoryManuf.results.find(x=>x.name===tag)
          if(a!==undefined){
            let data2 = JSON.parse(decodeURI(this.$route.query.manuf))
            let res = data2.splice(JSON.parse(decodeURI(this.$route.query.manuf)).indexOf(a.id),1)
              if(data2.length){
                this.addParam('manuf',JSON.stringify(data2));
              }else{
                this.delParam('manuf');
              }
          }

          let b = this.cats.find(x=>x.value===tag)
          if(b!==undefined){
            let data = JSON.parse(decodeURI(this.$route.query.card_filter))
            let res1 = data.splice(JSON.parse(decodeURI(this.$route.query.card_filter)).indexOf(b.id),1)
              if(data.length){
                this.addParam('card_filter',JSON.stringify(data));
              }else{
                this.delParam('card_filter');
              }
          }
        },
        addParam(key,val){
        let params = JSON.parse(JSON.stringify(this.$route.query));
        params[key] = val;
        this.setUrl(params)
    },
    delParam(key){
        let params = JSON.parse(JSON.stringify(this.$route.query));
        delete params[key];
        this.setUrl(params)
    },
    setUrl(params){
          if(this.$route.params.catalog!==undefined){
              this.$router.replace({path:'/catalog/'+this.$route.params.catalog,'query':params});
          }
          if(this.$route.params.id!==undefined){
              this.$router.replace({path:'/catalog/factory/'+this.$route.params.id,'query':params});
          }
    },
      parser(to){
          if(to.query.manuf!==undefined) {
        let checkListManuf = JSON.parse(decodeURI(to.query.manuf))

          this.checkListManuf =  this.parseCheckboxes(to,this.categoryManuf.results,'manuf')
      }else{
        this.checkListManuf = []
        }

      if(this.categoriesNested!=undefined&&to.query.card_filter!==undefined && Array.isArray(this.categoriesNested.list_filter)) {
        let cats = []
        for(let a of this.categoriesNested.list_filter){
          if(a.chice){
            for(let i of a.chice){
              // if(i.chice) {
              //   for (let j of i.chice) {
                  cats.push(i)
              //   }
              // }
          }
          }

        }
       this.checkList = this.parseCheckboxes(to,cats,'card_filter')
      }else{
        this.checkList = []
      }
      this.dynamicTags = this.checkList.concat(this.checkListManuf)
      },
        showBasket(dialogVisible){
            this.dialogFormVisibleModal = dialogVisible
        },
        toggleModal(val,noCloseNotify) { 
            this.dialogFormVisibleModal = val;
            this.show =[]
            this.fromSateButCatMeny(this.activeButCatMeny)
            if(noCloseNotify==false){
                this.$notify.closeAll()
            }
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
