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
            <strong>Размер</strong>
              <el-radio  
              v-for="(item,idx) in product_data" :key="idx"
              @change="changePrice(item,idx)"
              :label="idx"
              v-model="radio"
              :disabled="disableRadio"
              size="mini"
              border>{{item.name}}</el-radio>
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
        input_cost:this.product_data[0]!=undefined?this.product_data[0].price:0,
        radio:0,
        priceCart:0,
        count:1,
        discont_price:this.product_data[0].discont,
        disableButton: false,
        disableRadio: false

      };
    },
    beforeMount(){
       this.editProduct(this.product_data[0]);
       this.discontStart(this.product_data[0])
    },
    computed:{
      ...mapGetters({
        basket:'main/basket'
      })
    },
    methods: {
      changePrice(item){
        this.active_id = item
        this.input_cost = item.discont==null?item.price:item.discont
        this.$emit('update:price', item.price)
        this.priceCart = item.discont==null?item.price:item.discont
        this.$emit('NewChar', item)
        this.$emit('update:discont',item.discont)
        this.disableButton = false
        this.num = 1
        this.editProduct(item)
      },
      /** Добавление товара в корзину */
      addToCart(){
        this.$emit('addToCart',{data:this.active_id==null?this.product_data[0]:this.active_id,'count_el':this.count,'cost':this.priceCart})
        this.disableButton = true
        
      },
      /** Изменение кол. товара */
      handleChange(value) {
         this.priceCart = Math.floor(this.input_cost*value*100)/100
         this.count = value
      },
      /** Обновление кол. товара и блокировка кнопок добавить в корзину и inputnumber */
      editProduct(item){
        for(let i in this.basket){
          if(this.basket[i].product[0].id == item.id){
            this.disableButton = true
            this.num = this.basket[i].count_el
            this.handleChange(this.basket[i].count_el) 
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
        this.editProduct(item)
      },
    }
  };
</script>