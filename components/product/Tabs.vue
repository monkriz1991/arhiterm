<template>
  <el-tabs :tab-position="tabPosition">
    <el-tab-pane label="Характеристики">
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
    </el-tab-pane>
    <el-tab-pane label="Описание">
        {{$store.state.tovar.productItem.description}}
    </el-tab-pane>
    <el-tab-pane label="Сертификаты">Role</el-tab-pane>
  </el-tabs>
</template>


<script>
  export default {
    props:['product_data','new_char'],
    data() {
      return {
        char_start:this.product_data[0],
        tabPosition: 'left'
      };
    },
    watch: {
      new_char() {
          this.char_start = this.new_char;
      },
    },
    methods:{
      showChar(idx){
          console.log()
          this.show_char = !this.show_char
      }
    },
  };
</script>