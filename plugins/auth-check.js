import firebase from '@/plugins/firebase'
import axios from '@/plugins/axios'

export const setUser = (user, store, idToken) => {
  async function set (user, store, idToken) {
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
      store.commit('setIdToken', idToken)
    } else {
      store.commit('setUser', null)
    }
  }
  set(user, store, idToken)
}

export const authUser = (idToken, store) => {
  if (idToken) {
    store.commit('setIdToken', idToken)
  }
}

const authCheck = ({ store, redirect }) => {
  firebase.auth().onAuthStateChanged((user) => {
    user.getIdToken(true).then(function (idToken) {
      setUser(user, store, idToken)
    })
  })
}

export default authCheck
