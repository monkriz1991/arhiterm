<template>
  <div class="container">
    <div class="index-slider">
      <Slider />
    </div>
    <h1 class="title">arhiterm</h1>
    <h2 class="title-h2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Accusamus tempora libero temporibus!
    </h2>
      <Category />
      <Brand />
      <ContentPrev />
  </div>
</template>

<script>
import Slider from '~/components/index/Slider.vue'
import Category from '~/components/index/Category.vue'
import Brand from '~/components/index/Brand.vue'
import ContentPrev from '~/components/index/ContentPrev.vue'
export default {

  data() {
    return {
      // categories: [],
    }
  },
  computed:{
  },
  components:{
    Slider,
    Category,
    Brand,
    ContentPrev,
  },
  methods:{
  },
  mounted(){
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
    max-width: 410px;
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
