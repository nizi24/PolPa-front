import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  currentUser: {
    id: '',
    name: '',
    email: '',
    screen_name: '',
    level: 1,
    liked: []
  }
})

export const mutations = {
  setUser (state, payload) {
    state.currentUser = payload
  },
  setLevel (state, payload) {
    state.currentUser.level = payload
  },
  setLiked (state, payload) {
    state.currentUser.liked = payload
  },
  addLiked (state, payload) {
    state.currentUser.liked.unshift(payload)
  },
  removeLiked (state, payload) {
    state.currentUser.liked = state.currentUser.liked.filter((l) => {
      return !(l.likeable_id === payload.likeable_id &&
      l.likeable_type === payload.likeable_type)
    })
  }
}
