import { auth } from 'app/src/firebaseInit'

// "async" is optional
export default async ({ app, store, router }) => {
  auth.init(app, store, router)
}
