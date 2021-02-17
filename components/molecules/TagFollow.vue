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
    v-if="!followed && !loading && !iconOnly"
    :disabled="disabled"
    >
      <v-icon x-small style="margin-right: 10px;">
        fas fa-plus
      </v-icon>
      <span style="margin-bottom: 2px">フォロー</span>
    </v-btn>
    <v-tooltip
    bottom
    max-width="250px"
    v-if="!followed && !loading && iconOnly"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        v-bind="attrs"
        v-on="on"
        small
        class="ma-2 tag-follow-button"
        outlined
        color="primary"
        @click="follow"
        :disabled="disabled"
        >
          <v-icon small style="margin-right: 4px;">
            fas fa-tag
          </v-icon>
          <v-icon x-small>
            fas fa-plus
          </v-icon>
        </v-btn>
      </template>
      <span>タグをフォローできます</span>
    </v-tooltip>
    <v-btn
    small
    class="ma-2"
    color="primary"
    @click="unfollow"
    :disabled="disabled"
    v-if="followed && !loading && !iconOnly"
    >
      <v-icon x-small style="margin-right: 10px;">
        fas fa-minus
      </v-icon>
      <span style="margin-bottom: 2px">フォロー解除</span>
    </v-btn>
    <v-tooltip
    bottom
    max-width="250px"
    v-if="followed && !loading && iconOnly"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        v-bind="attrs"
        v-on="on"
        small
        class="ma-2 tag-unfollow-button"
        color="primary"
        @click="unfollow"
        :disabled="disabled"
        >
          <v-icon small style="margin-right: 4px;">
            fas fa-tag
          </v-icon>
          <v-icon x-small>
            fas fa-minus
          </v-icon>
        </v-btn>
      </template>
      <span>タグをフォロー解除する</span>
    </v-tooltip>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import firebase from '@/plugins/firebase'

export default {
  props: {
    tagId: {
      type: Number,
      required: true
    },
    iconOnly: {
      type: Boolean,
      default: false
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
            .post(`/v1/tags/${that.tagId}/follow`, { user_id: that.currentUser.id }, config)
            .then((res) => {
              that.followed = true
              that.$store.commit('addTagFollowing', res.data)
              that.$emit('addTagFollower')
            })
          setTimeout(() => {
            that.disabled = false
          }, 200)
        })
      }
    },
    unfollow () {
      if (this.disabled) { return }
      this.disabled = true
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
            .delete(`/v1/tags/${that.tagId}/unfollow`, config, { params: { user_id: that.currentUser.id } })
            .then((res) => {
              that.followed = false
              that.$store.commit('removeTagFollowing', res.data)
              that.$emit('subTagFollower')
            })
          setTimeout(() => {
            that.disabled = false
          }, 200)
        })
      }
    }
  },
  mounted () {
    this.loading = true
    const followCheck = () => {
      const following = this.currentUser.tagFollowing
      const followed = following.some((f) => {
        return this.tagId === f
      })
      if (followed) { this.followed = true }
      this.loading = false
    }
    setTimeout(followCheck, 2000)
  }
}
</script>
