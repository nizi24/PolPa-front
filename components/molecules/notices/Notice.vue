<template>
  <div v-if="notice && notice.action_user" @click="closeField">
    <v-row class="notice-item">
      <v-col cols="2">
        <nuxt-link
        :to="noticeUserLink"
        class="no-link-style"
        >
          <v-avatar size="30">
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
          <v-row>
            <template
            v-if="notice.noticeable_type === 'Comment'"
            >
              あなたの記録に@{{ notice.action_user.screen_name }}さんがコメントしました。
            </template>
            <template
            v-if="notice.like_type === 'TimeReport'"
            >
              あなたの記録に@{{ notice.action_user.screen_name }}さんがいいねしました。
            </template>
            <template
            v-if="notice.like_type === 'Comment'"
            >
              あなたのコメントに@{{ notice.action_user.screen_name }}さんがいいねしました。
            </template>
            <template
            v-if="notice.noticeable_type === 'Relationship'"
            >
              @{{ notice.action_user.screen_name }}さんにフォローされました。
            </template>
          </v-row>
          <v-row class="notice-time">{{ createdAt }}</v-row>
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
    },
    createdAt () {
      const noticeCreateAt = this.notice.created_at
      const date = noticeCreateAt.substr(0, 16).split('T')[0]
        .replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日')
      const time = noticeCreateAt.substr(0, 16).split('T')[1]
      return date + ' ' + time
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

.notice-time {
  color: #888888;
}
</style>
