<template>
    <div class="cost-product-block">
        <div class="cost-product-amount">
            <el-input-number
            v-model="num"
            :step="multiplicity"
            :disabled="disableButton"
            size="mini"
            @change="handleChange" :min="multiplicity"
            ></el-input-number>
            <span class="units"><b>|</b>{{units}}</span>
                <el-popover
                v-if="multiplicity>1"
                placement="top"
                width="220"
                trigger="click">
                  <div>
                    Стоимость указана за 1 {{units}},<br>  
                    заказ кратно
                    <span v-if="units=='шт'">{{multiplicity}} {{units}}</span>
                    <span v-else>{{multiplicity}} {{units}}</span>
                  </div>
                  <el-button
                  slot="reference"
                  icon="el-icon-warning-outline"
                  size="mini"
                  circle
                  ></el-button>
                </el-popover>

          <div
          class="cost-product-price-catalog">
              <span>{{priceCart}}</span>
              <strong>руб</strong>
          </div>
        </div>
        <div class="cost-product-input">
            <strong>{{name_radioGroup}}</strong>
            <div class="cost-row">
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
     
    </div>
</template>


<script>
import {mapGetters,mapActions} from 'vuex'
  export default {
    // created() {
    // },
    props:["product_data","price","discont",'units','multiplicity'],
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
       // multiplicity:this.multiplicity,
        discont_price:this.product_data[0].discont!=null?this.product_data[0].discont:0,
        disableButton: false,
        disableRadio: false,
        name_radioGroup:this.product_data[0].filter_show_name!=null?this.product_data[0].filter_show_name:'Артикул',

      };
    },
    mounted(){
       this.discontStart(this.product_data[0])
       this.editProduct(this.product_data[0].id);
    },
    computed:{
      ...mapGetters({
        basket:'main/basket'
      })
    },
    watch:{
      basket:{
        handler(val,arr){
          if(arr.length==0){
            this.editProduct('arrNull');
          }
          for(let i of arr){
            this.editProduct(i.product[0].id);
          }
          for(let i of val){
            if(this.active_id!=null&&this.active_id.id==i.product[0].id){
              this.editProduct(i.product[0].id);
            }
          }
        },
       deep: true
      },
    },
    methods: {
      changePrice(item){
        this.count = this.multiplicity   
        this.active_id = item
        this.input_cost = item.discont==null?Math.round(item.price*this.multiplicity*100)/100 :Math.round(item.discont*this.multiplicity*100)/100 
        this.$emit('update:price', item.price)
        this.priceCart = item.discont==null?Math.round(item.price*this.multiplicity*100)/100 :Math.round(item.discont*this.multiplicity*100)/100 
        this.name_radioGroup = item.filter_show_name!=null?item.filter_show_name:'Артикул'
        this.$emit('NewChar', item)
        this.$emit('update:discont',item.discont)
        this.disableButton = false
        this.num = 1
        this.editProduct(item.id)

      },
      /** Добавление товара в корзину */
      addToCart(){
        this.$emit('addToCart',{data:this.active_id==null?this.product_data[0]:this.active_id,'count_el':this.count,'cost':this.priceCart,'multiplicity':this.multiplicity})
        this.disableButton = true
        this.classBasket = 'in-basket'
        this.arr_basket_id.push(this.active_id==null?this.product_data[0].id:this.active_id.id)
        this.open()
      },
      roundToNearest(number, multiple) {
          return Math.round(number / multiple) * multiple;
      },
      sleep(){

      },
      /** Обновление кол. товара и блокировка кнопок добавить в корзину и inputnumber */
      editProduct(item){

        if(item=='arrNull'){
          this.handleChange(this.multiplicity)
        }
        this.arr_basket_id = []
        this.disableButton = false
        this.classBasket = 'none-basket'
        for(let i in this.basket){
          this.arr_basket_id.push(this.basket[i].product[0].id)
          if(this.basket[i].product[0].id == item){   
            this.disableButton = true
              if(this.active_id!=null&&this.basket[i].product[0].id!=this.active_id.id){
                this.disableButton = false
              }
              if(this.active_id!=null&&this.basket[i].product[0].id==this.active_id.id){
                this.num = this.basket[i].product[0].count_el    
                this.handleChange(this.basket[i].product[0].count_el) 
              }
              if(this.active_id==null&&this.basket[i].product[0].id){
                this.num = this.basket[i].product[0].count_el    
                this.handleChange(this.basket[i].product[0].count_el) 
              }
          }
        }
      },
      discontStart(item){
        
        if(item.discont!=null){
          this.priceCart =  Math.round(item.discont*this.multiplicity*100)/100
          this.input_cost = Math.round(item.discont*this.multiplicity*100)/100
        }else{
          this.priceCart = item!=undefined?Math.round(item.price*this.multiplicity*100)/100:0
          this.input_cost = item!=undefined?Math.round(item.price*this.multiplicity*100)/100:0
        }
      },
      /** Изменение кол. товара */
      handleChange(value) {
          
          this.num = value
          if(value%this.multiplicity!==0){
            this.num = this.roundToNearest(value, this.multiplicity);
            setTimeout(this.sleep,100) 
          }
          this.count = value  
            
          if(this.multiplicity>1){
            value = value/this.multiplicity
          }
         
          this.priceCart = Math.round(this.input_cost*value*100)/100
      },
      findMatch(id) {
          return this.arr_basket_id.includes(id);
      },
      open() {
        const h = this.$createElement;
        this.$notify({
          //title: 'Товар в корзине',
          dangerouslyUseHTMLString: true,
          duration:3000,
          message: h('el-button',{on:{click:this.dialogBasketModal},class:'el-icon-shopping-cart-full'},'Перейти в корзину'),
         // offset: 100
        });
      },
      dialogBasketModal(){
        this.$emit('showBasket',true)
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
    bottom: -8px;
    background: #fff;
    font-size: 16px;
    left: -5px;
    color: #fa9600;
    border-radius: 50%;
}
.cost-product-input .el-radio--mini.is-bordered {
    padding: 6px 10px 0 10px;
}
</style>
