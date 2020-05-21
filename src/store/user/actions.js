import { auth } from '../../firebaseInit'
export default {
  setCurrentUser: ({ commit }) => {
    commit('setUser', auth.user())
  }
}
