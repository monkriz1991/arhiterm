<template>
  <div class="container">
    <div class="index-slider">
      <Slider />
    </div>
    <div class="title" v-html="indexItem.h1"></div>
    <div class="title-h2" v-html="indexItem.h5"></div>
      <Category />
      <Brand />
      <ContentPrev :indexItem="indexItem" />
  </div>
</template>

<script>
import Slider from '~/components/index/Slider.vue'
import Category from '~/components/index/Category.vue'
import Brand from '~/components/index/Brand.vue'
import ContentPrev from '~/components/index/ContentPrev.vue'
import {mapActions,mapGetters} from 'vuex'
export default {

  data() {
    return {
      // categories: [],
    }
  },
  computed:{
    ...mapGetters({
      indexItem:'main/indexItem'
    })
  },
  components:{
    Slider,
    Category,
    Brand,
    ContentPrev,
  },
  methods:{
    ...mapActions({
        getIndex: 'main/getIndex'
    }),
  },
  mounted(){
    this.getIndex()
  },
}
</script>
<style>

.title {
    display: block;
    font-weight: 900;
    font-size: 23px;
    color: #35495e;
    letter-spacing: 1px;
    float: left;
    margin: 20px 0 10px;
    width: 100%;
}
.title-h2{
    max-width: 430px;
    font-size: 15px;
    margin: 0px 0 60px;
    float: left;
    font-weight: 500;
    line-height: 1.5;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

</style>
