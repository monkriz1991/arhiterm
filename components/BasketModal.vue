<template>
    <div class="header-basket">
        <el-button type="text" @click="dialogFormVisible = true">
            <i class="el-icon-shopping-cart-full"></i>
        </el-button>
        <el-dialog title="Корзина" :visible.sync="dialogFormVisible"  width="60%">
            <Cart 
            v-if="basket.length"
            :cart_data="basket"
            />
            <h4 v-else>Корзина пуста 😢</h4>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Продолжить покупки</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">Оформить заказ</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Cart from '/components/basket/Cart'
import {mapGetters} from 'vuex'
  export default {
    components:{
      Cart
    },
    data() {
      return {
        dialogFormVisible: false,
      }
    },
    computed:{
      ...mapGetters({
        basket:'main/basket',
      })
    },
  };
</script>