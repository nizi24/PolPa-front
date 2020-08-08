<template>
  <div>
    <v-card v-if="nonFollowing" id="non-posting-card">
      {{ nonFollowingTitle }}
      <div style="font-size: 0.8em; color: #888888;">
        {{ nonFollowingMessage }}
      </div>
    </v-card>
    <v-card v-else-if="nonTimeReports" id="non-posting-card">
      投稿がありません。
    </v-card>
    <template v-else>
      <TimeReport
      class="feed-time-report"
      v-for="time_report in timeReports"
      :key="time_report.id"
      :user="time_report.user"
      :time_report="time_report"
      @deleteTimeReport="deleteTimeReport"
      @addLikesCount="addLikesCount"
      @subLikesCount="subLikesCount"
      @addComment="addCommentsCount"
      @subComment="subCommentsCount"
      />
      <template v-if="loading">
        <v-skeleton-loader
        v-for="n in 10"
        :key="n"
        class="mx-auto"
        type="card"
        />
      </template>
      <v-btn
      v-if="more && !loading && !moreLoading"
      block
      style="margin-top: 10px;"
      @click="moreTimeline"
      >
        もっと見る
      </v-btn>
      <template v-if="moreLoading">
        <v-skeleton-loader
        v-for="n in 5"
        :key="n"
        class="mx-auto"
        type="card"
        />
      </template>
    </template>
  </div>
</template>

<script>
import TimeReport from '../timeReports/TimeReport.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    TimeReport
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    },
    feedType: {
      type: String,
      required: true
    },
    nonFollowingTitle: {
      type: String
    },
    nonFollowingMessage: {
      type: String
    }
  },
  data () {
    return {
      timeReport: 0,
      timeReports: [],
      more: true,
      loading: false,
      moreLoading: false,
      nonFollowing: false,
      nonTimeReports: false
    }
  },
  computed: {
    currentUser () {
      if (this.feedType !== 'newest') {
        return this.$store.state.currentUser
      } else {
        return false
      }
    }
  },
  methods: {
    moreTimeline () {
      this.moreLoading = true
      const params = {
        offset: this.timeReport
      }
      if (this.feedType !== 'newest') {
        params.current_user_id = this.currentUser.id
      }
      axios.get(this.apiUrl, { params })
        .then((res) => {
          const timeReports = JSON.parse(res.data.time_reports)
          this.timeReports = this.timeReports.concat(timeReports)
          this.timeReport = this.timeReports.length
          if (timeReports.length < 30) {
            this.more = false
          }
          this.moreLoading = false
        })
    },
    addLikesCount (id) {
      this.timeReports = this.timeReports.map((t) => {
        if (t.id === id) {
          t.likes_count += 1
        }
        return t
      })
    },
    subLikesCount (id) {
      this.timeReports = this.timeReports.map((t) => {
        if (t.id === id) {
          t.likes_count -= 1
        }
        return t
      })
    },
    addCommentsCount (id) {
      this.timeReports = this.timeReports.map((t) => {
        if (t.id === id) {
          t.comments_count += 1
        }
        return t
      })
    },
    subCommentsCount (id) {
      this.timeReports = this.timeReports.map((t) => {
        if (t.id === id) {
          t.comments_count -= 1
        }
        return t
      })
    },
    deleteTimeReport (timeReportId) {
      this.timeReports = this.timeReports.filter((t) => {
        return t.id !== timeReportId
      })
    }
  },
  mounted () {
    this.loading = true
    const getter = () => {
      const params = {}
      if (this.feedType !== 'newest') {
        params.current_user_id = this.currentUser.id
      }
      axios.get(this.apiUrl, { params })
        .then((res) => {
          if (res.data === 'フォローしていません') {
            this.nonFollowing = true
          } else if (res.data === '投稿がありません') {
            this.nonTimeReports = true
          } else {
            const timeReports = JSON.parse(res.data.time_reports)
            this.timeReports = timeReports
            this.timeReport = this.timeReports.length
            if (this.timeReport < 30) {
              this.more = false
            }
            this.loading = false
          }
        })
    }
    if (this.currentUser.id || this.feedType === 'newest') {
      getter()
    } else {
      setTimeout(getter, 2000)
    }
    this.$store.subscribe((mutation, state) => {
      if (this.feedType === 'tagFeed') {
        if (mutation.type === 'timeReport/setTimeReport') {
          const tag = mutation.payload.tags.some((tag) => {
            return this.currentUser.tagFollowing.includes(tag.id)
          })
          if (tag) {
            this.timeReports.unshift(mutation.payload)
          }
        }
      } else if (this.feedType === 'newest') {
        if (mutation.type === 'timeReport/setTimeReport') {
          this.timeReports.unshift(mutation.payload)
        }
      }
    })
  }
}
</script>

<style scoped>
#non-posting-card {
  font-size: 1.0em;
  padding: 20px;
  text-align: center;
}

.feed-time-report {
  padding: 0 !important;
}

@media (max-width: 480px) {
  .feed-time-report {
    padding: 6px 0px !important;
  }
}
</style>
