import Vue from 'vue'
import Vuex from 'vuex'
import helper from './helper'
import user from './user'
import contact from './contact'
import info from './info'
import axios from 'axios'

axios.defaults.baseURL = 'http://5.61.35.40:3000'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: { helper, user, contact, info }
})
