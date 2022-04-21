export default {
  server:{
    host:'0.0.0.0',
    port:3000,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Архитерм - системы отопления, водоснабжения и канализации',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'google', content: 'notranslate' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Первый поставщик профессиональных решений для систем отопления, водоснабжения и канализации ведущих европейских производителей. Оптовая и розничная продажа, наличие наскладе, низкие цены, скидки, гарантии.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800' },
    ]
  },

  loading: {color:'blue'},

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '~/plugins/url-change.js',
    { src: '~/plugins/ymapPlugin.js',  mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module'
    '@nuxtjs/pwa',
    '@nuxtjs/fontawesome',
  ],

  fontawesome:{
    //component:'fa',
    icons:{
      solid:true,
      brands:true,
    }
  },
  pwa: {
    icon: {
      /* icon options */
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    ['nuxt-vuex-localstorage', {
      localStorage: ['main'] //  If not entered, “localStorage” is the default value
    }],
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '7416499',
        webvisor: true
        // clickmap:true,
        // useCDN:false,
        // trackLinks:true,
        // accurateTrackBounce:true,
      }
    ]
  ],


  // elementUI: {
  //     font: 'Montserrat',
  //     icons: 'fa',
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: false,
    baseURL: "https://new.arhiterm.by"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/,'vee-validate/dist/rules'],
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          maxAge: 60*60*24*5,
          global: true,
          type: 'Token'
        },
        user: {
          property: '',
        },
        endpoints: {
          login: { url: '/signin/backend/signin/', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/users/mydata/', method: 'get' }
        },
        // tokenRequired: true,
        tokenType: '',
      },
    },
    cookie: {
      options: {
          sameSite: 'lax',
      },
    },
    redirect: {
      login: '/',
      home: '/cabinet',
      callback: false,
      logout: '/'
    }
  },

}
