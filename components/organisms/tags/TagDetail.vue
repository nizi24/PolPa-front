<template>
  <v-card>
    <v-card-title>
      <span style="margin: 0 auto">{{ tag.name }}</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6" class="tag-follower">
          <div class="tag-follower-count">{{ tag.follower_count }}</div>
          <div>フォロワー</div>
        </v-col>
        <v-col cols="6" class="tag-time-reports">
          <div class="tag-time-reports-count">{{ tag.time_report_count }}</div>
          <div>投稿数</div>
        </v-col>
      </v-row>
      <v-row justify="center" class="tag-follow-button">
        <TagFollow
        v-if="tag.id"
        :tagId="tag.id"
        @addTagFollower="tag.follower_count++"
        @subTagFollower="tag.follower_count--"
        />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import TagFollow from '../../molecules/TagFollow.vue'
export default {
  components: {
    TagFollow
  },
  props: {
    tag: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.tag-follower, .tag-time-reports {
  text-align: center;
}

.tag-follower {
  border-right: 1px solid #e8e8e8;
}

.tag-follower-count, .tag-time-reports-count {
  font-size: 1.4em;
}

.tag-follow-button {
  margin-top: 10px;
}
</style>
