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
            <el-radio-group    v-model="radio" size="mini">
                <el-radio  
                v-for="(item,idx) in product" :key="idx"
                @change="changePrice(item)"
                :label="item.id" border>{{item.name}}</el-radio>
            </el-radio-group>
        </div>
        <el-button type="danger" :disabled="count>0?false:true">В корзину</el-button>
        <div 
      
        class="cost-product-price-catalog">
            <span>{{radio}}</span>
            <strong>руб/м2</strong>
        </div>
    </div>
</template>



<script>
  export default {
    props:['id_product','product','n','price','count'],
    components:{
    },
    data() {
      return {
        num: 1,
        radio: this.id_product,

      };
    },
    methods: {
      changePrice(item){
        this.$emit('update:price', item.price);
        this.$emit('update:count', item.count);
      },
      handleChange(value) {
          console.log(value)
      }
    }
  };
</script>