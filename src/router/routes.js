
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'rundreisen-übersicht',
        component: () => import('pages/RoundtripOverview.vue')
      },
      {
        path: 'rundreisen/:country',
        component: () => import('pages/Roundtrips.vue')
      },
      {
        path: 'rundreisen-details/:id',
        component: () => import('pages/roundtripDetails.vue')
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
        path: 'über',
        component: () => import('pages/Über.vue')
      },
      {
        path: 'rundreise-bearbeiten/:id',
        component: () => import('pages/EditRoundtrips.vue'),
        meta: {
          requireAuth: true
        }
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
