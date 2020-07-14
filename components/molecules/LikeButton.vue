<template>
  <div>
    <IconButton
    type="far fa-heart"
    @click="createLike"
    v-if="!liked"
    :disabled="!currentUser && !disabled"
    />
    <IconButton
    style="color: #EC407A;"
    type="fas fa-heart"
    @click="destroyLike"
    v-if="liked"
    :disabled="disabled"
    />
    <span style="font-size: 1.2em; vertical-align: -20%">
      {{ count }}
    </span>
  </div>
</template>

<script>
import IconButton from '../atoms/icons/IconButton.vue'
import axios from '@/plugins/axios'

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
      axios
        .post('/v1/like', { like: likeParams })
        .then((res) => {
          this.liked = true
          const likeable = {
            likeable_type: this.objectType,
            likeable_id: this.objectId
          }
          this.$emit('addLiked')
          this.$store.commit('addLiked', likeable)
        })
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
      axios
        .delete('/v1/like/delete', { params: { like: likeParams } })
        .then(() => {
          this.liked = false
          const likeable = {
            likeable_type: this.objectType,
            likeable_id: this.objectId
          }
          this.$emit('destroyLike')
          this.$store.commit('removeLiked', likeable)
          setTimeout(() => {
            this.disabled = false
          }, 200)
        })
    }
  },
  mounted () {
    if (this.currentUser) {
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
    }
  }
}
</script>
