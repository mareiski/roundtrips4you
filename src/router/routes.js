
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '/',
        component: process.env.MODE !== 'capacitor' ? () => import('pages/Index.vue') : () => import('pages/Login.vue'),
        meta: {
          guestOnly: true
        }
      },
      {
        path: 'rundreisen-uebersicht',
        component: () => import(/* webpackChunkName: "roundtrips" */ 'pages/RoundtripOverview.vue')
      },
      {
        path: 'rundreisen/:country',
        component: () => import(/* webpackChunkName: "roundtrips" */ 'pages/Roundtrips.vue')
      },
      {
        path: 'rundreise-ansehen/:id',
        component: () => import(/* webpackChunkName: "roundtrips" */ 'pages/roundtripDetails.vue')
      },
      {
        path: 'login',
        component: () => import('pages/Login.vue'),
        meta: {
          guestOnly: true
        }
      },
      {
        path: 'registrieren',
        component: () => import('pages/Register.vue'),
        props: true,
        name: 'Register',
        meta: {
          guestOnly: true
        }
      },
      {
        path: 'profil',
        component: () => import('pages/User.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'meine-rundreisen',
        component: () => import('pages/MyRoundtrips.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'ueber',
        component: () => import('pages/Über.vue')
      },
      {
        path: 'blog',
        component: () => import(/* webpackChunkName: "blog" */ 'pages/Blog/BlogOverview.vue')
      },
      {
        path: 'blog/:name',
        component: () => import(/* webpackChunkName: "blog" */ 'pages/Blog/Blog.vue')
      },
      {
        path: 'impressum',
        component: () => import(/* webpackChunkName: "legal" */ 'pages/Legal/Impressum.vue')
      }, {
        path: 'datenschutz',
        component: () => import(/* webpackChunkName: "legal" */ 'pages/Legal/Datenschutz.vue')
      },
      {
        path: 'haftungsausschluss',
        component: () => import(/* webpackChunkName: "legal" */ 'pages/Legal/Haftungsausschluss.vue')
      },
      {
        path: 'rundreisen-einstellungen/:id',
        component: () => import('pages/RoundtripSettings.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'rundreisen-wizard/:id?',
        component: () => import('pages/RoundtripWizard.vue')
      },
      {
        path: 'benutzerprofil/:id',
        component: () => import(/* webpackChunkName: "publicUser" */ 'pages/PublicUserProfile.vue')
      },
      {
        path: 'benutzer',
        component: () => import(/* webpackChunkName: "publicUser" */ 'pages/PublicUsers.vue')
      },
      {
        path: 'faq',
        component: () => import(/* webpackChunkName: "faq" */ 'pages/Help.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/WidgetLayout.vue'),
    children: [
      {
        path: 'MapWidget/:id',
        component: () => import('pages/MapWidget.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
