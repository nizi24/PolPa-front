import firebase from '@/plugins/firebase'
import axios from '@/plugins/axios'

const authCheck = ({ store, redirect }) => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const { data } = await axios.get(`/v1/users?uid=${user.uid}`)
      const userParams = JSON.parse(data.user)
      store.commit('setUser', userParams)
      const liked = JSON.parse(data.likes)
      const following = JSON.parse(data.following)
      store.commit('setLiked', liked)
      store.commit('setFollowing', following)
    } else {
      store.commit('setUser', null)
    }
  })
}

export default authCheck
