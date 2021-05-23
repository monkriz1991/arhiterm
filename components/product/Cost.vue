<template>
    <div class="cost-product-section">
       <div class="cost-product-price">
            <span>1.92</span>
            <strong>руб./м</strong>
        </div>
        <CartTovarInput :product_data="product_data" />
    </div>
</template>

<script>
import CartTovarInput from '~/components/catalog/CartTovarInput.vue'
  export default {
    props:['product_data'],
    components:{
        CartTovarInput,
    },
    data() {
      return {
      };
    },
    methods: {

    }
  };
</script>