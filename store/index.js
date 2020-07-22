import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  currentUser: {
    id: '',
    name: '',
    email: '',
    screen_name: '',
    avatar_url: '',
    level: 1,
    liked: [],
    weeklyTarget: {},
    following: []
  }
})

export const mutations = {
  setUser (state, payload) {
    state.currentUser = payload
  },
  setAvatarUrl (state, payload) {
    state.currentUser.avatar_url = payload
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
  },
  setWeeklyTarget (state, payload) {
    state.currentUser.weeklyTarget = payload
  },
  setFollowing (state, payload) {
    state.currentUser.following = payload.map((p) => {
      return p.id
    })
  },
  addFollowing (state, payload) {
    state.currentUser.following.unshift(payload)
  },
  removeFollowing (state, payload) {
    state.currentUser.following = state.currentUser.following.filter((l) => {
      return l.id !== payload
    })
  }
}
