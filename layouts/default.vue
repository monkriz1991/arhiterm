<template>
  <div>
      <Navbar/>
      <div class="main-nuxt"></div>
      <nuxt />
      <Footer />
  </div>
</template>

<script>
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
        message: 'график работы <strong>23.12.22</strong>:<br> склад до <strong>14-30</strong>, офис - до <strong>15-00</strong>',
        type: 'warning',
        duration:15000,
      });
    },
  },
  mounted(){
    this.open2()
  }
})
</script>