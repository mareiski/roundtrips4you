// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    preFetch: true,

    boot: [
      'initialMain'
    ],

    css: [
      'site.less'
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      lang: 'de', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QPageContainer',
        'QPage',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QDate',
        'QInput',
        'QPopupProxy',
        'QRange',
        'QExpansionItem',
        'QSelect',
        'QRating',
        'QCheckbox',
        'QTooltip',
        'QAvatar',
        'QMenu',
        'QInnerLoading',
        'QSpinner',
        'QTimeline',
        'QTimelineEntry',
        'QEditor',
        'QPopupEdit',
        'QDialog',
        'QForm',
        'QToggle',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QUploader',
        'QCarousel',
        'QCarouselControl',
        'QCarouselSlide',
        'QImg',
        'QTime',
        'Loading',
        'QChip',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QTabPanels',
        'QTabPanel',
        'QSeparator',
        'QChatMessage',
        'QPagination',
        'QBadge',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QSkeleton',
        'QDrawer',
        'QToolbar',
        'QToolbarTitle',
        'QScrollArea',
        'QIntersection',
        'QCircularProgress'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'AddressbarColor',
        'Cookies',
        'Meta'
      ]
    },

    supportIE: true,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
        const path = require('path')
        const PrerenderSPAPlugin = require('prerender-spa-plugin')
        cfg.plugins.push(
          new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, 'dist'),
            // Required - Routes to render.
            routes: ['/', '/ueber', '/rundreisen-uebersicht', '/login', '/registrieren',
              '/meine-rundreisen', '/blog'],
            minify: {
              collapseBooleanAttributes: true,
              collapseWhitespace: true,
              decodeEntities: true,
              keepClosingSlash: true,
              sortAttributes: true
            }
          }))
        if (typeof cfg.output !== 'undefined') {
          // copy _redirects file & robots.txt
          const CopyWebpackPlugin = require('copy-webpack-plugin')
          cfg.plugins.push(
            new CopyWebpackPlugin([
              {
                from: 'src/_redirects',
                to: cfg.output.path
              }
            ])
          )
          cfg.plugins.push(
            new CopyWebpackPlugin([
              {
                from: 'src/robots.txt',
                to: cfg.output.path
              }
            ])
          )
        }
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'roundtrips4you',
        // short_name: 'roundtrips4you',
        // description: 'roundtrips4you',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: '',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'roundtrips4you'
      }
    }
  }
}
