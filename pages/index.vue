<template>
  <div class="container">
      <Slider />
      <Top />
      <Category />
      <Brand />
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
  data() {
    return {
      title: 'Архитерм - системы отопления, водоснабжения и канализации'
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
