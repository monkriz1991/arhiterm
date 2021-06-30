<template>
    <div class="container">
        <NavbarCabinet/>
        <h1 class="h1-user-cab">Страница монтажника</h1>
        <Form/>
        <AddGalery/>
    </div>
</template>

<script>
import NavbarCabinet from '~/components/cabinet/NavbarCabinet.vue'
import Form from '~/components/cabinet/mounter/Form.vue'
import AddGalery from '~/components/cabinet/mounter/AddGalery.vue'
export default {
    components:{
        NavbarCabinet,
        Form,
        AddGalery
    },
    data() {
     return{

     }   
    },
}
</script>