<template>
  <div>
    <v-row class="notice-item">
      <v-col cols="2">
        <nuxt-link
        :to="noticeUserLink"
        class="no-link-style"
        >
          <v-avatar size="30" @click="closeField">
            <img src="~/assets/default_icon.jpeg" />
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
            あなたの記録に@{{ notice.screen_name }}さんがコメントしました。
          </div>
          <div
          v-if="notice.like_type === 'TimeReport'"
          @click="closeField"
          >
            あなたの記録に@{{ notice.screen_name }}さんがいいねしました。
          </div>
          <div
          v-if="notice.like_type === 'Comment'"
          @click="closeField"
          >
            あなたのコメントに@{{ notice.screen_name }}さんがいいねしました。
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
