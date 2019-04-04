import axios from 'axios'

export default {
  actions: {
    async sendLetter ({ commit }, { subject, message, email }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const finalSubject = subject || 'Work'
        const finalEmail = email || 'Unknown'

        const letter = await axios.post('/contact', { subject: finalSubject, message, email: finalEmail })

        commit('setLoading', false)

        if (letter.data.error) commit('setError', 'Something is wrong! Check internet connection please')
        if (letter.data.response && letter.data.messageId) return 'ok'
      } catch (err) {
        commit('setLoading', false)
        commit('setError', err.message)
      }
    }
  }
}
