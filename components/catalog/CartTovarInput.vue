<template>
    <div class="cost-product-block">
        <div class="cost-product-amount">
            <el-input-number
            v-model="num"
            :disabled="disableButton"
            size="mini"
            @change="handleChange" :min="1"
            ></el-input-number>
        </div>
        <div class="cost-product-input">
            <strong>{{name_radioGroup}}</strong>
              <el-radio
              v-for="(item,idx) in product_data" :key="idx"
              @change="changePrice(item,idx)"
              :label="idx"
              v-model="radio"
              :disabled="disableRadio"
              size="mini"
              :class="{ 'check-backet': findMatch(item.id) }"
              border>
              <i
              v-show="findMatch(item.id)"
              class="el-icon-shopping-cart-2"></i>
                <strong
                v-if="item.filter_show_value"
                >{{item.filter_show_value}}</strong>
                <strong v-else>
                  {{item.name}}
                </strong>
                <el-popover
                v-if="item.count==0"
                placement="top"
                width="200"
                trigger="click"
                content="Позиция под заказ!">
                  <el-button
                  slot="reference"
                  icon="el-icon-warning-outline"
                  size="mini"
                  circle
                  ></el-button>
                </el-popover>
              </el-radio>

        </div>
        <el-button
          type="danger"
          :disabled="disableButton"
          @click="addToCart"
          :class="{'disabled': disableButton === true}"
        >
          <span v-if="disableButton === false">В корзину</span>
          <span v-else>В корзине</span>
        </el-button>
        <div

        class="cost-product-price-catalog">
            <span>{{priceCart}}</span>
            <strong>руб/м2</strong>
        </div>
    </div>
</template>


<script>
import {mapGetters,mapActions} from 'vuex'
  export default {
    created() {
    },
    props:["product_data","price","discont"],
    components:{
    },
    data() {
      return {
        num: 1,
        active_id:null,
        arr_basket_id:[],
        classBasket:'none-basket',
        input_cost:this.product_data[0]!=undefined?this.product_data[0].price:0,
        radio:0,
        priceCart:0,
        count:1,
        discont_price:this.product_data[0].discont!=null?this.product_data[0].discont:0,
        disableButton: false,
        disableRadio: false,
        name_radioGroup:this.product_data[0].filter_show_name!=null?this.product_data[0].filter_show_name:'Артикул',

      };
    },
    beforeMount(){
       this.editProduct(this.product_data[0].id);
       this.discontStart(this.product_data[0])
       //this.editToBasket(this.product_data)

    },
    computed:{
      ...mapGetters({
        basket:'main/basket'
      })
    },
    watch:{
      basket:{
        handler(val){
          console.log(val)
          for(let i of val){
            console.log(this.active_id)
               this.editProduct(i.product[0].id);
          }
        },
         deep: true
      }
    },
    methods: {
      changePrice(item){
        this.count = 1
        this.active_id = item
        this.input_cost = item.discont==null?item.price:item.discont
        this.$emit('update:price', item.price)
        this.priceCart = item.discont==null?item.price:item.discont
        this.name_radioGroup = item.filter_show_name!=null?item.filter_show_name:'Артикул'
        this.$emit('NewChar', item)
        this.$emit('update:discont',item.discont)
        this.disableButton = false
        this.num = 1
        this.editProduct(item.id)
      },
      /** Добавление товара в корзину */
      addToCart(){
        this.$emit('addToCart',{data:this.active_id==null?this.product_data[0]:this.active_id,'count_el':this.count,'cost':this.priceCart})
        this.disableButton = true
        this.classBasket = 'in-basket'
        this.arr_basket_id.push(this.active_id==null?this.product_data[0].id:this.active_id.id)
        
      },
      /** Изменение кол. товара */
      handleChange(value) {
         this.priceCart = Math.floor(this.input_cost*value*100)/100
         this.count = value
      },
      /** Обновление кол. товара и блокировка кнопок добавить в корзину и inputnumber */
      editProduct(item){
        for(let i in this.basket){
          this.arr_basket_id.push(this.basket[i].product[0].id)
          if(this.basket[i].product[0].id == item){
            //this.classBasket = 'in-basket'
            this.disableButton = true
            this.num = this.basket[i].product[0].count_el
            this.handleChange(this.basket[i].product[0].count_el)
          }
        }
      },
      discontStart(item){
        if(item.discont!=null){
          this.priceCart = item.discont
          this.input_cost = item.discont
        }else{
          this.priceCart = item!=undefined?item.price:0
          this.input_cost = item!=undefined?item.price:0
        }
       // this.editProduct(item)
      },
      findMatch(id) {
          return this.arr_basket_id.includes(id);
      }
    }
  };
</script>

<style>
body .el-popover--plain {
    padding: 10px 10px;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
}
.cost-product-input .check-backet{
      border: 1px solid #fa9600  ;
}
.cost-product-input .check-backet.is-bordered.is-checked{
  border-color: #fa9600  !important;
}
.cost-product-input .check-backet.is-checked .el-radio__inner{
  border-color: #fa9600  !important;
  background: #fa9600  !important;
}
.cost-product-input .el-icon-shopping-cart-2{
  position: absolute;
  bottom: -3px;
  background: #fff;
  font-size: 12px;
  left: -5px;
  color: #fa9600;
  border-radius: 50%;
}
.cost-product-input .el-radio--mini.is-bordered {
    padding: 6px 10px 0 10px;
}    
</style>
