<template>
  <TimeReportsInFeed
  apiUrl="/v1/tag_feed"
  feedType="tagFeed"
  nonFollowingTitle="まだタグをフォローしていません。"
  nonFollowingMessage="タグフィードにはフォローしているタグがついている全てのユーザーの投稿が表示されます。"
  >
  </TimeReportsInFeed>
</template>

<script>
import TimeReportsInFeed from './TimeReportsInFeed.vue'
export default {
  components: {
    TimeReportsInFeed
  }
}
</script>
