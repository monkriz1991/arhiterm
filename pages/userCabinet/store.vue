<template>
<no-ssr>
    <div class="container">
        <NavbarCabinet/>
        <h1 class="h1-user-cab">Мои корзины</h1>
        <Basket
        v-if="allBaskets!==undefined"
        v-for="(b,k) in allBaskets" :key="k"
        :basket_for.sync="b"
        />
        <h4 v-else>У вас нет открытых корзин</h4>
        <Paginated/>
    </div>
    </no-ssr>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import NavbarCabinet from '~/components/cabinet/NavbarCabinet.vue'
import Basket from '~/components/cabinet/Basket.vue'
import Paginated from '~/components/cabinet/Paginated.vue'
export default {
    data() {
      return{

      }
    },
  mounted() {
  },
  components:{
        NavbarCabinet,
        Basket,
        Paginated
    },
    computed:{
        ...mapGetters({
            basket:'main/basket',
            allBaskets:'main/allBaskets',
        })
    },
  methods:{

  }
}
</script>
