<template>
    <div class="container">
        <NavbarCabinet/>
        <h1 class="h1-user-cab">Мои корзины</h1>
        <Basket/>
        <Paginated/>
    </div>
</template>

<script>
import NavbarCabinet from '~/components/cabinet/NavbarCabinet.vue'
import Basket from '~/components/cabinet/Basket.vue'
import Paginated from '~/components/cabinet/Paginated.vue'
export default {
    data() {
      return{

      }
    },
    components:{
        NavbarCabinet,
        Basket,
        Paginated
    }
}
</script>