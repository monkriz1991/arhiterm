export default {
  server:{
    host:'0.0.0.0',
    port:3003,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Архитерм - системы отопления, водоснабжения и канализации',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'yandex-verification', content: '1053ce585032d00b' },
      { name: 'yandex-verification', content: '14bc6c473eba7381' },
      { name: 'google', content: 'notranslate' },
      { name: 'google-site-verification', content: 'XXP2MkYaAs0LKj5RuVVah-wMhFxrUmfV5rOUu9qihSY' },
      { name: 'google-site-verification', content: 'pffvbs0GyslCUgg16m88GzyCeE8tIXtFV8_yrWKWKhQ' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1 shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'Первый поставщик профессиональных решений для систем отопления, водоснабжения и канализации ведущих европейских производителей. Оптовая и розничная продажа, наличие наскладе, низкие цены, скидки, гарантии.' },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Архитерм - системы отопления, водоснабжения и канализации',
    },
    {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://arhiterm.by/logotip.png',
    },
    {
        hid: 'og:description',
        property: 'og:description',
        content: 'Первый поставщик профессиональных решений для систем отопления, водоснабжения и канализации ведущих европейских производителей. Оптовая и розничная продажа, наличие наскладе, низкие цены, скидки, гарантии.',
    },
    {
        hid: 'og:url',
        property: 'og:url',
        content: `https://arhiterm.by`,
    },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  webfontloader: {
    custom: {
      families: [
        'Montserrat',
      ],
      urls: [
        'https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800&display=swap',
      ]
    }
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
    '@/plugins/backbutton.js',
    '~/plugins/url-change.js',
    { src: '~/plugins/vue-bottom-sheet.js', mode: 'client' },
    // { src: '~/plugins/vuex-persist.js', mode: 'client' },
    { src: '~/plugins/ymapPlugin.js',  mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module'
    '@nuxt/image',
    '@nuxtjs/pwa',
    '@nuxtjs/fontawesome',
    '@nuxtjs/google-analytics',
  ],
  googleAnalytics: {
    id: 'UA-19108162-1', // Use as fallback if no runtime config is provided
  },
  fontawesome:{
    //component:'fa',
    icons:{
      solid:true,
      brands:true,
    }
  },
  pwa: {
      manifest: {
        name: 'Arhiterm',
        lang: 'ru',
        orientation: 'portrait',
        background_color: '#FFFFFF',
        theme_color: '#F8F8F8',
        theme_color: '#F8F8F8',
        start_url:'/',
        icons: [
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
            }
        ]
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules

  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/gtm',
    '@nuxtjs/auth-next',
    '@nuxtjs/sitemap',
    'nuxt-ssr-cache',
    'nuxt-webfontloader',
    // ['nuxt-vuex-localstorage', {
    //   localStorage: ['main','product','category','tovar']
    // }],
    ['nuxt-vuex-localstorage', {
      localStorage: ['crate']
    }],
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '7416499',
        defer: true,
        webvisor: true,
        clickmap:true,
        usetriggerEventCDN:true,
        trackLinks:true,
        triggerEvent:true,
        accurateTrackBounce:true,
      }
    ],
    // ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
    'nuxt-rfg-icon',
    '@nuxtjs/manifest', 
    
    ['nuxt-rfg-icon', {
      static: true,
      staticPath: '/_favicons/',
      masterPicture: 'static/icon.png',
      rfg: 'faviconDescription.json',
    }]
  ],

  gtm: {
    id: 'GTM-K5DFSM3'
  },

  image: {
    provider: 'twicpics',
    twicpics: {
      baseURL: 'https://new.arhiterm.by'
    },
  },
  // elementUI: {
  //     font: 'Montserrat',
  //     icons: 'fa',
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: false,
    baseURL: "https://new.arhiterm.by",
    timeout: 1000 * 5,
    headers: {
      "Content-Type": "application/json"
    },

  },
   sitemap: {
    hostname: "https://arhiterm.by",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/,'vee-validate/dist/rules'],
    postcss: null,
  },

  serverMiddleware:  [
    '~/middleware/redirect-to-www.js'
  ],

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
      login: '/cabinet',
      home: '/cabinet',
      callback: '/',
      logout: '/'
    }
  },

}
