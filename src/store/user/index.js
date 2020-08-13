import state from './state'
import { auth } from '../../firebaseInit.js'

export default {
  namespaced: true,
  state,
  getters: {
    user: state => state.user,
    isLogged: state => (state.user !== null)
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    }
  },
  actions: {
    setCurrentUser: ({ commit }) => {
      commit('setUser', auth.user())
    }
  }
}
