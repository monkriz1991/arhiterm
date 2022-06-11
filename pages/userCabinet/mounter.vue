<template>
    <div class="container">
        <NavbarCabinet/>
        <h1 class="h1-user-cab">Страница монтажника</h1>
        <Form/>
        <AddGalery/>
        <Project :key="k" :portfolio="i" v-for="(i,k) in portfolios"/>
    </div>
</template>

<script>
import NavbarCabinet from '~/components/cabinet/NavbarCabinet.vue'
import Form from '~/components/cabinet/mounter/Form.vue'
import AddGalery from '~/components/cabinet/mounter/AddGalery.vue'
import Project from '~/components/cabinet/mounter/Project.vue'
export default {
     middleware: ['auth'],
    components:{
        NavbarCabinet,
        Form,
        AddGalery,
        Project
    },
    data() {
     return{
        portfolios:[],
     }
    },
  mounted() {
      this.portfolioGet()
  },
  methods:{
      async portfolioGet(){
        let data = await this.$axios.get(`/portfolio/portfolio/?limit=200`);
        this.portfolios = data.data.results;
      }
  }
}
</script>
