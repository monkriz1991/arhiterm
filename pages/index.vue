<template>
  <div class="container">
      <Slider :slides="slides"/>
      <Top :tovar="tovar"/>
      <Category :category="category"/>
      <Brand :facturer="facturer"/> 
      <div class="title">
        <h1>Архитерм - системы отопления, водоснабжения и канализации</h1>
      </div>
  </div>
</template>

<script>
import Slider from '~/components/index/Slider.vue'
import Category from '~/components/index/Category.vue'
import Brand from '~/components/index/Brand.vue'
import Top from '~/components/index/Top.vue'
import {mapActions,mapGetters} from 'vuex'
export default {
  async asyncData ({ app, params, route, error,store  }) {
    try {
      await store.dispatch('category/getCategory');
      await store.dispatch('main/getSlider');
      await store.dispatch('main/getTop');
      await store.dispatch('category/getManuf')
    } catch (err) {
      console.log(err)
      return error({
        statusCode: 404,
        message: 'Категории не найдены или сервер не доступен'
      })
    }
  },
  data() {
    return {
      title: 'Архитерм - системы отопления, водоснабжения и канализации'
      // categories: [],
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
  components:{
    Slider,
    Category,
    Brand,
    Top,
  },
  methods:{
  },
  mounted(){
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
<style>

</style>
