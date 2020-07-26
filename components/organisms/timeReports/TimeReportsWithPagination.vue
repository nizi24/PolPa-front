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
    />
    <v-pagination
    v-if="length"
    v-model="page"
    :length="length"
    total-visible="10"
    @input="pageChange"
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
    pageChange (pageNumber) {
      this.displayTimeReports = this.timeReports
        .slice(this.pageSize * (pageNumber - 1), this.pageSize * (pageNumber))
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
      this.displayTimeReports = this.timeReports.filter((t) => {
        return ids.includes(t.id)
      })
      this.length = 1
      this.page = 1
      this.$emit('tagSearchComplete')
    },
    restoration () {
      this.displayTimeReports = this.timeReports
        .slice(this.pageSize * (this.page - 1), this.pageSize * (this.page))
      this.length = Math.ceil(this.time_reports.length / this.pageSize)
      this.$emit('restorationComplete')
    },
    addTimeReport (newTimeReport) {
      this.timeReports.unshift(newTimeReport)
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
