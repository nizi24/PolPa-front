<template>
  <v-row class="tag-item">
    <v-col sm="2" cols="3">
      <Tag :tag="tag" />
    </v-col>
    <v-col sm="4" cols="3" class="tag-post-count-col">
      <div class="tag-time-report-count">
        投稿数: {{ tag.time_report_count }}
      </div>
    </v-col>
    <v-col sm="4" cols="3" class="tag-follower-count-col">
      <div class="tag-follower-count">
        フォロワー: {{ tag.follower_count }}
      </div>
    </v-col>
    <v-col sm="2" cols="3" class="tag-follow-col">
      <TagFollow
      :tagId="tag.id"
      :iconOnly="true"
      class="tag-follow-button"
      @addTagFollower="tag.follower_count++"
      @subTagFollower="tag.follower_count--"
      />
    </v-col>
  </v-row>
</template>

<script>
import Tag from './Tag.vue'
import TagFollow from './TagFollow.vue'
export default {
  components: {
    Tag,
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
.tag-item {
  border-bottom: 1px solid #e8e8e8;
}

.tag-time-report-count, .tag-follower-count {
  margin-top: 10px;
  font-size: 1.2em;
}

.tag-follow-button {
  margin-top: 4px;
}

@media (max-width: 480px) {
  .tag-time-report-count, .tag-follower-count {
    font-size: 0.8em;
  }

  .tag-post-count-col, .tag-follower-count-col {
    padding-left: 6px !important;
    padding-right: 0 !important;
  }
}
</style>
