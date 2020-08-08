<template>
  <TimeReportsInFeed
  apiUrl="/v1/timeline"
  feedType="timeline"
  nonFollowingTitle="まだユーザーをフォローしていません。"
  nonFollowingMessage="タイムラインにはフォローしているユーザーの投稿が表示されます。"
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
