<template>
  <div class="container">
    <LazyHydrate when-idle>
      <Slider :slides="slides"/>
    </LazyHydrate>
    <LazyHydrate when-idle>
      <Top :tovar="tovar"/>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <Category :category="category"/>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <Brand :facturer="facturer"/> 
    </LazyHydrate>
    <div class="title">
      <h1>Архитерм - системы отопления, водоснабжения и канализации</h1>
    </div>
  </div>
</template>
<script>
import LazyHydrate from 'vue-lazy-hydration';
import {mapActions,mapGetters} from 'vuex'
export default {
  components:{
    LazyHydrate,
    'Slider': () => import('~/components/index/Slider.vue'),
    'Category': () => import('~/components/index/Category.vue'),
    'Top': () => import('~/components/index/Top.vue'),
    'Brand': () => import('~/components/index/Brand.vue'),
  },
  data() {
    return {
      title: 'Архитерм - системы отопления, водоснабжения и канализации'
    }
  },
  computed:{
    ...mapGetters({
      facturer: 'category/manufacturer',
      category: 'category/categoryNavbar',
      slides: 'main/sliderItems',
      tovar: 'main/top',
    })
  },
  methods:{
    ...mapActions({
        Actions_categoryManuf:'category/getManufacturer',
        Actions_categoryNavbar:'category/getCategory',
        Actions_slides:'main/getSlider',
        Actions_tovar:'main/getTop'
      }),
  },
  mounted(){
    this.Actions_categoryManuf()
    this.Actions_categoryNavbar()
    this.Actions_slides()
    this.Actions_tovar()
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Первый поставщик профессиональных решений для систем отопления, водоснабжения и канализации ведущих европейских производителей. Оптовая и розничная продажа, наличие наскладе, низкие цены, скидки, гарантии.'
        }
      ]
    }
  },
}
</script>