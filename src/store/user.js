import axios from 'axios'

export default {
  state: {
    token: localStorage.getItem('token') || null,
    email: localStorage.getItem('email') || null,
    defense: null
  },
  mutations: {
    setLogIn (state, { token, userEmail }) {
      state.token = token
      state.email = userEmail
    },
    setLogOut (state) {
      state.token = null
      state.email = null
      state.defense = null
    },
    setDefense (state, defense) {
      state.defense = defense
    }
  },
  actions: {
    async registerUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const user = await axios.post('/registration', { email, password })

        const token = user.data.token
        const userEmail = user.data.email
        const defense = user.data.defense

        localStorage.setItem('token', token)
        localStorage.setItem('email', userEmail)

        commit('setLoading', false)
        commit('setLogIn', { token, userEmail })
        commit('setDefense', defense)

        return defense
      } catch (err) {
        commit('setLoading', false)

        if (err.message == 'Request failed with status code 400') {
          commit('setError', 'This e-mail address is already used')

          return
        }

        if (err.message == 'Request failed with status code 404') {
          commit('setError', 'There\'s something wrong with resource or server')

          return
        }

        commit('setError', err.message)
      }
    },
    async loginUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const user = await axios.post('/login', { email, password })

        if (user.data.info) {
          commit('setLoading', false)
          commit('setError', user.data.info.message)

          return
        }

        const token = user.data.token
        const userEmail = user.data.email
        const defense = user.data.defense

        localStorage.setItem('token', token)
        localStorage.setItem('email', userEmail)

        commit('setLoading', false)
        commit('setLogIn', { token, userEmail })
        commit('setDefense', defense)

        return defense
      } catch (err) {
        commit('setLoading', false)

        if (err.message == 'Request failed with status code 404') {
          commit('setError', 'There\'s something wrong with resource or server')

          return
        }

        commit('setError', err.message)
      }
    },
    defendUser ({ commit }, defense) {
      commit('setDefense', defense)
    },
    logoutUser ({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('email')

      commit('setLogOut')
    }
  },
  getters: {
    loggedIn (state) {
      return (!!state.token && !!state.defense)
    },
    email (state) {
      return state.email
    }
  }
}
