<template>
  <div class="container">
      <Slider />
    <!-- <div class="title" v-html="indexItem.h1"></div>
    <div class="title-h2" v-html="indexItem.h5"></div> -->
      <Top />
      <Category />
      <Brand />
      <ContentPrev :indexItem="indexItem" />
  </div>
</template>

<script>
import Slider from '~/components/index/Slider.vue'
import Category from '~/components/index/Category.vue'
import Brand from '~/components/index/Brand.vue'
import Top from '~/components/index/Top.vue'
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
    Top,
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

</style>
