<template>
  <div>
      <Navbar/>
      <div class="main-nuxt"></div>
      <no-ssr>
        <Snow 
        :active='true'
        color="#a2caff"/>
      </no-ssr>
      <nuxt />
      <Footer />
  </div>
</template>

<script>
import Snow from 'vue-niege';
export default ({
  layout: 'error',
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://arhiterm.by/' + this.canontical.replace(/^./,"")
        }
      ]
    }
  },
  components:{
    Snow,
    'Navbar': () => import('~/components/Navbar.vue'),
    'Footer': () => import('~/components/Footer.vue'),
    'Upscroll': () => import('~/components/Upscroll.vue'),
    'Breadcrumb': () => import('~/components/Breadcrumb.vue'),
  },
  data() {
      return {
        canontical:this.$route.path==''?'':this.$route.path,
      };
  },
  computed: {
  },
  methods:{
    open2() {
      this.$notify({
        dangerouslyUseHTMLString: true,
        title: 'Уважаемые клиенты!',
        message: '<strong>30.12.22</strong> склад / офис: <strong><br>Выходной</strong>',
        type: 'warning',
        duration:5000,
      });
    },
  },
  mounted(){
    this.open2()
  }
})
</script>