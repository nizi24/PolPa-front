<template>
  <div>
    <v-row justify="center">
      <v-col cols="2" v-if="Number(paramsUserId) !== currentUser.id">
      </v-col>
      <v-col cols="2">
        <v-row justify="center">
          <span>フォロー</span>
        </v-row>
        <v-row justify="center">
          <h3>{{ followingCount }}</h3>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-row justify="center">
          <span>フォロワー</span>
        </v-row>
        <v-row justify="center">
          <h3>{{ followerCount }}</h3>
        </v-row>
      </v-col>
      <v-col cols="2" v-if="Number(paramsUserId) !== currentUser.id">
        <v-btn
        small
        class="ma-2"
        outlined
        color="primary"
        @click="follow"
        v-if="!followed"
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
        v-else
        >
          <v-icon x-small style="margin-right: 10px;">
            fas fa-minus
          </v-icon>
          <span style="margin-bottom: 2px">フォロー解除</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  props: {
    followingCount: {
      type: Number,
      required: true
    },
    followerCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      followed: false,
      disabled: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    paramsUserId () {
      return this.$route.params.id
    }
  },
  methods: {
    follow () {
      if (this.disabled) { return }
      this.disabled = true
      axios
        .post(`/v1/users/${this.$route.params.id}/follow`, {
          current_user_id: this.currentUser.id
        })
        .then((res) => {
          this.$store.commit('addFollowing', res.data)
          this.followed = true
          this.$emit('addFollower')
        })
      setTimeout(() => {
        this.disabled = false
      }, 200)
    },
    unfollow () {
      if (this.disabled) { return }
      this.disabled = true
      axios
        .delete(`/v1/users/${this.$route.params.id}/unfollow`, {
          params:
            { current_user_id: this.currentUser.id }
        })
        .then((res) => {
          this.$store.commit('removeFollowing', res.data)
          this.followed = false
          this.$emit('subFollower')
        })
      setTimeout(() => {
        this.disabled = false
      }, 200)
    }
  },
  mounted () {
    this.disabled = true
    setTimeout(() => {
      if (this.currentUser) {
        const following = this.currentUser.following
        // currentUserがフォローしているかどうか判定
        const followed = following.some((f) => {
          return Number(this.$route.params.id) === f
        })
        if (followed) { this.followed = true }
      }
      this.disabled = false
    }, 2000)
  }
}
</script>
