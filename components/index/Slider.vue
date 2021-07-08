<template>
  <div class="index-slider" >
    <el-carousel 
      :autoplay="false"
      height="350px"
      trigger="click"
    >
    <no-ssr>
      <el-carousel-item  
        v-for="(item,idx) in slides" :key="idx"
        
      >
        <div class="slider-block" >
          <div class="slider-content" >
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
          <img class="slider-image" 
            :src="item.img"
            :alt="item.title" 
          />
        </div>

      </el-carousel-item>
      </no-ssr>
    </el-carousel>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default ({
  components:{
  },
    data() {
        return {
        }
    },
    computed:{
      ...mapGetters({
        slides: 'main/sliderItems'
      })
    },
    mounted(){
      this.getSlider()
    },
    methods:{
      ...mapActions('main',['getSlider']),
      
    }
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