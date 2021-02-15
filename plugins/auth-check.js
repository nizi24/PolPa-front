import firebase from '@/plugins/firebase'
import axios from '@/plugins/axios'

export const setUser = (user, store) => {
  async function set (user, store) {
    if (user) {
      const { data } = await axios.get(`/v1/users?uid=${user.uid}`)
      const userParams = JSON.parse(data.user)
      store.commit('setUser', userParams)
      const liked = JSON.parse(data.likes)
      const following = JSON.parse(data.following)
      const tagFollowing = JSON.parse(data.tag_following)
      store.commit('setLiked', liked)
      store.commit('setFollowing', following)
      store.commit('setTagFollowing', tagFollowing)
      store.commit('setRequiredExp', data.required_exp)
    } else {
      store.commit('setUser', null)
    }
  }
  set(user, store)
}

export const authUser = (idToken, store) => {
  async function set (user, store) {
    store.commit('setIdToken', idToken)
  }
}

const authCheck = ({ store, redirect }) => {
  firebase.auth().onAuthStateChanged(async (user) => {
    await setUser(user, store)
  })
  firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
    await authUser(idToken, store)
  })
}

export default authCheck
