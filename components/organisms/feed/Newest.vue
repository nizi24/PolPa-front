<template>
  <TimeReportsInFeed
  apiUrl="/v1/time_reports"
  feedType="newest"
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
