import { auth } from 'app/src/firebaseInit'
// require('app/src/statics/upload/upload.js')

// "async" is optional
export default async ({ app, store, router }) => {
  auth.init(app, store, router)
}
