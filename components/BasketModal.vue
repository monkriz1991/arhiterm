<template>
    <div class="header-basket"> 
      <vue-bottom-sheet
        max-width="1150px"
        max-height="90%"
        :overlay="true"
        :click-to-close="true"
        :swipe-able="false"
        :rounded="true"
        :background-scrollable="false"
        :is-full-screen="false"
        :background-clickable="true"
         ref="dialogFormVisible">

            <Cart
            v-if="basket.length"
            v-show="dialogForm"
            :cart_data="basket"
            @cartDell = "cartDell"
            @cartUpdate = "cartUpdate"
            @basketCostUpdate = "basketCostUpdate"
            />
            <h4 v-else>Корзина пуста 😢</h4>
            <span v-show="dialogForm" class="dialog-footer">
              <div class="footer-summ">
              <strong>{{basketCost}}</strong>
              <span>руб.</span>
              </div>
                <el-button
                v-if="basket.length"
                type="primary"
                class="add-order"
                @click="dialogForm = false">Оформить заказ</el-button>
                <el-button class="closed-order" @click="closeMeny()">Закрыть</el-button>

            </span>

            <div v-show="!dialogForm" class="dialog-back-block">
              <el-button-group>
                <el-button icon="el-icon-arrow-left" 
                @click="dialogForm = true">В корзину</el-button>
              </el-button-group>
            </div>
            <Form 
            :dialogForm.sync="dialogFormVisible" 
            @updateDialogForm="updateDialogForm" 
            :key="componentKey"
            v-show="!dialogForm"
            />
      </vue-bottom-sheet>
    </div>
</template>

<script>
import Cart from '/components/basket/Cart'
import Form from '/components/basket/Form'
import {mapGetters,mapActions} from 'vuex'
  export default {
    props:['dialogFormVisibleModal'],
    watch:{
      dialogFormVisibleModal: function(newVal) { 
          this.$refs.dialogFormVisible.open()
          
          this.$emit('update:dialogFormVisibleModal', false)
          this.forceRerender();
      },
      // dialogFormVisible: function(newVal,noCloseNotify) { 
      //   this.$emit('clickModal',newVal,noCloseNotify);
      //   this.fromSateButCatMeny(false)
      //   //this.$refs.dialogFormVisible.close();
    
      // },
      
    },
    components:{
      Cart,
      Form
    },
    data() {
      return {
        dialogFormVisible: false,
        dialogForm:true,
        noCloseNotify:false,
        basketCost: 0,
        componentKey: 0,
      }
    },
    computed:{
      ...mapGetters({
        basket:'crate/basket',
        basketItog:'crate/basket_cost',
      }),
    },
    mounted(){
      this.basketCost = this.basketItog.for_amount_itog
    },
    methods:{
      forceRerender() {
        this.componentKey += 1; 
      },
      closeMeny(){
        this.$refs.dialogFormVisible.close();
      },
      updateDialogForm(forse){
        this.$refs.dialogFormVisible.close();
        this.noCloseNotify = true
        this.dialogForm = true;    
        this.$forceUpdate();
        this.$emit('openBasketNotify',true);
      },
      ...mapActions({
        DELL_CART_BASKET:'crate/DELL_CART_BASKET',
        UPDATE_CART_BASKET:'crate/UPDATE_CART_BASKET',
        BASKET_COST:'crate/BASKET_FROM_COST',
        ButCatMeny: 'crate/newSateButCatMeny',
      }),
      cartDell(data){
        this.DELL_CART_BASKET(data)
      },
      cartUpdate(data){
        this.UPDATE_CART_BASKET(data)
      },
      basketCostUpdate(data){
        this.BASKET_COST(data)
        this.basketCost = data.for_amount_itog
      },
      fromSateButCatMeny(data){
        this.ButCatMeny(data)
      },
      
    }
  };
</script>
