<template>
  <div>
    <IconButton
    type="far fa-heart"
    @click="createLike"
    v-if="!liked"
    :disabled="!currentUser && !disabled"
    class="like-button"
    />
    <IconButton
    style="color: #EC407A;"
    type="fas fa-heart"
    @click="destroyLike"
    v-if="liked"
    :disabled="disabled"
    class="like-button"
    />
    <IconButton
    type="far fa-heart"
    @click="createLike"
    v-if="!liked"
    :disabled="!currentUser && !disabled"
    class="like-button-mobile"
    small
    />
    <IconButton
    style="color: #EC407A;"
    type="fas fa-heart"
    @click="destroyLike"
    v-if="liked"
    :disabled="disabled"
    class="like-button-mobile"
    small
    />
    <span class="like-count">
      {{ count }}
    </span>
  </div>
</template>

<script>
import IconButton from '../atoms/icons/IconButton.vue'
import axios from '@/plugins/axios'
import firebase from '@/plugins/firebase'

export default {
  components: {
    IconButton
  },
  props: {
    objectId: {
      type: Number,
      required: true
    },
    objectType: { // バックエンドにそのまま送信するのでパスカルケースで書くこと
      type: String,
      required: true
    },
    likesCount: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    return {
      liked: false,
      count: this.likesCount,
      disabled: false
    }
  },
  watch: {
    likesCount (newValue) {
      this.count = newValue
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    createLike () {
      if (this.disabled) { return }
      this.disabled = true
      const likeParams = {
        likeable_type: this.objectType,
        likeable_id: this.objectId,
        user_id: this.currentUser.id
      }
      const user = firebase.auth().currentUser
      if (user) {
        const that = this
        user.getIdToken(true).then(function (idToken) {
          const config = {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          }
          axios
            .post('/v1/like', { like: likeParams }, config)
            .then((res) => {
              that.liked = true
              const likeable = {
                likeable_type: that.objectType,
                likeable_id: that.objectId
              }
              that.$emit('addLiked')
              that.$store.commit('addLiked', likeable)
            })
        })
      }
      setTimeout(() => {
        this.disabled = false
      }, 200)
    },
    destroyLike () {
      if (this.disabled) { return }
      this.disabled = true
      const likeParams = {
        likeable_type: this.objectType,
        likeable_id: this.objectId,
        user_id: this.currentUser.id
      }
      const user = firebase.auth().currentUser
      if (user) {
        const that = this
        user.getIdToken(true).then(function (idToken) {
          const config = {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          }
          axios
            .delete('/v1/like/delete', { params: { like: likeParams } }, config)
            .then(() => {
              that.liked = false
              const likeable = {
                likeable_type: that.objectType,
                likeable_id: that.objectId
              }
              that.$emit('destroyLike')
              that.$store.commit('removeLiked', likeable)
              setTimeout(() => {
                that.disabled = false
              }, 200)
            })
        })
      }
    }
  },
  mounted () {
    this.disabled = true
    if (this.currentUser) {
      setTimeout(() => {
        const liked = this.currentUser.liked
        const likeable = {
          likeable_type: this.objectType,
          likeable_id: this.objectId
        }
        // currentUserがいいねしているかどうか判定
        const judgment = liked.find((l) => {
          return l.likeable_id === likeable.likeable_id &&
          l.likeable_type === likeable.likeable_type
        })
        if (judgment) { this.liked = true }
      }, 500)
    }
    this.disabled = false
  }
}
</script>

<style scoped>
.like-button {
  display: inline-block;
}

.like-button-mobile {
  display: none;
}

.like-count {
  font-size: 1.2em;
  vertical-align: -20%;
}

@media (max-width: 480px) {
  .like-button {
    display: none;
  }

  .like-button-mobile {
    display: inline-block;
  }

  .like-count {
    font-size: 1.0em;
    vertical-align: none;
  }
}
</style>
