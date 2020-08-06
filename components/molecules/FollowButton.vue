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
    <v-btn
    small
    class="ma-2 mobile-none"
    outlined
    color="primary"
    @click="follow"
    v-if="!followed && !loading && iconOnly"
    :disabled="disabled"
    >
      <v-icon small>
        fas fa-user-plus
      </v-icon>
    </v-btn>
    <v-btn
    x-small
    class="ma-2 mobile-only"
    outlined
    color="primary"
    @click="follow"
    v-if="!followed && !loading && iconOnly"
    :disabled="disabled"
    >
      <v-icon small>
        fas fa-user-plus
      </v-icon>
    </v-btn>
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
    <v-btn
    small
    class="ma-2 mobile-none"
    color="primary"
    @click="unfollow"
    :disabled="disabled"
    v-if="followed && !loading && iconOnly"
    >
      <v-icon small>
        fas fa-user-minus
      </v-icon>
    </v-btn>
    <v-btn
    x-small
    class="ma-2 mobile-only"
    color="primary"
    @click="unfollow"
    :disabled="disabled"
    v-if="followed && !loading && iconOnly"
    >
      <v-icon small>
        fas fa-user-minus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  props: {
    userId: {
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
      axios
        .post(`/v1/users/${this.userId}/follow`, {
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
        .delete(`/v1/users/${this.userId}/unfollow`, {
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
    this.loading = true
    this.disabled = true
    setTimeout(() => {
      if (this.currentUser) {
        const following = this.currentUser.following
        // currentUserがフォローしているかどうか判定
        const followed = following.some((f) => {
          return this.userId === f
        })
        if (followed) { this.followed = true }
      }
      this.loading = false
      this.disabled = false
    }, 2000)
  }
}
</script>

<style scoped>
.mobile-only {
  display: none;
}

@media (max-width: 480px) {
  .mobile-only {
    display: inline-block;
    margin-left: 2px !important;
  }

  .mobile-none {
    display: none;
  }
}
</style>
