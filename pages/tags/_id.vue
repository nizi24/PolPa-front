<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="4" sm="8" cols="12">
        <TagDetail
        :tag="tag"
        />
      </v-col>
      <v-col lg="6" sm="8" cols="12">
        <v-sheet class="pa-5">
          <v-icon color="#FFA000">far fa-clock</v-icon>
          <span class="tag-post">最近の投稿</span>
        </v-sheet>
        <TimeReportsWithPagination
        :time_reports="timeReports"
        :newTimeReport="newTimeReport"
        @additionTimeReportCondition="additionTimeReportCondition"
        @deleteTimeReport="deleteTimeReport"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TimeReportsWithPagination from '~/components/organisms/timeReports/TimeReportsWithPagination.vue'
import TagDetail from '~/components/organisms/tags/TagDetail.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    TagDetail,
    TimeReportsWithPagination
  },
  data () {
    return {
      tag: {},
      timeReports: [],
      newTimeReport: {}
    }
  },
  methods: {
    additionTimeReportCondition (newTimeReport) {
      const tagIds = newTimeReport.tags.map((tag) => {
        return tag.id.toString()
      })
      if (tagIds.includes(this.$route.params.id)) {
        this.newTimeReport = newTimeReport
        this.tag.time_report_count++
      }
    },
    deleteTimeReport () {
      this.tag.time_report_count--
    }
  },
  mounted () {
    axios.get(`/v1/tags/${this.$route.params.id}`)
      .then((res) => {
        const tag = JSON.parse(res.data.tag)
        const timeReports = JSON.parse(res.data.time_reports)
        this.tag = tag
        this.timeReports = timeReports
      })
  }
}
</script>

<style scoped>
.tag-post {
  font-weight: bold;
  font-size: 1.1em;
  margin-left: 5px;
  vertical-align: -5%;
}
</style>
