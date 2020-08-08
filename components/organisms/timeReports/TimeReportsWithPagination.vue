<template>
  <div v-if="time_reports.length">
    <TimeReport
    v-for="time_report in displayTimeReports"
    :key="time_report.id"
    :user="user || time_report.user"
    :time_report="time_report"
    @updateTimeReport="updateExperience"
    @deleteTimeReport="deleteTimeReport"
    @addLikesCount="addLikesCount"
    @subLikesCount="subLikesCount"
    @addComment="addCommentsCount"
    @subComment="subCommentsCount"
    />
    <v-pagination
    v-if="length"
    v-model="page"
    :length="length"
    total-visible="10"
    />
  </div>
</template>

<script>
import TimeReport from './TimeReport.vue'
export default {
  components: {
    TimeReport
  },
  props: {
    time_reports: {
      type: Array,
      required: true
    },
    user: {
      type: [Object, Boolean],
      default: false
    },
    restore: {
      type: Boolean,
      default: false
    },
    ids: {
      type: Array,
      default: () => { return [] }
    },
    tagSearch: {
      type: Boolean,
      default: false
    },
    newTimeReport: { // 追加する投稿
      type: Object,
      required: true
    }
  },
  data () {
    return {
      timeReports: this.time_reports,
      page: 1,
      pageSize: 10
    }
  },
  watch: {
    time_reports (newValue) {
      this.timeReports = newValue
    },
    restore (newValue) {
      if (newValue) {
        this.restoration()
      }
    },
    tagSearch (newValue) {
      if (newValue) {
        this.searchTimeReportInTags(this.ids)
      }
    },
    newTimeReport (newValue) {
      if (Object.keys(newValue)) {
        this.addTimeReport(newValue)
      }
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    displayTimeReports () {
      return this.timeReports
        .slice(this.pageSize * (this.page - 1), this.pageSize * (this.page))
    },
    length () {
      return Math.ceil(this.timeReports.length / this.pageSize)
    }
  },
  methods: {
    updateExperience (data, timeReport) {
      this.updateTimeReport(timeReport)
      this.$emit('updateExperience', data)
    },
    updateTimeReport (timeReport) {
      if (timeReport) {
        this.timeReports = this.timeReports.map((t) => {
          if (t.id === timeReport.id) {
            t = timeReport
          }
          return t
        })
      }
    },
    deleteTimeReport (timeReportId, weeklyTarget) {
      this.timeReports = this.timeReports.filter((t) => {
        return t.id !== timeReportId
      })
      if (weeklyTarget && this.user.target_of_the_week) {
        this.user.target_of_the_week = []
        this.user.target_of_the_week.unshift(weeklyTarget)
      }
      this.$emit('deleteTimeReport')
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
    searchTimeReportInTags (ids) {
      this.timeReports = this.time_reports.filter((t) => {
        return ids.includes(t.id)
      })
      this.page = 1
      this.$emit('tagSearchComplete')
    },
    restoration () {
      this.timeReports = this.time_reports
      this.$emit('restorationComplete')
    },
    addTimeReport (newTimeReport) {
      this.timeReports.unshift(newTimeReport)
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
    }
  },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'timeReport/setTimeReport') {
        // 新しい投稿を追加して良いかどうかを検証する
        this.$emit('additionTimeReportCondition', mutation.payload)
      }
    })
  }
}
</script>
