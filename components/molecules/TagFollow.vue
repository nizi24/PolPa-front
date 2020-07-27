<template>
  <div v-if="currentUser">
    <v-skeleton-loader
    v-if="loading"
    type="button"
    />
    <v-btn
    small
    class="ma-2"
    outlined
    color="primary"
    @click="follow"
    v-if="!followed && !loading"
    :disabled="disabled"
    >
      <v-icon x-small style="margin-right: 10px;">
        fas fa-plus
      </v-icon>
      <span style="margin-bottom: 2px">フォロー</span>
    </v-btn>
    <v-btn
    small
    class="ma-2"
    color="primary"
    @click="unfollow"
    :disabled="disabled"
    v-if="followed && !loading"
    >
      <v-icon x-small style="margin-right: 10px;">
        fas fa-minus
      </v-icon>
      <span style="margin-bottom: 2px">フォロー解除</span>
    </v-btn>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  props: {
    tagId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      followed: false,
      disabled: false,
      loading: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    follow () {
      if (this.disabled) { return }
      this.disabled = true
      axios
        .post(`/v1/tags/${this.tagId}/follow`, { user_id: this.currentUser.id })
        .then((res) => {
          this.followed = true
          this.$store.commit('addTagFollowing', res.data)
          this.$emit('addTagFollower')
        })
      setTimeout(() => {
        this.disabled = false
      }, 200)
    },
    unfollow () {
      if (this.disabled) { return }
      this.disabled = true
      axios
        .delete(`/v1/tags/${this.tagId}/unfollow`, { params: { user_id: this.currentUser.id } })
        .then((res) => {
          this.followed = false
          this.$store.commit('removeTagFollowing', res.data)
          this.$emit('subTagFollower')
        })
      setTimeout(() => {
        this.disabled = false
      }, 200)
    }
  },
  mounted () {
    this.loading = true
    const followCheck = () => {
      const following = this.currentUser.tagFollowing
      const followed = following.some((f) => {
        return Number(this.$route.params.id) === f
      })
      if (followed) { this.followed = true }
      this.loading = false
    }
    setTimeout(followCheck, 2000)
  }
}
</script>
