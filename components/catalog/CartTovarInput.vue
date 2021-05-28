<template>
    <div class="cost-product-block">
        <div class="cost-product-amount">
            <el-input-number 
            v-model="num" 
            size="mini"
            @change="handleChange" :min="1"
            ></el-input-number>
        </div>
        <div class="cost-product-input">
            <strong>Размер</strong>
              <el-radio  
              v-for="(item,idx) in product_data" :key="idx"
              @change="changePrice(item)"
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
        >В корзину</el-button>
        <div 
      
        class="cost-product-price-catalog">
            <span>{{priceCart}}</span>
            <strong>руб/м2</strong>
        </div>
    </div>
</template>


<script>
  export default {
    created() {
     // console.log(this.product)  //undefined;
    },
    props:["product_data","price"],
    components:{
    },
    data() {
      return {
        num: 1,
        active_id:null,
        input_cost:this.product_data[0]!=undefined?this.product_data[0].price:0,
        radio:0,
        priceCart:this.product_data[0]!=undefined?this.product_data[0].price:0,
        count:[],
        disableButton: false,
        disableRadio: false

      };
    },
    computed:{
    },
    methods: {
      changePrice(item){
        this.active_id = item;
        this.input_cost = item.price,
        this.$emit('update:price', item.price);
        this.priceCart = item.price
        this.$emit('NewChar', item)
        console.log(item)
      },
      addToCart(){
        this.$emit('addToCart',{data:this.active_id==null?this.product_data[0]:this.active_id,'count_el':this.count,'cost':this.priceCart})
        this.disableButton = true
        
      },
      handleChange(value) {
         this.priceCart = Math.floor(this.input_cost*value*100)/100
         this.count = value
      }
    }
  };
</script>