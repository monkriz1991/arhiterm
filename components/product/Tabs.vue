<template>
    <div class="tabs-product">
      <div class="cost-product-char">
        <p>
          <strong>Код товара</strong>
          <span>{{char_start.name}}</span>
        </p>
        <p
          v-for="(item,idx) in char_start.filter_dict" :key="idx"
        >
          <strong>{{item.name}}</strong>
          <span>{{item.value}}</span>
        </p>
      </div>

      <div 
      class="tabs-description"
      itemprop="description"
      v-html="productItemDesc">
      </div>
    </div>
</template>

<script>
  export default {
    props:['product_data','new_char','productItemDesc'],
    mounted() {
      if (process.browser){
        window.addEventListener('resize', this.updateWidth);
        this.updateWidth();
      }
    },
    data() {
      return {
        char_start:this.product_data[0],
        tabPosition: 'left',
        width: 0,
        tabShow:true?this.productItemDesc!='':false,
      };
    },
    watch: {
      new_char() {
          this.char_start = this.new_char;
      },
    },
    methods:{
      showChar(idx){
          this.show_char = !this.show_char
      },
      updateWidth() {
        this.width = window.innerWidth;
        if(this.width<=991){
          this.tabPosition = 'top'
        }else{
          this.tabPosition = 'left'
        }
      },
    },

  };
</script>