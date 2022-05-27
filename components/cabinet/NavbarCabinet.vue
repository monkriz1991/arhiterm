<template>
    <div class="nav-cabinet">
        <nuxt-link :to="`/cabinet`" exact active-class="activ-link-cab">
        Профиль</nuxt-link>
        <nuxt-link :to="`/userCabinet/store`" active-class="activ-link-cab">
        Мои заказы</nuxt-link>
        <nuxt-link v-if="$auth.user?$auth.user.is_maunter:false" :to="`/userCabinet/mounter`" active-class="activ-link-cab">
        Монтажник</nuxt-link>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>
