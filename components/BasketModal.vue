<template>
    <div class="header-basket">
        <el-button type="text" @click="dialogFormVisible = true">
            <i class="el-icon-shopping-cart-full"></i>
        </el-button>
        <el-dialog title="Корзина" :visible.sync="dialogFormVisible"  width="60%">
            <Cart 
            v-if="basket.length"
            v-show="dialogForm"
            :cart_data="basket"
            @cartDell = "cartDell"
            />
            <h4 v-else>Корзина пуста 😢</h4>
            <span v-show="dialogForm" slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Продолжить покупки</el-button>
                <el-button type="primary" @click="dialogForm = false">Оформить заказ</el-button>
            </span>
            <div v-show="!dialogForm" class="dialog-back-block">
              <el-button-group>
                <el-button icon="el-icon-arrow-left" @click="dialogForm = true">В корзину</el-button>
              </el-button-group>
            </div>
            <Form v-show="!dialogForm"/>
        </el-dialog>
    </div>
</template>

<script>
import Cart from '/components/basket/Cart'
import Form from '/components/basket/Form'
import {mapGetters,mapActions} from 'vuex'
  export default {
    components:{
      Cart,
      Form
    },
    data() {
      return {
        dialogFormVisible: false,
        dialogForm:true,
      }
    },
    computed:{
      ...mapGetters({
        basket:'main/basket',
      })
    },
    methods:{
      ...mapActions({
        DELL_CART_BASKET:'main/DELL_CART_BASKET'
      }),
      cartDell(data){
        this.DELL_CART_BASKET(data)
      }
    }
  };
</script>