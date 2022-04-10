<template>
    <div class="header-basket">

        <el-dialog title="Корзина" :visible.sync="dialogFormVisible"  width="60%">
            <Cart
            v-if="basket.length"
            v-show="dialogForm"
            :cart_data="basket"
            @cartDell = "cartDell"
            @cartUpdate = "cartUpdate"
            @basketCostUpdate = "basketCostUpdate"
            />
            <h4 v-else>Корзина пуста 😢</h4>
            <span v-show="dialogForm" slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Продолжить покупки</el-button>
                <el-button
                v-if="basket.length"
                type="primary"
                @click="dialogForm = false">Оформить заказ</el-button>
            </span>
                <!-- <span style="
    border-radius: 5px;
    float: left;
    padding: 10px;
    margin: 0 0px 20px;
    font-weight: 600;
    font-size: 15px;
    width: 100%;
">Уважаемые клиенты, в данный момент заказы не обрабатываются, технические работы<br> будут завершены в ближайшее время. 
                Приносим извенения за доставленные неудобства.</span> -->
            <div v-show="!dialogForm" class="dialog-back-block">
              <el-button-group>
                <el-button icon="el-icon-arrow-left" @click="dialogForm = true">В корзину</el-button>
              </el-button-group>
            </div>
            <Form :dialogForm.sync="dialogFormVisible" @updateDialogForm="updateDialogForm" v-show="!dialogForm"/>
        </el-dialog>
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
        this.dialogFormVisible = newVal
      },
      dialogFormVisible: function(newVal,noCloseNotify) { 
        this.$emit('clickModal',newVal,noCloseNotify);
        this.fromSateButCatMeny(false)
      }
      
    },
    components:{
      Cart,
      Form
    },
    data() {
      return {
        dialogFormVisible: false,
        dialogForm:true,
        noCloseNotify:false
      }
    },
    computed:{
      ...mapGetters({
        basket:'main/basket',
        activeButCatMenyItem:'main/activeButCatMenyItem',
      })
    },
    methods:{
      updateDialogForm(){
        this.$emit('closeBasket',true);
        this.noCloseNotify = true
        this.dialogFormVisible = false;
        this.dialogForm = true;    
        this.$forceUpdate();
      },
      ...mapActions({
        DELL_CART_BASKET:'main/DELL_CART_BASKET',
        UPDATE_CART_BASKET:'main/UPDATE_CART_BASKET',
        BASKET_COST:'main/BASKET_FROM_COST',
        ButCatMeny: 'main/newSateButCatMeny',
      }),
      cartDell(data){
        this.DELL_CART_BASKET(data)
      },
      cartUpdate(data){
        this.UPDATE_CART_BASKET(data)
      },
      basketCostUpdate(data){
        this.BASKET_COST(data)
      },
      fromSateButCatMeny(data){
        this.ButCatMeny(data)
      },

    }
  };
</script>
