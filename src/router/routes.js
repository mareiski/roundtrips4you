
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
        path: 'rundreisen-uebersicht',
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
        path: 'email-bestaetigen',
        component: () => import('pages/Verify.vue'),
        meta: {
          requireAuth: true
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
        path: 'ueber',
        component: () => import('pages/Über.vue')
      },
      {
        path: 'blog',
        component: () => import('pages/BlogOverview.vue')
      },
      {
        path: 'blog/:name',
        component: () => import('pages/Blog.vue')
      },
      {
        path: 'impressum',
        component: () => import('pages/Impressum.vue')
      }, {
        path: 'datenschutz',
        component: () => import('pages/Datenschutz.vue')
      },
      {
        path: 'haftungsausschluss',
        component: () => import('pages/Haftungsausschluss.vue')
      },
      {
        path: 'rundreise-bearbeiten/:id',
        component: () => import('pages/EditRoundtrips.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'benutzerprofil/:id',
        component: () => import('pages/PublicUserProfile.vue')
      },
      {
        path: 'benutzer',
        component: () => import('pages/PublicUsers.vue')
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
