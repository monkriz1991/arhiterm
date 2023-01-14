<template>
  <div class="index-slider" >
    <hooper :settings="hooperSettings">
      <slide
      v-for="(item,idx) in slides" :key="idx"
      >
        <div class="slider-block" >
          <div class="slider-content" :style="{background:item.color}">
            <div  v-loading="loading" :class="[item.video!=null?'preload-video':'']">
            <video class="video-slider" v-if="item.video!=null"  preload="auto" muted="" autoplay="" loop="" webkit-playsinline="" playsinline="" :src="item.video"></video>
            <nuxt-link :to="item.link">
              <h3 :class="[item.color=='#FFFFFFFF'?'color-slider':'']">{{ item.title }}</h3>
              <!-- <div v-html="item.description"></div> -->
            </nuxt-link>
            </div>
          </div>
          <nuxt-link :to="item.link">
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
          </nuxt-link>
        </div>
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
      <!-- <hooper-pagination slot="hooper-addons"></hooper-pagination> -->
  </hooper>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import { Hooper, Slide,
Pagination as HooperPagination,
Navigation  as HooperNavigation} from 'hooper';
export default ({
  props:['slides'],
  components:{
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation
  },
    data() {
        return {
          loading: false,
          hooperSettings: {
            autoPlay:true,
            playSpeed:7000,
            infiniteScroll: false,
            wheelControl:false,
            itemsToShow: 1,
            centerMode: true
            }
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
.index-slider .hooper{
  height: 400px !important;
  margin: 0px 0 0px !important;
}
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
  .slider-content .color-slider{
  color: #e11923 !important;
}
.index-slider .hooper-next, .index-slider .hooper-prev {
    top: 85% !important;
  }
@media (max-width: 991px){
  .index-slider .hooper {
      height: 280px !important;
      margin: 0px 0 0px !important;
  }
}
</style>