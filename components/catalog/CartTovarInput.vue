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
            <el-radio-group v-model="radio" size="mini">
                <el-radio  
                v-for="(item,idx) in product_data" :key="idx"
                @change="changePrice(item)"
                :label="idx"
                border>{{item.name}}</el-radio>
            </el-radio-group>
        </div>
        <el-button 
          type="danger" 
          :disabled="count>0?false:false"
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
      },
      addToCart(){
        this.$emit('addToCart',this.active_id==null?this.product_data[0]:this.active_id)
      },
      handleChange(value) {
         this.priceCart = this.input_cost*value
      }
    }
  };
</script>