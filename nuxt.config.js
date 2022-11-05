const axios = require('axios')
const isDev = process.env.NODE_ENV !== 'production'
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
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5 shrink-to-fit=no' },
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
        content: `https://arhiterm.by/`,
    },
    {
      hid: 'og:locale',
      property: 'og:locale',
      content: 'ru_RU',
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website',
    }, 
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

webfontloader: {
  events: false,
  preconnect: true,
  google: {
    families: ['Montserrat:400,500,600,700,800:cyrillic&display=swap']
  },
  timeout: 5000
},
loading: {color:'blue'},

  // Global CSS: https://go.nuxtjs.dev/config-css
css: [
  '@/assets/css/main.css',
  'element-ui/lib/theme-chalk/index.css'
],
render: {
  // http2: {
  //     push: true,
  //     pushAssets: (req, res, publicPath, preloadFiles) => preloadFiles
  //     .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
  //   },
  // compressor: false,
  resourceHints: false,
  etag: false,
  static: {
    etag: false
  }
},
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
plugins: [
  '@/plugins/element-ui',
  '@/plugins/backbutton.js',
  '~/plugins/url-change.js',
  // { src: '~plugins/ga.js', mode: 'client' },
  // '~/plugins/gtm',
  { src: '~/plugins/vue-bottom-sheet.js', mode: 'client' },
  { src: '~/plugins/vue-observe-visibility.js', mode: 'client' },
  { src: '~/plugins/ymapPlugin.js',  mode: 'client' }
],

  // Auto import components: https://go.nuxtjs.dev/config-components
components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
buildModules: [
  [
    '@nuxt/image',
    {
      provider: 'static',
    },
  ],
  '@nuxtjs/pwa',
],
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
  // '@nuxtjs/gtm',
  '@nuxtjs/auth-next',
  '@nuxtjs/sitemap',
  // 'nuxt-ssr-cache',
  'nuxt-webfontloader',
  '@nuxtjs/redirect-module',
  'nuxt-purgecss',
  // ['nuxt-vuex-localstorage', {
  //   localStorage: ['crate']
  // }],
  // [
  //   '@nuxtjs/yandex-metrika',
  //   {
  //     id: '7416499',
  //     defer: true,
  //     webvisor: false,
  //     clickmap:true,
  //     usetriggerEventCDN:true,
  //     trackLinks:true,
  //     triggerEvent:true,
  //     accurateTrackBounce:true,
  //   }
  // ],
],
purgecss: {
  enabled: true, // Always enable purgecss
  safelist: ['my-class'], // Add my-class token to the safelist (e.g. .my-class)
},
  redirect: [
    {
      from: '(?!^\/$|^\/[?].*$)(.*\/[?](.*)$|.*\/$)',
      to: (from, req) => {
        const base = req._parsedUrl.pathname.replace(/\/$/, '');
        const search = req._parsedUrl.search;
        return base + (search != null ? search : '')
      }
    }
  ],

  // target: 'static',
  // ssr: true,

  // generate: {
  //   fallback: '404.html',    
  // },

  image: {
    //provider: 'twicpics'
    twicpics: {
      baseURL: 'https://new.arhiterm.by/'
    },
    presets: {
      product: {
        modifiers: {
          format: 'webp',
          fit: 'contain',
          quality: '60'
        }
      }
    },
    imgix: {
      baseURL: 'https://arhiterm.by/',
      format: 'webp',
      fit: 'contain',
      quality: '60'
    },
    dir: 'static'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: false,
    baseURL: "https://new.arhiterm.by",
    timeout: 1000 * 5,
    headers: {
      "Content-Type": "application/json"
    },

  },
  generate: {
    exclude: ['/', '/catalog/', '/product/','/factory/']
  },
  // generate: {
  //   subFolders: false
  // },
   sitemap: {
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 15,
    hostname: "https://arhiterm.by",
    gzip: true,
    generate: false,
    exclude: [],
    sitemaps: [
      {
        exclude: [
          '/cabinet',
          '/cabinet/**',
          '/userCabinet',
          '/userCabinet/**',
        ],
        path: '/sitemap/sitemap.xml',
      },
      {
        path: '/catalog/sitemap.xml',
        exclude: ['/**'],
        routes: async () => {
          const { data } = await axios.get('https://new.arhiterm.by/catalog/categories/?limit=999')
          return data.results.map((category) => `/catalog/${category.kirilica}`)
        }
      },
      {
      path: '/product/sitemap.xml',
      exclude: ['/**'],
      routes: 
        async () => {
          const { data } = await axios.get('https://new.arhiterm.by/catalog/search/?limit=9999999')
          return data.results.map((product) => `/product/${product.kirilica_name}`)
        }
      },
      {
        path: '/factory/sitemap.xml',
        exclude: ['/**'],
        routes: 
          async () => {
            const { data } = await axios.get('https://new.arhiterm.by/manufacturer/get/?is_active=true&limit=99999')
            return data.results.map((factory) => `/factory/${factory.kirilica}`)
          }
        }
    ]
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

   //postcss: null,

  build: {
    babel: {
      "presets": ["@babel/preset-env"],
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    },
    transpile: [/^element-ui/,'vee-validate/dist/rules'],
    optimizeCss: false,
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      }
    }),
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    optimization: {
      minimize: !isDev
    },
    ...(!isDev && {
      extractCSS: {
        ignoreOrder: true
      }
    }),

    transpile: ['intersection-observer'],
    postcss: {
      plugins: {
        ...(!isDev && {
          cssnano: {
            preset: ['advanced', {
              autoprefixer: false,
              cssDeclarationSorter: false,
              zindex: false,
              discardComments: {
                removeAll: true
              }
            }]
          }
        })
      },
      ...(!isDev && {
        preset: {
          browsers: 'cover 99.5%',
          autoprefixer: true
        }
      }),

      order: 'cssnanoLast'
    },
  }

}
