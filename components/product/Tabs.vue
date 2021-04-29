<template>
  <el-tabs :tab-position="tabPosition">
    <el-tab-pane label="Характеристики">
        <div class="cost-product-char">
            <p>
                <strong>Код товара</strong>
                <span>PEXTRK016X</span>
            </p>
            <p>
                <strong>D, мм</strong>
                <span>16х2,0</span>
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
    data() {
      return {
        tabPosition: 'left'
      };
    }
  };
</script>