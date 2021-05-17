<template>
    <div class="cost-product-block">
        <div class="cost-product-amount">
            <el-input-number 
            v-model="num" 
            size="mini"
            @change="handleChange" :min="1" :max="10"
            ></el-input-number>
        </div>
        <div class="cost-product-input">
            <strong>Размер</strong>
            <el-radio-group v-model="radio" size="mini">
                <el-radio  
                v-for="(item,idx) in product_data" :key="idx"
                @change="changePrice(item)"
                :label="item.id"
                border>{{item.name}}</el-radio>
            </el-radio-group>
        </div>
        <el-button type="danger" :disabled="count>0?false:true">В корзину</el-button>
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
    props:{
      product_data:{
        type:Array,
        default(){
          return{}
        }
      }
    },
    components:{
    },
    data() {
      return {
        num: 1,
        radio: '',
        priceCart:'',
        price:[],
        count:[],
        id_filter:[],

      };
    },
    computed:{
      //updatePriceAndCountInPage()
    },
    methods: {
      changePrice(item){
         this.$emit('Sendprice', item.price);
        // this.$emit('update:count', item.count);
       // this.radio = item.id;
       
        this.priceCart = item.price
      },
      handleChange(value) {
         
      },
        /**
       * Функция обновляет количество товара и цены продукта на странице
       */
      // updatePriceAndCountInPage(){
      //     for(let i in this.productsList){
      //         try{
      //             this.price[i] = this.productsList[i].product[0].price;
      //             this.count[i] = this.productsList[i].product[0].count;
      //             this.id_filter[i] = this.productsList[i].product[0].id;
      //         }catch{
      //             this.price[i] = '';
      //             this.count[i] = '';
      //             this.id_filter[i] = '';
      //         } 
      //     }
      // },
    }
  };
</script>