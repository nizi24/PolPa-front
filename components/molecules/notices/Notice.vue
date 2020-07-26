<template>
  <div v-if="notice">
    <v-row class="notice-item">
      <v-col cols="2">
        <nuxt-link
        :to="noticeUserLink"
        class="no-link-style"
        >
          <v-avatar size="30" @click="closeField">
            <img
            v-if="notice.action_user.avatar_url"
            :src="notice.action_user.avatar_url"
            >
            <img
            v-else
            src="~/assets/default_icon.jpeg"
            />
          </v-avatar>
        </nuxt-link>
      </v-col>
      <v-col cols="10">
        <nuxt-link
        :to="noticeLink"
        class="no-link-style"
        >
          <div
          v-if="notice.noticeable_type === 'Comment'"
          @click="closeField"
          >
            あなたの記録に@{{ notice.action_user.screen_name }}さんがコメントしました。
          </div>
          <div
          v-if="notice.like_type === 'TimeReport'"
          @click="closeField"
          >
            あなたの記録に@{{ notice.action_user.screen_name }}さんがいいねしました。
          </div>
          <div
          v-if="notice.like_type === 'Comment'"
          @click="closeField"
          >
            あなたのコメントに@{{ notice.action_user.screen_name }}さんがいいねしました。
          </div>
          <div
          v-if="notice.noticeable_type === 'Relationship'"
          @click="closeField"
          >
            @{{ notice.action_user.screen_name }}さんにフォローされました。
          </div>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    notice: {
      type: Object,
      required: true
    }
  },
  computed: {
    noticeLink () {
      if (this.notice.time_report_id) {
        return `/time_reports/${this.notice.time_report_id}`
      } else if (this.notice.noticeable_type === 'Relationship') {
        return `/users/${this.notice.action_user_id}`
      }
      return ''
    },
    noticeUserLink () {
      return `/users/${this.notice.action_user_id}`
    }
  },
  methods: {
    closeField () {
      this.$emit('closeField')
    }
  },
  mounted () {
    return this.notice
  }
}
</script>

<style scoped>
.notice-item {
  border-bottom: 1px solid #e8e8e8;
}

.no-link-style {
  color: inherit;
  text-decoration: none;
}
</style>
