import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  currentUser: {
    id: '',
    name: '',
    email: '',
    screen_name: '',
    profile: '',
    avatar_url: '',
    level: 1,
    total_experience: 0,
    experience_to_next: 50,
    liked: [],
    weeklyTarget: {},
    following: [],
    tagFollowing: [],
    required_exp: {}
  }
})

export const mutations = {
  setUser (state, payload) {
    state.currentUser = payload
  },
  setAvatarUrl (state, payload) {
    state.currentUser.avatar_url = payload
  },
  setName (state, payload) {
    state.currentUser.name = payload
  },
  setScreenName (state, payload) {
    state.currentUser.screen_name = payload
  },
  setProfile (state, payload) {
    state.currentUser.profile = payload
  },
  setLevel (state, payload) {
    state.currentUser.level = payload
  },
  setTotalExperience (state, payload) {
    state.currentUser.total_experience = payload
  },
  setExperienceToNext (state, payload) {
    state.currentUser.experience_to_next = payload
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
  },
  setTagFollowing (state, payload) {
    state.currentUser.tagFollowing = payload.map((p) => {
      return p.tag_id
    })
  },
  addTagFollowing (state, payload) {
    state.currentUser.tagFollowing.unshift(payload)
  },
  removeTagFollowing (state, payload) {
    state.currentUser.tagFollowing = state.currentUser.tagFollowing.filter((l) => {
      return l.id !== payload
    })
  },
  setRequiredExp (state, payload) {
    state.currentUser.required_exp = payload
  }
}
