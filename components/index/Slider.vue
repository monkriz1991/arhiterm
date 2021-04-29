<template>
  <el-carousel 
    :autoplay="false"
    height="350px"
    trigger="click"
  >
    <el-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>

export default ({
    data() {
        return {

        }
    },
})
</script>

<style>
.el-carousel__container{
  border-radius:10px ;  
}
.el-carousel{
  border-radius: 10px;
}
.el-carousel__item{
  padding: 40px 80px;
  border-radius: 10px;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>