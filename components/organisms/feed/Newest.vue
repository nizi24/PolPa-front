<template>
  <div>
    <TimeReport
    style="padding: 0 !important;"
    v-for="time_report in timeReports"
    :key="time_report.id"
    :user="time_report.user"
    :time_report="time_report"
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
      moreLoading: false
    }
  },
  methods: {
    moreTimeline () {
      this.moreLoading = true
      axios.get('/v1/time_reports', {
        params: {
          offset: this.timeReport
        }
      })
        .then((res) => {
          const timeReports = JSON.parse(res.data.time_reports)
          this.timeReports = this.timeReports.concat(timeReports)
          this.timeReport = this.timeReports.length
          if (timeReports.length < 30) {
            this.more = false
          }
          this.moreLoading = false
        })
    }
  },
  mounted () {
    this.loading = true
    const getter = () => {
      axios.get('/v1/time_reports')
        .then((res) => {
          const timeReports = JSON.parse(res.data.time_reports)
          this.timeReports = timeReports
          this.timeReport = this.timeReports.length
          if (this.timeReport < 30) {
            this.more = false
          }
          this.loading = false
        })
    }
    getter()
  }
}
</script>
