<template>
  <v-container>
    <ErrorCard
    :display="notFound"
    title="404 not find"
    message="タグが存在しません。"
    />
    <v-row justify="center" v-if="!notFound">
      <v-col lg="4" sm="8" cols="12">
        <TagDetail
        :tag="tag"
        />
      </v-col>
      <v-col lg="7" sm="10" cols="12">
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
import ErrorCard from '~/components/molecules/ErrorCard.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    TagDetail,
    TimeReportsWithPagination,
    ErrorCard
  },
  data () {
    return {
      tag: {},
      timeReports: [],
      newTimeReport: {},
      notFound: false
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
      .catch((error) => {
        if (error.response.status === 404) {
          this.notFound = true
        }
        console.error(error)
      })
  },
  head () {
    return {
      title: `${this.tag.name} - PolPa`
    }
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
