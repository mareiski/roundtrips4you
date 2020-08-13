import { auth } from '../../firebaseInit.js'
export default {
  setCurrentUser: ({ commit }) => {
    commit('setUser', auth.user())
  }
}
