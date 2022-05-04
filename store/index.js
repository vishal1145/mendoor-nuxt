import Vue from 'vue'

const store = Vue.observable({
  auth: {
    authorized: false,
    user: []
  },
  loader: false
})

export default store
