<template>
  <div>
    <div
     v-loading="loading">
    </div>
    <div
    :class="{ loading_lay: loading }"
    >
      <LazyHydrate when-idle>
        <Navbar/>
      </LazyHydrate>
      <div class="main-nuxt"></div>
      <nuxt />
      <LazyHydrate when-visible>
        <Footer />
      </LazyHydrate>
      <!-- <Upscroll/> -->
    </div>
  </div>
</template>


<script>
import LazyHydrate from 'vue-lazy-hydration';
import {mapGetters,mapActions} from 'vuex'
export default ({
  layout: 'error',
    head() {
      return {
        link: [
          {
            rel: 'canonical',
            href: 'https://arhiterm.by' + this.canontical
          }
        ]
      }
    },
    created(){

    },
    mounted() {
      this.loadingData()
    },
  data() {
      return {
        loading:true,
        history:[],
        countLoad:0,
        canontical:this.$route.path=='/'?'':this.$route.path,
      };
  },
  computed: {
    ...mapGetters({
      loadingItem:'main/loadingItem',
    }),
  },
  components:{
    LazyHydrate,
    'Navbar': () => import('~/components/Navbar.vue'),
    'Footer': () => import('~/components/Footer.vue'),
    'Upscroll': () => import('~/components/Upscroll.vue'),
    'Breadcrumb': () => import('~/components/Breadcrumb.vue'),
  },
  watch:{
      $route (to, from){
        this.history.push(to)
        if(this.history.length>5){
          this.history.splice(0,1)
        }
        this.$nuxt.history = this.history;
        
      },
      loadingItem(data){
        this.loading = data
        this.loadingData(true)
      },
      
  },
  methods:{
    ...mapActions({
      setLoading: 'main/newLoadingItem',
    }),
    loadingData(){
      setTimeout(() => {
        this.setLoading(false)
        this.loading = false;
      }, 2000);
    },
  }

})
</script>

<style>
html {
  font-family:'Monserrat',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.loading_lay{
  opacity:0;
  visibility: hidden;
}
</style>
