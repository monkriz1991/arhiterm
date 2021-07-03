<template>
    <div class="container">
        <NavbarCabinet/>
        <h1 class="h1-user-cab">Страница монтажника</h1>
        <Form/>
        <AddGalery/>
        <Project/>
    </div>
</template>

<script>
import NavbarCabinet from '~/components/cabinet/NavbarCabinet.vue'
import Form from '~/components/cabinet/mounter/Form.vue'
import AddGalery from '~/components/cabinet/mounter/AddGalery.vue'
import Project from '~/components/cabinet/mounter/Project.vue'
export default {
    components:{
        NavbarCabinet,
        Form,
        AddGalery,
        Project
    },
    data() {
     return{

     }   
    },
}
</script>