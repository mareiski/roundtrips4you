
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
        path: 'rundreisen',
        component: () => import('pages/Roundtrips.vue')
      },
      {
        path: 'rundreisen-details',
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
        component: () => import('pages/Register.vue')
      },
      {
        path: 'profil',
        component: () => import('pages/User.vue'),
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
