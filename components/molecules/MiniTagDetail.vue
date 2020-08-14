<template>
  <v-row class="tag-item">
    <v-col sm="5" cols="5" class="tag-chip">
      <Tag :tag="tag" :miniTagDetail="true" />
    </v-col>
    <v-col sm="2" cols="2" class="tag-post-count-col">
      <div class="tag-time-report">
        投稿数
      </div>
      <div class="tag-time-report-count">
        {{ tag.time_report_count }}
      </div>
    </v-col>
    <v-col sm="2" cols="2" class="tag-follower-count-col">
      <div class="tag-follower">
        フォロワー
      </div>
      <div class="tag-follower-count">
        {{ tag.follower_count }}
      </div>
    </v-col>
    <v-col sm="3" cols="3" class="tag-follow-col">
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

.tag-chip {
  margin-top: 10px;
  padding: 12px 4px !important;
}

.tag-post-count-col, .tag-follower-count-col {
  padding-left: 6px !important;
  padding-right: 0 !important;
}

.tag-time-report, .tag-follower {
  margin-top: 10px;
}

.tag-time-report-count, .tag-follower-count {
  font-size: 1.0em;
}

.tag-time-report, .tag-follower, .tag-time-report-count, .tag-follower-count {
  text-align: center;
}

.tag-follow-button {
  margin-top: 4px;
}

@media (max-width: 480px) {

  .tag-time-report, .tag-follower {
    font-size: 0.6em;
  }

  .tag-time-report-count, .tag-follower-count {
    font-size: 0.8em;
  }
}

@media (max-width: 320px) {
  .tag-chip {
    margin-top: 10px;
    padding: 12px 2px !important;
  }

  .tag-time-report, .tag-follower {
    font-size: 0.4em;
  }

  .tag-post-count-col, .tag-follower-count-col {
    padding-left: 2px !important;
    padding-right: 0 !important;
  }

  .tag-follow-col {
    padding: 12px 2px !important;
  }
}
</style>
