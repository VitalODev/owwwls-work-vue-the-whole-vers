import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '../stylus/main.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#009688',
    auxiliary: '#C5E1A5',
    error: '#FF5252',
    info: '#B2DFDB',
    success: '#4CAF50',
    warning: '#FFC107',
    beach: '#aad6df'
  },
  iconfont: 'md',
  breakpoint: {
    thresholds: {
      xs: 500,
      sm: 650,
      md: 846,
      lg: 1046
    }
  }
})
