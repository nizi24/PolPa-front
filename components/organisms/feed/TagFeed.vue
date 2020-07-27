<template>
  <div>
    <v-card v-if="nonFollowing" id="non-posting-card">
      まだタグをフォローしていません。
    </v-card>
    <v-card v-else-if="nonTimeReports" id="non-posting-card">
      投稿がありません。
    </v-card>
    <template v-else>
      <TimeReport
      style="padding: 0 !important;"
      v-for="time_report in timeReports"
      :key="time_report.id"
      :user="time_report.user"
      :time_report="time_report"
      @deleteTimeReport="deleteTimeReport"
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
      return this.$store.state.currentUser
    }
  },
  methods: {
    moreTimeline () {
      this.moreLoading = true
      axios.get('/v1/tag_feed', {
        params: {
          current_user_id: this.currentUser.id,
          offset: this.timeReport
        }
      }).then((res) => {
        const timeReports = JSON.parse(res.data.time_reports)
        this.timeReports = this.timeReports.concat(timeReports)
        this.timeReport = this.timeReports.length
        if (timeReports.length < 30) {
          this.more = false
        }
        this.moreLoading = false
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
      if (this.currentUser.id) {
        axios.get('/v1/tag_feed', {
          params: {
            current_user_id: this.currentUser.id
          }
        }).then((res) => {
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
    }
    if (this.currentUser.id) {
      getter()
    } else {
      setTimeout(getter, 2000)
    }
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'timeReport/setTimeReport') {
        const tag = mutation.payload.tags.some((tag) => {
          return this.currentUser.tagFollowing.includes(tag.id)
        })
        if (tag) {
          this.timeReports.unshift(mutation.payload)
        }
      }
    })
  }
}
</script>

<style scoped>
#non-posting-card {
  color: #888888;
  font-size: 1.0em;
  padding: 20px;
  text-align: center;
}
</style>
