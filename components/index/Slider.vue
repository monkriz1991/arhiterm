<template>
  <div class="index-slider" >
    <el-carousel 
      :autoplay="true"
      height="350px"
      trigger="click"
      arrow="always"
      :interval="43000"
    >
    <no-ssr>
      <el-carousel-item  
        v-for="(item,idx) in slides" :key="idx"
      >
        <div class="slider-block" >
          <div class="slider-content" :style="{background:item.color}">
            <div  v-loading="loading" :class="[item.video!=null?'preload-video':'']">
            <video class="video-slider" v-if="item.video!=null"  preload="auto" muted="" autoplay="" loop="" webkit-playsinline="" playsinline="" :src="item.video"></video>
            <nuxt-link :to="item.link">
              <h3>{{ item.title }}</h3>
              <div v-html="item.description"></div>
            </nuxt-link>
            </div>
          </div>
          <nuxt-img 
          class="slider-image" 
          provider="twicpics"
          loading="lazy" 
          v-if="item.img.substring(24)!='https://new.arhiterm.by/media/img/noimg.png'"
          :src="item.img.substring(24)" 
          :alt="item.title"
          width="200"
          height="200"
          presets="product"
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
  props: {
    slides: {
            type: Array,
            default: () => []
            }
    },
  components:{
  },
    data() {
        return {
          loading: false
        }
    },
    computed:{
    },
    mounted(){
    },
    methods:{
      
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