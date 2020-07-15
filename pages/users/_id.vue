<template>
<div>
  <ErrorCard
  :display="userNotFound"
  title="404 not find"
  message="ユーザーが存在しません。"
  />
  <v-container v-if="!userNotFound">
    <v-card class="mx-auto mt-5 pa-5" width="1000px">
      <v-row justify="center">
        <v-col cols="2" :class="changeColor">
          <v-row justify="center" style="margin-top: 48px;">
            <h1>Lv.{{ user.level }}</h1>
          </v-row>
          <v-row justify="center">
            <span>current Level</span>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row justify="center">
            <v-avatar size="80">
              <img src="~/assets/default_icon.jpeg" />
            </v-avatar>
          </v-row>
          <v-row justify="center">
            <h2>{{ user.name }}</h2>
          </v-row>
          <v-row justify="center">
            <span>@{{ user.screen_name }}</span>
          </v-row>
        </v-col>
        <v-col cols="2" :class="changeColor">
          <v-row justify="center" style="margin-top: 48px;">
            <h1>{{ user.total_experience }}</h1>
          </v-row>
          <v-row justify="center">
            <span>Total EXP</span>
          </v-row>
        </v-col>
      </v-row>
      <!-- <v-row justify="center">
        <img src="~/assets/goal.jpeg" width="32px" height="32px" />
      </v-row> -->
      <v-row justify="center" align-content="center">
        <v-col cols="1">
        </v-col>
        <v-col cols="7">
          <v-progress-linear height="10px" :value="progressProportion">
          </v-progress-linear>
        </v-col>
        <v-col cols="2" style="padding-top: 6px; color: #B0BEC5;">
          {{ progressNumeretor }}/{{ requiredExp.required_exp }}
        </v-col>
      </v-row>
      <MainTags
      :mainTags="mainTags"
      />
      <v-row justify="center">
        <Heatmap :timeReports="timeReports" />
      </v-row>
    </v-card>
  </v-container>
  <v-row justify="center">
    <v-col cols="6">
      <v-card style="padding: 30px;">
        <TagSearch
        v-if="length"
        @searchTimeReportInTags="searchTimeReportInTags"
        />
      </v-card>
    </v-col>
  </v-row>
  <TimeReport
  v-for="time_report in displayTimeReports"
  :key="time_report.id"
  :user="user"
  :time_report="time_report"
  @updateTimeReport="updateExperience"
  @deleteTimeReport="deleteTimeReport"
  @addLikesCount="addLikesCount"
  @subLikesCount="subLikesCount"
  @addCommentLikesCount="addCommentLikesCount"
  @subCommentLikesCount="subCommentLikesCount"
  />
  <v-pagination
  v-if="length"
  v-model="page"
  :length="length"
  @input="pageChange"
  />
</div>
</template>

<script>
import axios from '@/plugins/axios'
import ErrorCard from '~/components/molecules/ErrorCard.vue'
import Heatmap from '~/components/molecules/Heatmap.vue'
import TimeReport from '~/components/organisms/timeReports/TimeReport.vue'
import TagSearch from '~/components/molecules/TagSearch.vue'
import MainTags from '~/components/molecules/MainTags.vue'

export default {
  components: {
    ErrorCard,
    Heatmap,
    TimeReport,
    TagSearch,
    MainTags
  },
  data () {
    return {
      user: {},
      timeReports: [],
      displayTimeReports: [],
      requiredExp: {},
      mainTags: [],
      userNotFound: false,
      page: 1,
      length: 0,
      pageSize: 10
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    progressProportion () {
      const proportion = 100 - this.user.experience_to_next / this.requiredExp.required_exp * 100
      if (proportion === 100) {
        return 0
      } else {
        return proportion
      }
    },
    progressNumeretor () {
      return this.requiredExp.required_exp - this.user.experience_to_next
    },
    changeColor () {
      const level = this.user.level
      if (level >= 100) {
        return 'amber--text text--darken-4'
      } else if (level >= 80) {
        return 'amber--text text--darken-3'
      } else if (level >= 50) {
        return 'amber--text text--darken-2'
      } else if (level >= 20) {
        return 'amber--text text--lighten-1'
      } else {
        return 'amber--text text--lighten-2'
      }
    }
  },
  methods: {
    updateExperience (data, timeReport) {
      this.updateTimeReport(timeReport)
      Object.assign(this.user, data.experience)
      this.requiredExp = data.required_exp
      this.$store.commit('experience/setExperience', data.experience)
      this.$store.commit('setLevel', data.experience.level)
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
    deleteTimeReport (timeReportId) {
      this.timeReports = this.timeReports.filter((t) => {
        return t.id !== timeReportId
      })
      this.displayTimeReports = this.displayTimeReports.filter((t) => {
        return t.id !== timeReportId
      })
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
    addCommentLikesCount (commentId, timeReportId) {
      const timeReport = this.timeReports.find((t) => {
        return t.id === timeReportId
      })
      timeReport.comments = timeReport.comments.map((c) => {
        if (c.id === commentId) {
          c.likes_count += 1
        }
        return c
      })
      this.updateTimeReport(timeReport)
    },
    subCommentLikesCount (commentId, timeReportId) {
      const timeReport = this.timeReports.find((t) => {
        return t.id === timeReportId
      })
      timeReport.comments = timeReport.comments.map((c) => {
        if (c.id === commentId) {
          c.likes_count -= 1
        }
        return c
      })
      this.updateTimeReport(timeReport)
    },
    searchTimeReportInTags (ids) {
      this.displayTimeReports = this.timeReports.filter((t) => {
        return ids.includes(t.id)
      })
    }
  },
  mounted () {
    axios
      .get(`/v1/users/${this.$route.params.id}`)
      .then((response) => {
        const data = JSON.parse(response.data.user)
        const timeReports = data.time_reports
        const { time_reports, ...user } = data // eslint-disable-line
        this.user = user
        this.timeReports = timeReports
        this.requiredExp = response.data.required_exp
        this.mainTags = response.data.main_tags
        this.displayTimeReports = this.timeReports
          .slice(this.pageSize * (this.page - 1), this.pageSize * (this.page))
        this.length = Math.ceil(this.timeReports.length / this.pageSize)
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.userNotFound = true
        }
        console.error(error)
      })
    // 新しい記録を一覧に追加
    this.$store.subscribe((mutation, state) => {
      if (this.currentUser) {
        const currentUserId = this.currentUser.id.toString()
        if (currentUserId === this.$route.params.id) {
          if (mutation.type === 'timeReport/setTimeReport') {
            this.timeReports.unshift(mutation.payload)
            this.displayTimeReports.unshift(mutation.payload)
          } else if (mutation.type === 'experience/setExperience') {
            Object.assign(this.user, mutation.payload)
          } else if (mutation.type === 'experience/setRequiredExp') {
            this.requiredExp = mutation.payload
          }
        }
      }
    })
  }
}
</script>

<style scoped>
h2 {
  margin-top: 12px;
}

div.user-level {
  margin: 0;
  padding: 0;
}

div.user-level h2 {
  margin: 0;
}
</style>
