<template>
<no-ssr>
    <div class="container">
        <NavbarCabinet/>
        <h1 class="h1-user-cab">Мои заказы</h1>
          <Basket
            :allBaskets="allBaskets"
          />
        <Paginated/>
    </div>
    </no-ssr>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  middleware: ['auth'],
  data() {
    return{
    }
  },
  components:{
  'NavbarCabinet': () => import('~/components/cabinet/NavbarCabinet.vue'),
  'Basket': () => import('~/components/cabinet/Basket.vue'),
  'Paginated': () => import('~/components/cabinet/Paginated.vue'),
  },
  computed:{
    ...mapGetters({
        basket:'main/basket',
        allBaskets:'main/allBaskets',
    })
  },
}
</script>
